System.register("chunks:///_virtual/background.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "6528fuIia9EZ5H9YEh06cqr", "background", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var background = exports('background', (_dec = ccclass('background'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(background, _Component);

        function background() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.playingtime = 0;
          _this.speed = 100;
          _this.dt = 0;
          return _this;
        }

        var _proto = background.prototype;

        _proto.reset = function reset() {
          this.playingtime = 0;
          this.speed = 0;
        };

        _proto.setspeed = function setspeed() {
          this.speed = 100;
          this.playingtime = 0;
        };

        _proto.beginplayingtime = function beginplayingtime() {
          this.playingtime += this.dt;
        };

        _proto.setactive = function setactive() {
          this.node.active = false;
        };

        _proto.getposition = function getposition() {
          return this.node.position.x;
        };

        _proto.setposition = function setposition(x, y) {
          this.node.setPosition(x, y);
        };

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {
          this.dt = deltaTime; //console.log(this.playingtime/2)
          // 计算每帧需要移动的;距离

          var distanceToMove = (this.speed + this.playingtime / 2) * deltaTime; // 获取当前节点的位置

          var currentPosition = this.node.getPosition(); // 更新节点的 x 坐标

          this.node.setPosition(currentPosition.x + distanceToMove, currentPosition.y);
        };

        return background;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bird.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, RigidBody2D, v2, Collider2D, Tween, tween, v3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      RigidBody2D = module.RigidBody2D;
      v2 = module.v2;
      Collider2D = module.Collider2D;
      Tween = module.Tween;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "9deacqpQ+lJL7G1BeUr98I+", "bird", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var bird = exports('bird', (_dec = ccclass('bird'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(bird, _Component);

        function bird() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.isJumping = false; // 标志是否正在跳跃

          _this.currentPos = void 0;

          _initializerDefineProperty(_this, "touchsize", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = bird.prototype;

        _proto.onLoad = function onLoad() {
          // 监听鼠标点击事件
          this.touchsize.on(Node.EventType.TOUCH_START, this.onMouseDown, this);
        };

        _proto.onDestroy = function onDestroy() {
          // 移除鼠标点击事件监听
          this.touchsize.off(Node.EventType.TOUCH_START, this.onMouseDown, this);
        };

        _proto.reset = function reset() {
          this.node.setPosition(0, 0);
          var body = this.node.getComponent(RigidBody2D);
          body.gravityScale = 0;
          body.linearVelocity = v2(0, 0);
        };

        _proto.setgravity = function setgravity() {
          var body = this.node.getComponent(RigidBody2D);
          body.gravityScale = 0.5;
          console.log("worked");
          console.log(body.gravityScale);
        };

        _proto.collid = function collid() {
          var comp = this.node.getComponent(Collider2D);
          console.log(comp);
          return comp;
        };

        _proto.onMouseDown = function onMouseDown() {
          var body = this.node.getComponent(RigidBody2D);

          if (!this.isJumping) {
            // 开始跳跃
            this.jump();
          } else {
            // 停止上一个跳跃并开始新的跳跃
            this.stopJump();
            this.jump();
          }

          body.linearVelocity = v2(0, 0);
        };

        _proto.jump = function jump() {
          var _this2 = this;

          this.isJumping = true;
          Tween.stopAllByTarget(this.node);
          this.currentPos = this.node.getPosition();
          console.log(this.currentPos); // 使用缓动系统实现节点向上跳跃

          tween(this.node).to(0.5, {
            position: v3(this.currentPos.x, this.currentPos.y + 50, 0)
          }, {
            easing: 'sineOut'
          }) // 跳跃的高度为100
          .call(function () {
            _this2.isJumping = false; // 跳跃结束

            _this2.scheduleOnce(function () {
              // 在回调中等待0.5秒
              console.log("Delay 0.5s after tween");
            }, 0.5);
          }).start();
        };

        _proto.stopJump = function stopJump() {
          this.currentPos = this.node.getPosition(); // 停止当前跳跃并将节点位置设置为当前位置

          Tween.stopAllByTarget(this.node);
          this.node.setPosition(this.currentPos.x, this.currentPos.y);
          this.isJumping = false;
        };

        _proto.start = function start() {//  this.onLoad();
        };

        _proto.update = function update(deltaTime) {};

        return bird;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "touchsize", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gamemanage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './bird.ts', './playercontrol.ts', './background.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, Label, instantiate, RigidBody2D, v2, Contact2DType, Component, bird, playercontrol, background;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      Label = module.Label;
      instantiate = module.instantiate;
      RigidBody2D = module.RigidBody2D;
      v2 = module.v2;
      Contact2DType = module.Contact2DType;
      Component = module.Component;
    }, function (module) {
      bird = module.bird;
    }, function (module) {
      playercontrol = module.playercontrol;
    }, function (module) {
      background = module.background;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "aea7dAnfV9GtpZ0N6+VXKFg", "gamemanage", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var gamestate = /*#__PURE__*/function (gamestate) {
        gamestate[gamestate["gt_inti"] = 0] = "gt_inti";
        gamestate[gamestate["gt_playing"] = 1] = "gt_playing";
        gamestate[gamestate["gt_fail"] = 2] = "gt_fail";
        return gamestate;
      }(gamestate || {});

      var gamemanage = exports('gamemanage', (_dec = ccclass('gamemanage'), _dec2 = property({
        type: bird
      }), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Node), _dec6 = property(playercontrol), _dec7 = property(Node), _dec8 = property(Label), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(background), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(gamemanage, _Component);

        function gamemanage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.blockpos_x = [];
          _this.playingtime = 0;
          _this.maxdistance = 140;
          _this.x_maxdistance = 420;
          _this.x_mindistance = 220;
          _this.x_distance = 0;
          _this.lastxpos = 0;
          _this.birdpos_x = 0;
          _this.scorecheck = 1;

          _initializerDefineProperty(_this, "bird", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "upblock", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "downblock", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "begin", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playcrl", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "fail", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "score", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rangebox", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "opendate", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "background", _descriptor10, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = gamemanage.prototype;

        _proto.generatemap = function generatemap() {
          this.lastxpos = 0;
          this.x_distance = 0;
          this.maxdistance = 140;
          this.x_mindistance = 220;
          this.scorecheck = 1;

          for (var i = 0; i < 400; i++) {
            //计算出横向间隔
            this.x_distance = Math.floor(Math.random() * 200) + (this.x_mindistance + 1 - i / 10);
            var up_yint = Math.floor(Math.random() * 741) - 115; // 上面管道的坐标可能出现的位置

            var distance = Math.floor(Math.random() * this.maxdistance - i / 7) + 85; // let down_yint = up_yint - 730;

            while (up_yint - distance - 650 < -450) {
              up_yint = Math.floor(Math.random() * 741) - 115; // 上面管道的坐标可能出现的位置

              distance = Math.floor(Math.random() * this.maxdistance - i / 7) + 85;
            }

            var down_yint = up_yint - distance - 650;
            var upblock = instantiate(this.upblock);
            this.node.addChild(upblock);
            upblock.setPosition(this.lastxpos + this.x_distance, up_yint);
            var downblock = instantiate(this.downblock);
            this.node.addChild(downblock);
            downblock.setPosition(this.lastxpos + this.x_distance, down_yint); //

            this.blockpos_x[i] = this.lastxpos + this.x_distance;
            this.lastxpos += this.x_distance;
          }
        };

        _proto.inti = function inti() {
          //生成地图
          this.node.destroyAllChildren();
          this.generatemap(); //重置鸟

          this.bird.reset();
          this.bird.getComponent(RigidBody2D).linearVelocity = v2(0, 0); //开始按钮显示，注销点击事件

          this.begin.active = true;
          this.bird.onDestroy(); //停止速度

          this.playcrl.reset(); //隐藏失败页面

          this.fail.active = false; //this.playcrl.beginplayingtime();
          //隐藏排行榜

          this.rangebox.active = false; //获得微信授权
          //重置背景

          this.background.reset();
        };

        _proto.onbeginclick = function onbeginclick() {
          this.bird.onLoad();
          this.begin.active = false;
          this.bird.setgravity();
          this.playcrl.setspeed();
          this.playcrl.beginplayingtime();
          this.background.setspeed();
          this.background.beginplayingtime();
          this.gamecontrol(gamestate.gt_playing);
          this.collidopen();
        };

        _proto.onagainclick = function onagainclick() {
          this.gamecontrol(gamestate.gt_inti);
          this.playcrl.setposition(-147, -38.265);
          this.background.setposition(0, 0);
          this.scorecheck = 1;
          var zero = 0;
          this.score.string = zero.toString();
        };

        _proto.onrangeclick = function onrangeclick() {
          this.rangebox.active = true;
          this.fail.active = false;
        } //碰撞监听打开和关闭
        ;

        _proto.collidopen = function collidopen() {
          var _this2 = this;

          this.bird.collid().on(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider, contact) {
            _this2.gamecontrol(gamestate.gt_fail);

            console.log("kakakakkaka");
          }, this);
        };

        _proto.collidoff = function collidoff() {
          this.bird.collid().off(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider, contact) {}, this);
        };

        _proto.gamecontrol = function gamecontrol(value) {
          switch (value) {
            case gamestate.gt_inti:
              this.inti();
              break;

            case gamestate.gt_playing:
              break;

            case gamestate.gt_fail:
              this.bird.reset();
              this.playcrl.reset();
              this.background.reset();
              this.fail.active = true;
              this.collidoff();
              this.bird.onDestroy(); // this.updatescore()

              break;
          }
        } //排行榜代码
        // sendmesssage()
        // {
        //     wx.getOpenDataContext().postMessage({
        //         message: this.scorecheck - 1
        //     });
        // }
        // initUserInfoButton () {
        //     // 微信授权，此代码来自Cocos官方
        //     if (typeof wx === 'undefined') {
        //         return;
        //     }
        //     let systemInfo = wx.getSystemInfoSync();
        //     let width = systemInfo.windowWidth;
        //     let height = systemInfo.windowHeight;
        //     let button = wx.createUserInfoButton({
        //         type: 'text',
        //         text: '',
        //         style: {
        //             left: 0,
        //             top: 0,
        //             width: width,
        //             height: height,
        //             lineHeight: 40,
        //             backgroundColor: '#00000000',
        //             color: '#00000000',
        //             textAlign: 'center',
        //             fontSize: 10,
        //             borderRadius: 4
        //         }
        //     });
        //     button.onTap((res) => {
        //         if (res.userInfo) {
        //             // 可以在这里获取当前玩家的个人信息，如头像、微信名等。
        //             console.log('授权成功！');
        //         }
        //         else {
        //             console.log('授权失败！');
        //         }
        //         button.hide();
        //         button.destroy();
        //     });
        // }
        //微信
        // private isFirsttime = true; // 标记玩家是否第一次游玩
        // private playerscore = 0; // 记录玩家当前的分数
        // private playname = ''; // 记录玩家昵称
        // private playeravataurl = ''; // 记录玩家头像
        // updatescore()
        // {
        //     let openDataContext = wx.getOpenDataContext()
        //     openDataContext.postMessage({
        //         type: 'scores',
        //     score: this.scorecheck-1,
        // })
        // }
        ;

        _proto.start = function start() {
          this.gamecontrol(gamestate.gt_inti);
        };

        _proto.update = function update(deltaTime) {
          this.playingtime += deltaTime;
          this.birdpos_x = this.playcrl.getposition(); // while(this.fail.active == false)

          if (this.birdpos_x > this.blockpos_x[this.scorecheck - 1]) {
            this.score.string = this.scorecheck.toString();
            this.scorecheck++;
          }
        };

        return gamemanage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bird", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "upblock", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "downblock", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "begin", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playcrl", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fail", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "score", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rangebox", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "opendate", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './background.ts', './bird.ts', './gamemanage.ts', './playercontrol.ts'], function () {
  return {
    setters: [null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/playercontrol.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "f5abaU29S9ONrMvPnBYARbI", "playercontrol", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var playercontrol = exports('playercontrol', (_dec = ccclass('playercontrol'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(playercontrol, _Component);

        function playercontrol() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.playingtime = 0;
          _this.speed = 100;
          _this.dt = 0;
          return _this;
        }

        var _proto = playercontrol.prototype;

        _proto.reset = function reset() {
          this.playingtime = 0;
          this.speed = 0;
        };

        _proto.setspeed = function setspeed() {
          this.speed = 100;
          this.playingtime = 0;
        };

        _proto.beginplayingtime = function beginplayingtime() {
          this.playingtime += this.dt;
        };

        _proto.setactive = function setactive() {
          this.node.active = false;
        };

        _proto.getposition = function getposition() {
          return this.node.position.x;
        };

        _proto.setposition = function setposition(x, y) {
          this.node.setPosition(x, y);
        };

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {
          this.dt = deltaTime; //console.log(this.playingtime/2)
          // 计算每帧需要移动的;距离

          var distanceToMove = (this.speed + this.playingtime / 2) * deltaTime; // 获取当前节点的位置

          var currentPosition = this.node.getPosition(); // 更新节点的 x 坐标

          this.node.setPosition(currentPosition.x + distanceToMove, currentPosition.y);
        };

        return playercontrol;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});