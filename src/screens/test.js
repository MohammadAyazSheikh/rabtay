import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('screen');
const smallWidth = width / 3;
let data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
];

export default function InstagramLayout() {
    const finalData = modifyData(data);
    return (
        <FlatList
            data={finalData}
            keyExtractor={iten => iten.id}
            renderItem={renderItem}
        />
    );
}

const renderItem = ({ item }) => {
    if (item.type == 1) return <TypeOne item={item} />;
    if (item.type == 2) return <TypeTwo item={item} />;
    if (item.type == 3) return <TypeThree item={item} />;
    if (item.type == 4) return <TypeTwo item={item} />;
};

const TypeOne = ({ item }) => (
    <View style={styles.row}>
        <View style={styles.flex}>
            <View style={styles.item1}>
                <CommonItempart data={item.data[0]} />
            </View>
            <View style={styles.item1}>
                <CommonItempart data={item.data[1]} />
            </View>
        </View>
        <View style={styles.item2}>
            <CommonItempart data={item.data[2]} />
        </View>
    </View>
);

const TypeTwo = ({ item }) => (
    <View style={[styles.row, styles.rowWrap]}>
        {item.data.map(x => (
            <View key={x} style={styles.item1}>
                <CommonItempart data={x} />
            </View>
        ))}
    </View>
);

const TypeThree = ({ item }) => (
    <View style={styles.row}>
        <View style={styles.item2}>
            <CommonItempart data={item.data[0]} />
        </View>
        <View style={styles.flex}>
            <View style={styles.item1}>
                <CommonItempart data={item.data[1]} />
            </View>
            <View style={styles.item1}>
                <CommonItempart data={item.data[2]} />
            </View>
        </View>
    </View>
);

const CommonItempart = ({ data }) =>
    data ? (
        <View style={styles.item1Inner}>
            <Image source={{ uri: 'https://data.whicdn.com/images/329292597/original.jpg' }}
                resizeMode='cover' style={styles.fill} />
            <Text style={styles.index}>{data}</Text>
        </View>
    ) : null;

const styles = StyleSheet.create({
    row: { flexDirection: 'row', width: '100%' },
    rowWrap: { flexWrap: 'wrap' },
    flex: { flex: 1 },
    item1: { height: smallWidth, width: smallWidth, padding: 1 },
    item2: { height: smallWidth * 2, width: smallWidth * 2, padding: 1 },
    item1Inner: { flex: 1, backgroundColor: '#bbb' },
    index: { color: '#fff', fontSize: 20, position: 'absolute', bottom: 5, right: 5 },
    fill: { height: '100%', width: '100%' }
});

const modifyData = arr => {
    let finalData = [];
    let type1 = true;
    let type = 1;
    let add = true;
    for (let i = 0; i < arr.length; i += type1 ? 6 : 3) {
        let j = 0;
        let data = [];
        while (j < (type1 ? 3 : 6)) {
            arr[i + j] && data.push(arr[i + j]);
            j += 1;
        }
        finalData.push({
            id: Math.random().toString(),
            data,
            type,
        });
        type1 = !type1;
        if (type == 1) {
            add = true;
        }
        if (type == 4) {
            add = false;
        }
        add ? type++ : type--;
    }
    return finalData;
};