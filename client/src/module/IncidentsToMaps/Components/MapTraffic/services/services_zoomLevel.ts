

enum ZoomScale {
    Level10 = 433343,
    Level11 = 216671,
    Level12 = 108335,
    Level13 = 54167,
    Level14 = 27083,
    Level15 = 13541,
    Level16 = 6770,
    Level17 = 3385,
    Level18 = 1692,
};

function services_zoomLevel(zoomlevel: number): number {

    switch (zoomlevel) {
        case 10:
            return ZoomScale.Level10;
        case 11:
            return ZoomScale.Level11;
        case 12:
            return ZoomScale.Level12;
        case 13:
            return ZoomScale.Level13;
        case 14:
            return ZoomScale.Level14;
        case 15:
            return ZoomScale.Level15;
        case 16:
            return ZoomScale.Level16;
        case 17:
            return ZoomScale.Level17;
        case 18:
            return ZoomScale.Level18;
        default:
            return ZoomScale.Level10; // Nastavte výchozí hodnotu nebo další logiku podle potřeby
    };
};

export default services_zoomLevel;