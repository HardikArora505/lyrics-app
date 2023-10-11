export function generateColors() {
        const hexValue1 = [`#a40606 0%, #d98324 74%`, `#000000 0%, #580481 100%`, `#0cbaba 0%, #380036 74%`, ` #7f5a83 0%, #0d324d 74%`, `#000000 0%, #414141 74%`, ` #000000 0%, #187bbd 74%`, ` #ffa69e 0%, #5d4954 74%`, `#756213 0%, #000000 74%`, `#d60202 0%, #000000 74%`, `#000000 0%, #e84393 74%`, `#000000 0%, #e056fd 74%`, `#5f0f40 0%, #310e68 74%`, `#0c0c0c 0%, #ca7968 74%`, `#5a585a 0%, #090947 74%`, `#12c2e9, #c471ed, #f64f59`, `#159957, #155799`];
        let a;

        let x = Math.floor(Math.random() * 16);
        let y = hexValue1[x];
        a = y;

        const newColor = a;
        const angle = 315

        const gradient = "linear-gradient(" + angle + "deg, " + newColor + ")";

        document.getElementsByTagName("body")[0].style.backgroundImage = gradient;
        const obj={
            newColor:newColor
        }
        return obj

}