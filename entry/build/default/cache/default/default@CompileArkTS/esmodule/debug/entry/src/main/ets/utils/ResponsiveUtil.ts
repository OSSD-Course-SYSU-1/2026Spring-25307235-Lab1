import display from "@ohos:display";
export class ResponsiveUtil {
    private static instance: ResponsiveUtil;
    private screenWidth: number = 375;
    private screenHeight: number = 667;
    private designWidth: number = 375;
    private designHeight: number = 667;
    private constructor() {
        this.initScreenSize();
    }
    static getInstance(): ResponsiveUtil {
        if (!ResponsiveUtil.instance) {
            ResponsiveUtil.instance = new ResponsiveUtil();
        }
        return ResponsiveUtil.instance;
    }
    private initScreenSize(): void {
        try {
            let displayInfo = display.getDefaultDisplaySync();
            this.screenWidth = displayInfo.width / displayInfo.densityPixels;
            this.screenHeight = displayInfo.height / displayInfo.densityPixels;
        }
        catch (error) {
            console.error('Failed to get display info:', error);
        }
    }
    refreshScreenSize(): void {
        this.initScreenSize();
    }
    getScreenWidth(): number {
        return this.screenWidth;
    }
    getScreenHeight(): number {
        return this.screenHeight;
    }
    scaleWidth(value: number): number {
        return value * (this.screenWidth / this.designWidth);
    }
    scaleHeight(value: number): number {
        return value * (this.screenHeight / this.designHeight);
    }
    scaleFont(fontSize: number): number {
        let scale = Math.min(this.screenWidth / this.designWidth, this.screenHeight / this.designHeight);
        return Math.round(fontSize * scale);
    }
    scale(value: number): number {
        let scale = Math.min(this.screenWidth / this.designWidth, this.screenHeight / this.designHeight);
        return Math.round(value * scale);
    }
    isLargeScreen(): boolean {
        return this.screenWidth >= 600;
    }
    isTablet(): boolean {
        return this.screenWidth >= 840;
    }
    getDeviceType(): string {
        if (this.isTablet()) {
            return 'tablet';
        }
        else if (this.isLargeScreen()) {
            return 'large';
        }
        return 'phone';
    }
    getColumnSpan(): number {
        if (this.isTablet()) {
            return 6;
        }
        else if (this.isLargeScreen()) {
            return 4;
        }
        return 1;
    }
    getMaxWidth(): number | string {
        if (this.isTablet()) {
            return 840;
        }
        else if (this.isLargeScreen()) {
            return 600;
        }
        return '100%';
    }
    getPadding(): number {
        if (this.isTablet()) {
            return 32;
        }
        else if (this.isLargeScreen()) {
            return 24;
        }
        return 16;
    }
}
