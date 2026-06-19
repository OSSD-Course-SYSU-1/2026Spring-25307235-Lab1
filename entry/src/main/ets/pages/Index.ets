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

import { Settings, GradientColors } from '../model/Settings';
import { ResponsiveUtil } from '../utils/ResponsiveUtil';

@Entry
@ComponentV2
struct Index {
  private responsive: ResponsiveUtil = ResponsiveUtil.getInstance();
  // 1. 弹幕内容（字符串类型，默认文字）
  @Local content: string = '欢迎学习鸿蒙开发';
  // 2. 字号（数字类型，默认88）
  @Local fontSize: number = 88;
  // 字号标识（小/中/大，同步显示给用户）
  @Local fontSizeFlag: string = '小';
  // 3. 字体粗细（枚举类型，默认常规）
  @Local fontWeight: FontWeight = FontWeight.Regular;
  // 字体粗细选中项
  @Local selectedIndex: number = 0;
  // 字体粗细数组（常规、中等、加粗）
  fontWeights: FontWeight[] = [FontWeight.Regular, FontWeight.Medium, FontWeight.Bold];
  // 4. 滚动速度
  @Local selectedSpeedIndex: number = 1;
  // 滚动速度数组（慢、中、快）
  marqueeSpeeds: number[] = [4, 8, 16];
  speedNames: string[] = ['慢', '中', '快'];
  // 5. 镜像开关
  @Local isMirror: boolean = false;
  // 6. 文字颜色
  @Local selectedFontColorIndex: number = 0;
  fontColors: string[] = ['#FFFFFF', '#000000', '#FFD700', '#00FF00', '#FF69B4', '#00FFFF'];
  fontColorNames: string[] = ['白色', '黑色', '金色', '绿色', '粉色', '青色'];
  // 7. 背景颜色主题
  @Local selectedThemeIndex: number = 0;
  // 8. 夜间模式
  @Local isNightMode: boolean = false;
  // 预定义的背景颜色主题
  gradientThemes: GradientColors[] = [
    { colors: [['#013C9C', 0.0], ['#3066E4', 0.5], ['#43A1F4', 1.0]] }, // 蓝色主题（默认）
    { colors: [['#C9302C', 0.0], ['#E43661', 0.5], ['#F44336', 1.0]] }, // 红色主题
    { colors: [['#2E7D32', 0.0], ['#43A047', 0.5], ['#66BB6A', 1.0]] }, // 绿色主题
    { colors: [['#F57C00', 0.0], ['#FF9800', 0.5], ['#FFB74D', 1.0]] }, // 橙色主题
    { colors: [['#7B1FA2', 0.0], ['#9C27B0', 0.5], ['#BA68C8', 1.0]] }, // 紫色主题
    { colors: [['#00838F', 0.0], ['#00ACC1', 0.5], ['#26C6DA', 1.0]] }  // 青色主题
  ];
  themeNames: string[] = ['蓝色', '红色', '绿色', '橙色', '紫色', '青色'];
  // 导航控制器
  pathInfos: NavPathStack = new NavPathStack();

  build() {
    Navigation(this.pathInfos) { // 使用Navigation作为首页的根容器，并绑定导航控制器
      Column() {
        // 1. 标题区
        Row() {
          Text('手持弹幕')
            .fontSize(this.responsive.scaleFont(26))
            .fontColor(this.isNightMode ? '#FFFFFF' : '#000000')
            .fontWeight(FontWeight.Bold)
            .layoutWeight(1)

          Image($r('app.media.startIcon'))
            .width(this.responsive.scale(36))
            .height(this.responsive.scale(36))
            .borderRadius(this.responsive.scale(18))
            .onClick(() => {
              this.pathInfos.pushPathByName('Login', null);
            })
        }
        .width('100%')
        .height(this.responsive.scale(56))
        .padding({ left: this.responsive.getPadding(), right: this.responsive.getPadding() })
        .justifyContent(FlexAlign.SpaceBetween)
        // 2. 预览区
        Column() {
          Text('预览')
            .fontSize(this.responsive.scaleFont(14))
            .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
            .fontWeight(FontWeight.Medium)
            .margin({ left: this.responsive.scale(28) })

          // 弹幕展示框
          Column() {
            // 弹幕滚动区域
            Row() {
              Text(this.content)
              // 第1步：开启跑马灯滚动模式
                .textOverflow({ overflow: TextOverflow.MARQUEE }) // TextOverflow.MARQUEE表示Text组件的文字溢出以跑马灯模式处理
                // 第2步：配置滚动的规则
                .marqueeOptions({
                  start: true, // 关键：是否启动滚动。true：启动滚动；false：停止滚动
                  step: this.marqueeSpeeds[this.selectedSpeedIndex] // 滚动速度
                })
                .fontSize(this.fontSize / 1.8) // 绑定字号变量
                .fontWeight(this.fontWeight) // 字体粗细
                .fontColor(this.fontColors[this.selectedFontColorIndex])
            }
            .width('100%')
            .height('100%')
            .linearGradient({
              direction: GradientDirection.Right, // 渐变方向
              colors: this.gradientThemes[this.selectedThemeIndex].colors
            })
            .borderRadius(this.responsive.scale(16)) // 边框的圆角半径
            .justifyContent(FlexAlign.Center) // 设置文本居中
          }
          .width('100%')
          .height(this.responsive.scale(199)) // 展示框高度
          .backgroundColor(this.isNightMode ? '#2C2C2E' : '#E5E5EA')
          .padding({
            top: this.responsive.scale(24),
            right: this.responsive.getPadding(),
            bottom: this.responsive.scale(24),
            left: this.responsive.getPadding()
          }) // 内边距
          .margin({ top: 8 }) // 外边距（距离“预览”标题的间距）
          .alignItems(HorizontalAlign.Start) // 设置Column容器内容左对齐
        }
        .width('100%')
        .margin({ top: this.responsive.scale(28) })
        .alignItems(HorizontalAlign.Start) // 设置Column容器的内容左对齐

        // 3. 操作区
        Scroll() {
          Column() {
            // 弹幕内容区
            Column() {
              Text('弹幕内容')
                .fontSize(this.responsive.scaleFont(14))
                .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
                .fontWeight(FontWeight.Medium)
                .margin({ left: this.responsive.scale(12) })

              // 输入框
              TextArea({ text: this.content })
                .backgroundColor(this.isNightMode ? '#3A3A3C' : Color.White)
                .maxLength(50) // 限制输入文本的个数，最多输入50个字
                .showCounter(
                  true, // 开启统计
                  {
                    thresholdPercentage: 1, // 全程显示统计（不用等字数快满才出现）
                    highlightBorder: true // 输入快满时，边框会高亮提醒
                  }
                )
                .height(this.responsive.scale(72)) // 输入框高度
                .padding({
                  top: this.responsive.scale(8),
                  right: this.responsive.getPadding(),
                  bottom: this.responsive.scale(8),
                  left: this.responsive.getPadding()
                }) // 输入框内部的文字，距离输入框边缘的距离
                .margin({ top: this.responsive.scale(8) }) // 输入框距离上方标题的间距
                .borderRadius(this.responsive.scale(16)) // 边框的圆角半径
                .onChange((value: string) => { // 用户修改输入框文本时触发，返回当前值
                  this.content = value; // 将当前值赋值给content
                })
            }
            .width('100%')
            .alignItems(HorizontalAlign.Start)
            .margin({
              top: this.responsive.scale(28),
              bottom: this.responsive.scale(28)
            })

            // 设置区
            Column() {
              // 标题
              Text('显示设置')
                .fontSize(this.responsive.scaleFont(14))
                .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
                .fontWeight(FontWeight.Medium)
                .margin({
                  bottom: this.responsive.scale(8),
                  left: this.responsive.scale(12)
                })

              Column() {
                // 字号大小区
                Column() {
                  Row() {
                    Text('字体大小')
                      .fontSize(this.responsive.scaleFont(16))
                      .fontWeight(FontWeight.Medium)
                    Text(this.fontSizeFlag)
                      .fontSize(this.responsive.scaleFont(14))
                  }
                  .width('100%')
                  .height(this.responsive.scale(48))
                  .justifyContent(FlexAlign.SpaceBetween)

                  Slider({
                    value: this.fontSize,
                    min: 88,
                    max: 248,
                    step: 80,
                    style: SliderStyle.InSet
                  })
                    .width('calc(100% + 12vp)')
                    .height(this.responsive.scale(40))
                    .blockColor(Color.White) // 滑块背景色
                    .trackColor('#F1F3F5') // 滑轨背景色
                    .selectedColor('#0A59F7') // 滑轨的已滑动部分背景色
                    .showSteps(true) // 显示步长刻度
                    .onChange((value: number) => { // 用户拖动或点击时触发，返回当前滑动的进度值
                      this.fontSize = value;
                      // 根据当前fontSize匹配fontSizeFlag
                      if (this.fontSize === 88) {
                        this.fontSizeFlag = '小';
                      } else if (this.fontSize === 248) {
                        this.fontSizeFlag = '大';
                      } else {
                        this.fontSizeFlag = '中';
                      }
                    })
                }

                // 字体粗细区
                Row() {
                  Text('字体粗细')
                    .fontSize(this.responsive.scaleFont(16))
                    .fontWeight(FontWeight.Medium)
                  Select([
                    { value: this.fontWeights[0].toString() },
                    { value: this.fontWeights[1].toString() },
                    { value: this.fontWeights[2].toString() }
                  ])
                    .value(this.fontWeight.toString())
                    .selected(this.selectedIndex)
                    .backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF')
                    .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
                    .borderWidth(0)
                    .onSelect((index: number) => { // 选中下拉菜单中某一项时触发，返回选中项的索引
                      this.fontWeight = this.fontWeights[index]; // 将选中项赋值给fontWeight
                      this.selectedIndex = index; // 将选中项的索引赋值给selectedIndex
                    })
                }
                .width('100%')
                .height(this.responsive.scale(48))
                .margin({ top: this.responsive.scale(12) })
                .justifyContent(FlexAlign.SpaceBetween)

                // 滚动速度区
                Row() {
                  Text('滚动速度')
                    .fontSize(this.responsive.scaleFont(16))
                    .fontWeight(FontWeight.Medium)
                  Select([
                    { value: this.speedNames[0] },
                    { value: this.speedNames[1] },
                    { value: this.speedNames[2] }
                  ])
                    .value(this.speedNames[this.selectedSpeedIndex])
                    .selected(this.selectedSpeedIndex)
                    .backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF')
                    .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
                    .borderWidth(0)
                    .onSelect((index: number) => {
                      this.selectedSpeedIndex = index;
                    })
                }
                .width('100%')
                .height(this.responsive.scale(48))
                .margin({ top: this.responsive.scale(12) })
                .justifyContent(FlexAlign.SpaceBetween)

                // 镜像开关区
                Row() {
                  Text('镜像显示')
                    .fontSize(this.responsive.scaleFont(16))
                    .fontWeight(FontWeight.Medium)
                  Toggle({ type: ToggleType.Switch, isOn: this.isMirror })
                    .onChange((isOn: boolean) => {
                      this.isMirror = isOn;
                    })
                }
                .width('100%')
                .height(this.responsive.scale(48))
                .margin({ top: this.responsive.scale(12) })
                .justifyContent(FlexAlign.SpaceBetween)

                // 夜间模式开关区
                Row() {
                  Text('夜间模式')
                    .fontSize(this.responsive.scaleFont(16))
                    .fontWeight(FontWeight.Medium)
                  Toggle({ type: ToggleType.Switch, isOn: this.isNightMode })
                    .onChange((isOn: boolean) => {
                      this.isNightMode = isOn;
                    })
                }
                .width('100%')
                .height(this.responsive.scale(48))
                .margin({ top: this.responsive.scale(12) })
                .justifyContent(FlexAlign.SpaceBetween)

                // 文字颜色区
                Row() {
                  Text('文字颜色')
                    .fontSize(this.responsive.scaleFont(16))
                    .fontWeight(FontWeight.Medium)
                  Select([
                    { value: this.fontColorNames[0] },
                    { value: this.fontColorNames[1] },
                    { value: this.fontColorNames[2] },
                    { value: this.fontColorNames[3] },
                    { value: this.fontColorNames[4] },
                    { value: this.fontColorNames[5] }
                  ])
                    .value(this.fontColorNames[this.selectedFontColorIndex])
                    .selected(this.selectedFontColorIndex)
                    .backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF')
                    .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
                    .borderWidth(0)
                    .onSelect((index: number) => {
                      this.selectedFontColorIndex = index;
                    })
                }
                .width('100%')
                .height(this.responsive.scale(48))
                .margin({ top: this.responsive.scale(12) })
                .justifyContent(FlexAlign.SpaceBetween)

                // 背景颜色主题区
                Row() {
                  Text('背景颜色')
                    .fontSize(this.responsive.scaleFont(16))
                    .fontWeight(FontWeight.Medium)
                  Select([
                    { value: this.themeNames[0] },
                    { value: this.themeNames[1] },
                    { value: this.themeNames[2] },
                    { value: this.themeNames[3] },
                    { value: this.themeNames[4] },
                    { value: this.themeNames[5] }
                  ])
                    .value(this.themeNames[this.selectedThemeIndex])
                    .selected(this.selectedThemeIndex)
                    .backgroundColor(this.isNightMode ? '#3A3A3C' : '#FFFFFF')
                    .fontColor(this.isNightMode ? '#99FFFFFF' : '#99000000')
                    .borderWidth(0)
                    .onSelect((index: number) => {
                      this.selectedThemeIndex = index;
                    })
                }
                .width('100%')
                .height(this.responsive.scale(48))
                .margin({ top: this.responsive.scale(12) })
                .justifyContent(FlexAlign.SpaceBetween)

              }
              .width('100%')
              .padding({
                left: this.responsive.scale(12),
                right: this.responsive.scale(12),
                top: this.responsive.scale(4),
                bottom: this.responsive.scale(4)
              })
              .margin({ bottom: this.responsive.scale(12) })
              .backgroundColor(this.isNightMode ? '#2C2C2E' : Color.White)
              .borderRadius(this.responsive.scale(16))
            }
            .width('100%')
            .alignItems(HorizontalAlign.Start) // 设置Column容器的内容左对齐

            Button('显示弹幕')
              .height(this.responsive.scale(40))
              .backgroundColor('#0A59F7')
              .margin({ top: this.responsive.scale(32) })
              .width('100%')
              .onClick(() => {
                // 1. 把当前页面的设置项组装成Settings对象
                const settings = new Settings(this.content, this.fontSize, this.fontWeight, this.marqueeSpeeds[this.selectedSpeedIndex], this.isMirror, this.fontColors[this.selectedFontColorIndex], this.gradientThemes[this.selectedThemeIndex], this.isNightMode);
                // 2. 跳转：第一个参数是路由表的name，第二个是传递的参数
                this.pathInfos.pushPathByName('Led', settings);
              })
          }
          .width('100%')
          .padding({
            left: this.responsive.getPadding(),
            right: this.responsive.getPadding()
          })
        }
        .scrollBar(BarState.Auto)
        .edgeEffect(EdgeEffect.Spring)
        .width('100%')
        .layoutWeight(1)
      }
      .width('100%') // 设置Column容器宽度为100%，横向占满屏幕
      .height('100%') // 设置Column容器高度为100%，纵向占满屏幕
      .background(this.isNightMode ? '#1C1C1E' : '#F1F3F5')
      .alignItems(HorizontalAlign.Start)
    }
    .mode(NavigationMode.Stack) // 设置单栏模式
    .hideToolBar(true) // 隐藏工具栏
  }
}