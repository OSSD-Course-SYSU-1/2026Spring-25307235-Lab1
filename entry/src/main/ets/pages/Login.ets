/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ResponsiveUtil } from '../utils/ResponsiveUtil';

@ComponentV2
export struct Login {
  private responsive: ResponsiveUtil = ResponsiveUtil.getInstance();
  @Local phoneNumber: string = '';
  @Local password: string = '';
  @Local isPasswordVisible: boolean = false;

  build() {
    NavDestination() {
      Column() {
        Text('登录')
          .fontSize(this.responsive.scaleFont(28))
          .fontWeight(FontWeight.Bold)
          .margin({ top: this.responsive.scale(60), bottom: this.responsive.scale(40) })

        Column() {
          Column() {
            Text('电话号码')
              .fontSize(this.responsive.scaleFont(14))
              .fontColor('#99000000')
              .fontWeight(FontWeight.Medium)
              .margin({ left: 4, bottom: 8 })
              .width('100%')

            TextInput({ placeholder: '请输入电话号码', text: this.phoneNumber })
              .type(InputType.Normal)
              .height(this.responsive.scale(48))
              .width('100%')
              .backgroundColor('#F5F5F5')
              .borderRadius(this.responsive.scale(8))
              .padding({ left: this.responsive.getPadding(), right: this.responsive.getPadding() })
              .maxLength(11)
              .onChange((value: string) => {
                this.phoneNumber = value;
              })
          }
          .width('100%')
          .margin({ bottom: this.responsive.scale(24) })

          Column() {
            Text('密码')
              .fontSize(this.responsive.scaleFont(14))
              .fontColor('#99000000')
              .fontWeight(FontWeight.Medium)
              .margin({ left: 4, bottom: 8 })
              .width('100%')

            Row() {
              TextInput({ placeholder: '请输入密码', text: this.password })
                .type(this.isPasswordVisible ? InputType.Normal : InputType.Password)
                .height(this.responsive.scale(48))
                .layoutWeight(1)
                .backgroundColor('#F5F5F5')
                .borderRadius(this.responsive.scale(8))
                .padding({ left: this.responsive.getPadding(), right: this.responsive.getPadding() })
                .maxLength(20)
                .onChange((value: string) => {
                  this.password = value;
                })

              Toggle({ type: ToggleType.Switch, isOn: this.isPasswordVisible })
                .width(this.responsive.scale(50))
                .height(this.responsive.scale(30))
                .margin({ left: this.responsive.scale(8) })
                .onChange((isOn: boolean) => {
                  this.isPasswordVisible = isOn;
                })
            }
            .width('100%')
          }
          .width('100%')
          .margin({ bottom: this.responsive.scale(40) })
        }
        .width('100%')
        .padding({ left: this.responsive.scale(24), right: this.responsive.scale(24) })

        Button('登录')
          .width('calc(100% - 48vp)')
          .height(this.responsive.scale(48))
          .backgroundColor('#0A59F7')
          .fontColor('#FFFFFF')
          .fontSize(this.responsive.scaleFont(18))
          .fontWeight(FontWeight.Medium)
          .borderRadius(this.responsive.scale(24))
          .onClick(() => {
            if (this.phoneNumber.length === 0 || this.password.length === 0) {
              console.info('请输入电话号码和密码');
              return;
            }
            console.info('登录成功：' + this.phoneNumber);
          })

        Blank()
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#FFFFFF')
    }
    .width('100%')
    .height('100%')
    .hideTitleBar(true)
  }
}

@Builder
export function LoginBuilder() {
  Login();
}
