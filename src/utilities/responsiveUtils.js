import { Dimensions, PixelRatio } from 'react-native';


const widthToDp = (number) => {
    let { width, height } = Dimensions.get('window');

    let w, h;
    if (width < height) {
        w = width;
        h = height;
    }
    else {
        w = height;
        h = width;
    }

    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    console.log('WidToDp ' + w + ' ' + h);
    return PixelRatio.roundToNearestPixel((w * givenWidth) / 100);
}


const heightToDp = (number) => {
    let { width, height } = Dimensions.get('window');

    let w, h;
    if (width < height) {
        w = width;
        h = height;
    }
    else {
        w = height;
        h = width;
    }

    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    console.log('HitToDp ' + w + ' ' + h);
    return PixelRatio.roundToNearestPixel((h * givenHeight) / 100);


}






export {
    widthToDp,
    heightToDp,
};
