if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { Settings } from "@normalized:N&&&entry/src/main/ets/model/Settings&";
import type { GradientColors } from "@normalized:N&&&entry/src/main/ets/model/Settings&";
import { ResponsiveUtil } from "@normalized:N&&&entry/src/main/ets/utils/ResponsiveUtil&";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.responsive = ResponsiveUtil.getInstance();
        this.content = '欢迎学习鸿蒙开发';
        this.fontSize = 88;
        this.fontSizeFlag = '小';
        this.fontWeight = FontWeight.Regular;
        this.selectedIndex = 0;
        this.fontWeights = [FontWeight.Regular, FontWeight.Medium, FontWeight.Bold];
        this.selectedSpeedIndex = 1;
        this.marqueeSpeeds = [4, 8, 16];
        this.speedNames = ['慢', '中', '快'];
        this.isMirror = false;
        this.selectedFontColorIndex = 0;
        this.fontColors = ['#FFFFFF', '#000000', '#FFD700', '#00FF00', '#FF69B4', '#00FFFF'];
        this.fontColorNames = ['白色', '黑色', '金色', '绿色', '粉色', '青色'];
        this.selectedThemeIndex = 0;
        this.isNightMode = false;
        this.gradientThemes = [
            { colors: [['#013C9C', 0.0], ['#3066E4', 0.5], ['#43A1F4', 1.0]] },
            { colors: [['#C9302C', 0.0], ['#E43661', 0.5], ['#F44336', 1.0]] },
            { colors: [['#2E7D32', 0.0], ['#43A047', 0.5], ['#66BB6A', 1.0]] },
            { colors: [['#F57C00', 0.0], ['#FF9800', 0.5], ['#FFB74D', 1.0]] },
            { colors: [['#7B1FA2', 0.0], ['#9C27B0', 0.5], ['#BA68C8', 1.0]] },
            { colors: [['#00838F', 0.0], ['#00ACC1', 0.5], ['#26C6DA', 1.0]] } // 青色主题
        ];
        this.themeNames = ['蓝色', '红色', '绿色', '橙色', '紫色', '青色'];
        this.pathInfos = new NavPathStack();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.content = '欢迎学习鸿蒙开发';
        this.fontSize = 88;
        this.fontSizeFlag = '小';
        this.fontWeight = FontWeight.Regular;
        this.selectedIndex = 0;
        this.selectedSpeedIndex = 1;
        this.isMirror = false;
        this.selectedFontColorIndex = 0;
        this.selectedThemeIndex = 0;
        this.isNightMode = false;
    }
    private responsive: ResponsiveUtil;
    // 1. 弹幕内容（字符串类型，默认文字）
    @Local
    content: string;
    // 2. 字号（数字类型，默认88）
    @Local
    fontSize: number;
    // 字号标识（小/中/大，同步显示给用户）
    @Local
    fontSizeFlag: string;
    // 3. 字体粗细（枚举类型，默认常规）
    @Local
    fontWeight: FontWeight;
    // 字体粗细选中项
    @Local
    selectedIndex: number;
    // 字体粗细数组（常规、中等、加粗）
    fontWeights: FontWeight[];
    // 4. 滚动速度
    @Local
    selectedSpeedIndex: number;
    // 滚动速度数组（慢、中、快）
    marqueeSpeeds: number[];
    speedNames: string[];
    // 5. 镜像开关
    @Local
    isMirror: boolean;
    // 6. 文字颜色
    @Local
    selectedFontColorIndex: number;
    fontColors: string[];
    fontColorNames: string[];
    // 7. 背景颜色主题
    @Local
    selectedThemeIndex: number;
    // 8. 夜间模式
    @Local
    isNightMode: boolean;
    // 预定义的背景颜色主题
    gradientThemes: GradientColors[];
    themeNames: string[];
    // 导航控制器
    pathInfos: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pathInfos, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.mode(NavigationMode.Stack);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.background(this.isNightMode ? '#1C1C1E' : '#F1F3F5');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1. 标题区
            Row.create();
            // 1. 标题区
            Row.width('100%');
            // 1. 标题区
            Row.height(this.responsive.scale(56));
            // 1. 标题区
            Row.padding({ left: this.responsive.getPadding(), right: this.responsive.getPadding() });
            // 1. 标题区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手持弹幕');
            Text.fontSize(this.responsive.scaleFont(26));
            Text.fontColor(this.isNightMode ? '#FFFFFF' : '#000000');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.led", "moduleName": "entry" });
            Image.width(this.responsive.scale(36));
            Image.height(this.responsive.scale(36));
            Image.borderRadius(this.responsive.scale(18));
            Image.onClick(() => {
                this.pathInfos.pushPathByName('Login', null);
            });
        }, Image);
        // 1. 标题区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 2. 预览区
            Column.create();
            // 2. 预览区
            Column.width('100%');
            // 2. 预览区
            Column.margin({ top: this.responsive.scale(28) });
            // 2. 预览区
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('预览');
            Text.fontSize(this.responsive.scaleFont(14));
            Text.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: this.responsive.scale(28) });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 弹幕展示框
            Column.create();
            // 弹幕展示框
            Column.width('100%');
            // 弹幕展示框
            Column.height(this.responsive.scale(199));
            // 弹幕展示框
            Column.backgroundColor(this.isNightMode ? '#2C2C2E' : '#E5E5EA');
            // 弹幕展示框
            Column.padding({
                top: this.responsive.scale(24),
                right: this.responsive.getPadding(),
                bottom: this.responsive.scale(24),
                left: this.responsive.getPadding()
            });
            // 弹幕展示框
            Column.margin({ top: 8 });
            // 弹幕展示框
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 弹幕滚动区域
            Row.create();
            // 弹幕滚动区域
            Row.width('100%');
            // 弹幕滚动区域
            Row.height('100%');
            // 弹幕滚动区域
            Row.linearGradient({
                direction: GradientDirection.Right,
                colors: this.gradientThemes[this.selectedThemeIndex].colors
            });
            // 弹幕滚动区域
            Row.borderRadius(this.responsive.scale(16));
            // 弹幕滚动区域
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.content);
            Text.textOverflow({ overflow: TextOverflow.MARQUEE });
            Text.marqueeOptions({
                start: true,
                step: this.marqueeSpeeds[this.selectedSpeedIndex] // 滚动速度
            });
            Text.fontSize(this.fontSize / 1.8);
            Text.fontWeight(this.fontWeight);
            Text.fontColor(this.fontColors[this.selectedFontColorIndex]);
        }, Text);
        Text.pop();
        // 弹幕滚动区域
        Row.pop();
        // 弹幕展示框
        Column.pop();
        // 2. 预览区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 3. 操作区
            Scroll.create();
            // 3. 操作区
            Scroll.scrollBar(BarState.Auto);
            // 3. 操作区
            Scroll.edgeEffect(EdgeEffect.Spring);
            // 3. 操作区
            Scroll.width('100%');
            // 3. 操作区
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({
                left: this.responsive.getPadding(),
                right: this.responsive.getPadding()
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 弹幕内容区
            Column.create();
            // 弹幕内容区
            Column.width('100%');
            // 弹幕内容区
            Column.alignItems(HorizontalAlign.Start);
            // 弹幕内容区
            Column.margin({
                top: this.responsive.scale(28),
                bottom: this.responsive.scale(28)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('弹幕内容');
            Text.fontSize(this.responsive.scaleFont(14));
            Text.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: this.responsive.scale(12) });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 输入框
            TextArea.create({ text: this.content });
            // 输入框
            TextArea.backgroundColor(this.isNightMode ? '#3A3A3C' : Color.White);
            // 输入框
            TextArea.maxLength(50);
            // 输入框
            TextArea.showCounter(true, // 开启统计
            {
                thresholdPercentage: 1,
                highlightBorder: true // 输入快满时，边框会高亮提醒
            });
            // 输入框
            TextArea.height(this.responsive.scale(72));
            // 输入框
            TextArea.padding({
                top: this.responsive.scale(8),
                right: this.responsive.getPadding(),
                bottom: this.responsive.scale(8),
                left: this.responsive.getPadding()
            });
            // 输入框
            TextArea.margin({ top: this.responsive.scale(8) });
            // 输入框
            TextArea.borderRadius(this.responsive.scale(16));
            // 输入框
            TextArea.onChange((value: string) => {
                this.content = value; // 将当前值赋值给content
            });
        }, TextArea);
        // 弹幕内容区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置区
            Column.create();
            // 设置区
            Column.width('100%');
            // 设置区
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('显示设置');
            // 标题
            Text.fontSize(this.responsive.scaleFont(14));
            // 标题
            Text.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            // 标题
            Text.fontWeight(FontWeight.Medium);
            // 标题
            Text.margin({
                bottom: this.responsive.scale(8),
                left: this.responsive.scale(12)
            });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({
                left: this.responsive.scale(12),
                right: this.responsive.scale(12),
                top: this.responsive.scale(4),
                bottom: this.responsive.scale(4)
            });
            Column.margin({ bottom: this.responsive.scale(12) });
            Column.backgroundColor(this.isNightMode ? '#2C2C2E' : Color.White);
            Column.borderRadius(this.responsive.scale(16));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 字号大小区
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(this.responsive.scale(48));
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('字体大小');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.fontSizeFlag);
            Text.fontSize(this.responsive.scaleFont(14));
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.fontSize,
                min: 88,
                max: 248,
                step: 80,
                style: SliderStyle.InSet
            });
            Slider.width('calc(100% + 12vp)');
            Slider.height(this.responsive.scale(40));
            Slider.blockColor(Color.White);
            Slider.trackColor('#F1F3F5');
            Slider.selectedColor('#0A59F7');
            Slider.showSteps(true);
            Slider.onChange((value: number) => {
                this.fontSize = value;
                // 根据当前fontSize匹配fontSizeFlag
                if (this.fontSize === 88) {
                    this.fontSizeFlag = '小';
                }
                else if (this.fontSize === 248) {
                    this.fontSizeFlag = '大';
                }
                else {
                    this.fontSizeFlag = '中';
                }
            });
        }, Slider);
        // 字号大小区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 字体粗细区
            Row.create();
            // 字体粗细区
            Row.width('100%');
            // 字体粗细区
            Row.height(this.responsive.scale(48));
            // 字体粗细区
            Row.margin({ top: this.responsive.scale(12) });
            // 字体粗细区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('字体粗细');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: this.fontWeights[0].toString() },
                { value: this.fontWeights[1].toString() },
                { value: this.fontWeights[2].toString() }
            ]);
            Select.value(this.fontWeight.toString());
            Select.selected(this.selectedIndex);
            Select.backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF');
            Select.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            Select.borderWidth(0);
            Select.onSelect((index: number) => {
                this.fontWeight = this.fontWeights[index]; // 将选中项赋值给fontWeight
                this.selectedIndex = index; // 将选中项的索引赋值给selectedIndex
            });
        }, Select);
        Select.pop();
        // 字体粗细区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 滚动速度区
            Row.create();
            // 滚动速度区
            Row.width('100%');
            // 滚动速度区
            Row.height(this.responsive.scale(48));
            // 滚动速度区
            Row.margin({ top: this.responsive.scale(12) });
            // 滚动速度区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('滚动速度');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: this.speedNames[0] },
                { value: this.speedNames[1] },
                { value: this.speedNames[2] }
            ]);
            Select.value(this.speedNames[this.selectedSpeedIndex]);
            Select.selected(this.selectedSpeedIndex);
            Select.backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF');
            Select.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            Select.borderWidth(0);
            Select.onSelect((index: number) => {
                this.selectedSpeedIndex = index;
            });
        }, Select);
        Select.pop();
        // 滚动速度区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 镜像开关区
            Row.create();
            // 镜像开关区
            Row.width('100%');
            // 镜像开关区
            Row.height(this.responsive.scale(48));
            // 镜像开关区
            Row.margin({ top: this.responsive.scale(12) });
            // 镜像开关区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('镜像显示');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.isMirror });
            Toggle.onChange((isOn: boolean) => {
                this.isMirror = isOn;
            });
        }, Toggle);
        Toggle.pop();
        // 镜像开关区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 夜间模式开关区
            Row.create();
            // 夜间模式开关区
            Row.width('100%');
            // 夜间模式开关区
            Row.height(this.responsive.scale(48));
            // 夜间模式开关区
            Row.margin({ top: this.responsive.scale(12) });
            // 夜间模式开关区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('夜间模式');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.isNightMode });
            Toggle.onChange((isOn: boolean) => {
                this.isNightMode = isOn;
            });
        }, Toggle);
        Toggle.pop();
        // 夜间模式开关区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文字颜色区
            Row.create();
            // 文字颜色区
            Row.width('100%');
            // 文字颜色区
            Row.height(this.responsive.scale(48));
            // 文字颜色区
            Row.margin({ top: this.responsive.scale(12) });
            // 文字颜色区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('文字颜色');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: this.fontColorNames[0] },
                { value: this.fontColorNames[1] },
                { value: this.fontColorNames[2] },
                { value: this.fontColorNames[3] },
                { value: this.fontColorNames[4] },
                { value: this.fontColorNames[5] }
            ]);
            Select.value(this.fontColorNames[this.selectedFontColorIndex]);
            Select.selected(this.selectedFontColorIndex);
            Select.backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF');
            Select.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            Select.borderWidth(0);
            Select.onSelect((index: number) => {
                this.selectedFontColorIndex = index;
            });
        }, Select);
        Select.pop();
        // 文字颜色区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景颜色主题区
            Row.create();
            // 背景颜色主题区
            Row.width('100%');
            // 背景颜色主题区
            Row.height(this.responsive.scale(48));
            // 背景颜色主题区
            Row.margin({ top: this.responsive.scale(12) });
            // 背景颜色主题区
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('背景颜色');
            Text.fontSize(this.responsive.scaleFont(16));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: this.themeNames[0] },
                { value: this.themeNames[1] },
                { value: this.themeNames[2] },
                { value: this.themeNames[3] },
                { value: this.themeNames[4] },
                { value: this.themeNames[5] }
            ]);
            Select.value(this.themeNames[this.selectedThemeIndex]);
            Select.selected(this.selectedThemeIndex);
            Select.backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF');
            Select.fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000');
            Select.borderWidth(0);
            Select.onSelect((index: number) => {
                this.selectedThemeIndex = index;
            });
        }, Select);
        Select.pop();
        // 背景颜色主题区
        Row.pop();
        Column.pop();
        // 设置区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('显示弹幕');
            Button.height(this.responsive.scale(40));
            Button.backgroundColor('#0A59F7');
            Button.margin({ top: this.responsive.scale(32) });
            Button.width('100%');
            Button.onClick(() => {
                // 1. 把当前页面的设置项组装成Settings对象
                const settings = new Settings(this.content, this.fontSize, this.fontWeight, this.marqueeSpeeds[this.selectedSpeedIndex], this.isMirror, this.fontColors[this.selectedFontColorIndex], this.gradientThemes[this.selectedThemeIndex], this.isNightMode);
                // 2. 跳转：第一个参数是路由表的name，第二个是传递的参数
                this.pathInfos.pushPathByName('Led', settings);
            });
        }, Button);
        Button.pop();
        Column.pop();
        // 3. 操作区
        Scroll.pop();
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.led", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
