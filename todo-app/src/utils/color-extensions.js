class ColorExtensions{
    hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
                result[3],
                16
            )})`
            : null;
    }

    rgbToRgba(rgb, alpha) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

export const colorExtensions = new ColorExtensions();