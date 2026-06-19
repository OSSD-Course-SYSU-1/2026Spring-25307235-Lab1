import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import { ResponsiveUtil } from "@normalized:N&&&entry/src/main/ets/utils/ResponsiveUtil&";
const TAG = 'testTag';
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        try {
            this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
        }
        catch (err) {
            hilog.error(0x0000, TAG, 'Failed to set colorMode. Cause: %{public}s', JSON.stringify(err));
        }
        hilog.info(0x0000, TAG, '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, TAG, '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        hilog.info(0x0000, TAG, '%{public}s', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err) => {
            if (err.code) {
                hilog.error(0x0000, TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
                return;
            }
            hilog.info(0x0000, TAG, 'Succeeded in loading the content.');
            try {
                let windowClass = windowStage.getMainWindowSync();
                windowClass.on('windowSizeChange', (size: window.Size) => {
                    ResponsiveUtil.getInstance().refreshScreenSize();
                });
            }
            catch (err) {
                hilog.error(0x0000, TAG, 'Failed to register window size change listener. Cause: %{public}s', JSON.stringify(err));
            }
        });
    }
    onWindowStageDestroy(): void {
        hilog.info(0x0000, TAG, '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        hilog.info(0x0000, TAG, '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        hilog.info(0x0000, TAG, '%{public}s', 'Ability onBackground');
    }
}
