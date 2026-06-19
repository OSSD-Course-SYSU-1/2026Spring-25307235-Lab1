if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { ResponsiveUtil } from "@normalized:N&&&entry/src/main/ets/utils/ResponsiveUtil&";
export class Login extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.responsive = ResponsiveUtil.getInstance();
        this.phoneNumber = '';
        this.password = '';
        this.isPasswordVisible = false;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.phoneNumber = '';
        this.password = '';
        this.isPasswordVisible = false;
    }
    private responsive: ResponsiveUtil;
    @Local
    phoneNumber: string;
    @Local
    password: string;
    @Local
    isPasswordVisible: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.backgroundColor('#FFFFFF');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('登录');
                    Text.fontSize(this.responsive.scaleFont(28));
                    Text.fontWeight(FontWeight.Bold);
                    Text.margin({ top: this.responsive.scale(60), bottom: this.responsive.scale(40) });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding({ left: this.responsive.scale(24), right: this.responsive.scale(24) });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: this.responsive.scale(24) });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('电话号码');
                    Text.fontSize(this.responsive.scaleFont(14));
                    Text.fontColor('#99000000');
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ left: 4, bottom: 8 });
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入电话号码', text: this.phoneNumber });
                    TextInput.type(InputType.Normal);
                    TextInput.height(this.responsive.scale(48));
                    TextInput.width('100%');
                    TextInput.backgroundColor('#F5F5F5');
                    TextInput.borderRadius(this.responsive.scale(8));
                    TextInput.padding({ left: this.responsive.getPadding(), right: this.responsive.getPadding() });
                    TextInput.maxLength(11);
                    TextInput.onChange((value: string) => {
                        this.phoneNumber = value;
                    });
                }, TextInput);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: this.responsive.scale(40) });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('密码');
                    Text.fontSize(this.responsive.scaleFont(14));
                    Text.fontColor('#99000000');
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ left: 4, bottom: 8 });
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入密码', text: this.password });
                    TextInput.type(this.isPasswordVisible ? InputType.Normal : InputType.Password);
                    TextInput.height(this.responsive.scale(48));
                    TextInput.layoutWeight(1);
                    TextInput.backgroundColor('#F5F5F5');
                    TextInput.borderRadius(this.responsive.scale(8));
                    TextInput.padding({ left: this.responsive.getPadding(), right: this.responsive.getPadding() });
                    TextInput.maxLength(20);
                    TextInput.onChange((value: string) => {
                        this.password = value;
                    });
                }, TextInput);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Toggle.create({ type: ToggleType.Switch, isOn: this.isPasswordVisible });
                    Toggle.width(this.responsive.scale(50));
                    Toggle.height(this.responsive.scale(30));
                    Toggle.margin({ left: this.responsive.scale(8) });
                    Toggle.onChange((isOn: boolean) => {
                        this.isPasswordVisible = isOn;
                    });
                }, Toggle);
                Toggle.pop();
                Row.pop();
                Column.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('登录');
                    Button.width('calc(100% - 48vp)');
                    Button.height(this.responsive.scale(48));
                    Button.backgroundColor('#0A59F7');
                    Button.fontColor('#FFFFFF');
                    Button.fontSize(this.responsive.scaleFont(18));
                    Button.fontWeight(FontWeight.Medium);
                    Button.borderRadius(this.responsive.scale(24));
                    Button.onClick(() => {
                        if (this.phoneNumber.length === 0 || this.password.length === 0) {
                            console.info('请输入电话号码和密码');
                            return;
                        }
                        console.info('登录成功：' + this.phoneNumber);
                    });
                }, Button);
                Button.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Login" });
            NavDestination.width('100%');
            NavDestination.height('100%');
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function LoginBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Login(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Login.ets", line: 124, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Login" });
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Login", wrapBuilder(LoginBuilder));
    }
})();
