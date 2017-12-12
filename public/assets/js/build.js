$ (window).load (function () {
  /// Loading 結束
  $ ('#index').fadeOut (300);
  $ ('section').removeClass ('hide');
  $ ('body').css ('overflow', 'auto');

  /// 經過 3 秒在 load detail 的大圖
  setTimeout (function () {
    $ ('#details-popup').find ('[data-detail-src]').each (function () {
      var t = $ (this).attr ('data-detail-src');
      $ (this).attr ('src', t);
    });
  }, 3000);

});

$ (document).ready (function () {
  // vue
  ZuWatch = new Vue ({
    el: '#zu-watch',
    data: {
      apiData: [], // 歸類好方便取得的 Rewards Array
      location: 'tw', // tw 台灣、glabal 國際
      status: 'basic', // 目前只有 basic, other
      twElements: {
        case: [],
        dial: [],
        strap: [],
        backCase: [],
        others: [],
        collection: []
      },
      preview: {
        now: {a: 'ca-01', b: 'zu-01-w', c: 'lc-01'},
      },
      save: {
        saveA: {a: null, b: null, c: null},
        saveB: {a: null, b: null, c: null},
        saveC: {a: null, b: null, c: null},
        saveD: {a: null, b: null, c: null},
      },
      cart: {
        basic: {a1: 'ca-01', b1: 'zu-01-w', c1: 'lc-01'},
        /// double 會保留 basic，額外再多一組 SET
        double: {a1: null, b1: null, c1: null},
        /// it's named as 'other' in this website.
        unlimited: [],
        /// 這個 common 是給台灣地區，有 backCase & others 配件
        common: {
          backCase: 'backcase-01',
          others: ['backcase-01', 'backcase-01', 'backcase-01', 'backcase-01'],
        },
        /// 這個欄位是當 double set 的時候，選取配件是第一組手錶還是第二組
        doubleWhich: 1,
      },
      /// 台灣版結帳使用的表單
      rewardIdForForm: [],
      totalAmount: 0,
      elementsCounts: {case: '', dial: '', strap: ''},
    },

    created: function () {
      this.locationChange ();
      this.routeStatusChange ();
      this.fetchData ();
    },

    computed: {
      whichElementSelected: function () {
        // 判斷那個物件被選取正在 preview，亮綠色點點
        var a = this.preview.now.a;
        var b = this.preview.now.b;
        var c = this.preview.now.c;
        // 統一加入購物車
        this.elementAddCart (a, b, c);
        $ ('[data-selected]').removeClass ('active');
        $ ('[data-selected=' + a + ']').addClass ('active');
        $ ('[data-selected=' + b + ']').addClass ('active');
        $ ('[data-selected=' + c + ']').addClass ('active');
      },
      diffCartChange: function () {
        // 切換 status 或 cart 加入刪除有更動，就重新計算金額跟要送出去 Backme 的東東們
        /// 一切只在台灣與國際預購才判斷
        var self = this;
        if (self.location == 'tw' || self.location == 'global') {
          var valueArray = [];
          var totalAmount = 0;
          var backCase = self.cart.common.backCase; // 背殼
          /// 如果是 pro double basic : 只處理 case, dial, strap
          /// 如果是 unlimited(other) : 處理 case, dial, strap, backCase, others
          var mainObject = self.cart[self.status];
          var checkFormApiObject = self.apiData;
          /// 背殼、others 額外處理，這裡只處理 case, dial, strap
          Object.keys (mainObject).forEach (function (e) {
            var mainValue = mainObject[e];
            if (mainValue !== null) {
              valueArray.push ({
                id: checkFormApiObject[mainValue].id,
                code: mainValue,
                name: checkFormApiObject[mainValue].name,
                price: checkFormApiObject[mainValue].price,
                stock: checkFormApiObject[mainValue].stock,
              });
              totalAmount += checkFormApiObject[mainValue].price;
            }
          });

          /// DOUBLE SET 要把 BASIC SET 也算進去
          if (self.status === 'double') {
            var basicMainObject = self.cart['basic'];
            Object.keys (basicMainObject).forEach (function (e) {
              var mainValue = basicMainObject[e];
              if (mainValue !== null) {
                valueArray.push ({
                  id: checkFormApiObject[mainValue].id,
                  code: mainValue,
                  name: checkFormApiObject[mainValue].name,
                  price: checkFormApiObject[mainValue].price,
                  stock: checkFormApiObject[mainValue].stock,
                });
                totalAmount += checkFormApiObject[mainValue].price;
              }
            });
          }

          /// 處理背殼的錢及送出表單，但因為 unlimited 是一起處理
          /// 原因：在一般組合，backCase 只能則一；但 unlimited 可以無限加購，所以才分開處理
          if (self.status !== 'unlimited') {
            totalAmount += checkFormApiObject[backCase].price;
            valueArray.push ({
              id: checkFormApiObject[backCase].id,
              code: backCase,
              name: checkFormApiObject[backCase].name,
              price: checkFormApiObject[backCase].price,
              stock: checkFormApiObject[backCase].stock,
            });
          }
          self.rewardIdForForm = valueArray;
          self.totalAmount = totalAmount;
        }
      },
      saveLocalStorage: function () {
        // 儲存在瀏覽器，讓重整不會掉
        localStorage['fullPage'] = btoa (JSON.stringify (this.$data));
      },
    },

    watch: {
      status: function () {
        // After v-if render, to bind her elements
        $ ('.cart-item').each (function () {
          this.observer = new MutationObserver (observeItemChange);
          var config = {
            attributes: true,
            childList: false,
            characterData: false,
            subtree: false,
          };
          this.observer.observe (this, config);
        });
        function observeItemChange (mutations) {
          if (mutations[0].target.className.indexOf ('null') == -1) {
            var d = mutations[0].target.offsetLeft - 80;
            $ ('#code-and-share .bottom-box .cart-content').animate (
              {scrollLeft: d},
              400
            );
          }
        }
        // status 切換也會影響金額跟要送出去 Backme 的東東們
        this.diffCartChange;
      },
      save: {
        handler: function (val, oldVal) {
          var t1 = this.save.saveA.a == null;
          var t2 = this.save.saveB.a == null;
          var t3 = this.save.saveC.a == null;
          var t4 = this.save.saveD.a == null;
          if (t1 && t2 && t3 && t4) {
            $ ('#save').removeClass ('hidetext');
          } else {
            $ ('#save').addClass ('hidetext');
          }
        },
        deep: true,
      },
      cart: {
        /// 要觀察 vue 巢狀物件下面值的變化要用 handler & deep，官方關鍵字「 深度 watcher 」
        /// val 為變化後，oldVal 為變化前的值
        handler: function (val, oldVal) {
          // Cart 一更動就要計算金額跟送出的 Backme 的東東
          this.diffCartChange;
        },
        deep: true,
      },
    },

    filters: {
      // taiwan
      in_stock: function (v) {
        if (v.quantity_limit == 0) {
          return 'sufficient stock';
        } else {
          var in_stock_count =
            v.quantity_limit - (v.pledged_count + v.wait_pledged_count);
          if (in_stock_count >= 5) {
            var in_stock_count = 'sufficient stock';
          } else if (in_stock_count >= 2) {
            var in_stock_count = 'low quantity';
          } else if (in_stock_count >= 0) {
            var in_stock_count = 'out of stock';
          }
          return in_stock_count;
        }
      },
      // 處理購物車元件預設灰圖
      cartCaseDefault: function (v) {
        if (!v) {
          return 'https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/case/null.png';
        } else {
          return v;
        }
      },
      cartDialDefault: function (v) {
        if (!v) {
          return 'https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/dial/null.png';
        } else {
          return v;
        }
      },
      cartStrapDefault: function (v) {
        if (!v) {
          return 'https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/strap/null.png';
        } else {
          return v;
        }
      },
    },

    methods: {
      locationChange: function () {
        if (location.host.indexOf ('jp') == 0) {
          this.location = 'jp';
        } else if (location.host.indexOf ('global') == 0) {
          this.location = 'global';
        } else {
          this.location = 'tw';
        }
      },
      routeStatusChange: function () {
        /// 已經過濾掉後面的參數跟前面的網域名
        var path = document.location.pathname.split ('/')[1];
        if ((path == 'basic') | (path == 'pro') | (path == 'double')) {
          this.status = path;
        } else if (path == 'other') {
          this.status = 'unlimited';
        }
      },
      fetchData: function () {
        var apiUrl = '';
        if (this.location == 'tw') {
          apiUrl =
            'https://zuwatch.backme.tw/api/projects/532.json?token=a788fa70032f09bdfd3fe5af2b3ae6f3';
        } else if (this.location == 'global') {
          apiUrl =
            'https://zuwatch.backme.tw/api/projects/704.json?token=a788fa70032f09bdfd3fe5af2b3ae6f3';
        }
        var self = this;
        $.getJSON (apiUrl, function (data) {
          // 將 api 資料格式轉成以產品元件編號為 key name 的物件格式，方便後續取用，不用再反查
          var newApiObject = {};
          data.rewards.forEach (function (el) {
            // 判斷是公開的回饋
            if (el.status == 'publish') {
              // 帶入 id 方便送出購買表單；帶入 price 方便計算價錢；帶入縮圖
              var key = el.tags[0];
              newApiObject[key] = {
                id: el.id,
                price: el.price,
                name: el.title,
                avatar_small: el.avatar.small.url,
                covers: el.covers,
                stock: el.quantity_limit == 0
                  ? 10
                  : el.quantity_limit -
                      (el.pledged_count + el.wait_pledged_count),
              };
              // 將 api 回饋物件們分類到 vue 裡，方便後續取得
              if (el.category == 'case') {
                self.twElements.case.push (el);
              } else if (el.category == 'dial') {
                self.twElements.dial.push (el);
              } else if (el.category == 'strap') {
                self.twElements.strap.push (el);
              } else if (el.category == 'back-case') {
                // hotfixed to hide the backcase-01
                // 為了防止 production 受影響
                if ( el.tags[0] !== 'backcase-01') {
                  self.twElements.backCase.push (el);
                }
              } else if (el.category == 'others') {
                // hotfixed to hide the buckle
                // 為了防止 production 受影響
                if (el.tags[0] !== 'customize-buckle') {
                  self.twElements.others.push (el);
                } else {
                  self.twElements.backCase.push (el);
                }
              } else if (el.category == 'collection') {
                self.twElements.collection.push (el);
              }
            }
          });
          // 跑完回圈，再將這物件存進 vue 裡，跟回圈裡下半段分類無關
          self.apiData = newApiObject;
        });
      },
      chooseStatus: function (type) {
        this.status = type;
      },
      elementChange: function (a, b, c) {
        $ ('div.preview-1, div.preview-2, div.preview-3').removeClass (
          'active'
        );
        if (a) this.preview.now.a = a;
        if (b) this.preview.now.b = b;
        if (c) this.preview.now.c = c;
        this.whichElementSelected;
      },
      // for taiwan
      twRandomElements: function () {
        var a = this.twElements.case;
        var aN = a.length;
        var b = this.twElements.dial;
        var bN = b.length;
        var c = this.twElements.strap;
        var cN = c.length;
        this.preview.now.a = a[Math.floor (Math.random () * aN)].tags[0];
        this.preview.now.b = b[Math.floor (Math.random () * bN)].tags[0];
        this.preview.now.c = c[Math.floor (Math.random () * cN)].tags[0];
        this.whichElementSelected;
      },
      saveElements: function () {
        // 檢查物件有無為空不用三個部位檢查，檢查一個就好
        var checkA = this.save.saveA.a;
        var checkB = this.save.saveB.a;
        var checkC = this.save.saveC.a;
        var checkD = this.save.saveD.a;
        var a = [checkA, checkB, checkC, checkD];
        var b = ['saveA', 'saveB', 'saveC', 'saveD'];
        if (checkA && checkB && checkC && checkD) {
          alert ('Sorry... There is no space...');
        } else {
          for (i = 0; i <= 3; i++) {
            if (!a[i]) {
              this.save[b[i]].a = this.preview.now.a;
              this.save[b[i]].b = this.preview.now.b;
              this.save[b[i]].c = this.preview.now.c;
              this.whichElementSelected;
              // localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
              break;
            }
          }
        }
      },
      callSave: function (saveN) {
        this.preview.now.a = this.save[saveN].a;
        this.preview.now.b = this.save[saveN].b;
        this.preview.now.c = this.save[saveN].c;
        this.whichElementSelected;
      },
      deleteElementsFromSave: function (saveN) {
        this.save[saveN].a = null;
        this.save[saveN].b = null;
        this.save[saveN].c = null;
      },
      calcElementsInCart: function () {
        var status = this.status;
        var cart = this.cart;
        /// 如果是 DOUBLE SET，那必須包含 basic + double
        var setObj = this.cart[status];
        var array = Object.keys (setObj);
        var total_counts = array.length;
        var counts = 0;
        var case_counts = 0;
        var case_total = 0;
        var dial_counts = 0;
        var dial_total = 0;
        var strap_counts = 0;
        var strap_total = 0;
        var self = this;
        array.forEach (function (e, i) {
          if (e.indexOf ('a') !== -1) {
            if (cart[status][e] !== null) {
              case_counts++;
            }
            case_total++;
            self.elementsCounts.case =
              case_counts.toString () + '/' + case_total.toString ();
          } else if (e.indexOf ('b') !== -1) {
            if (cart[status][e] !== null) {
              dial_counts++;
            }
            dial_total++;
            self.elementsCounts.dial =
              dial_counts.toString () + '/' + dial_total.toString ();
          } else if (e.indexOf ('c') !== -1) {
            if (cart[status][e] !== null) {
              strap_counts++;
            }
            strap_total++;
            self.elementsCounts.strap =
              strap_counts.toString () + '/' + strap_total.toString ();
          }
          counts = case_counts + dial_counts + strap_counts;
        });
        if (total_counts !== counts) {
          $ ('#cart-code-btn').removeClass ('ok');
          $ ('#random-this-cart').removeClass ('ok');
          $ ('#cart-code-btn .pg').css (
            'width',
            counts / total_counts * 100 + '%'
          );
          return counts + '/' + total_counts;
        } else {
          $ ('#cart-code-btn').addClass ('ok');
          $ ('#random-this-cart').addClass ('ok');
          $ ('#cart-code-btn .pg').css (
            'width',
            counts / total_counts * 100 + '%'
          );
          return 'CHECKOUT';
        }
      },
      elementAddCart: function (a, b, c) {
        if (this.status == 'basic') {
          if (a) {
            this.cart.basic.a1 = a;
          }
          if (b) {
            this.cart.basic.b1 = b;
          }
          if (c) {
            this.cart.basic.c1 = c;
          }
        } else if (this.status == 'double') {
          var $doubleWhich = this.cart.doubleWhich === 1 ? 'basic' : 'double';
          if (a) {
            this.cart[$doubleWhich].a1 = a;
          }
          if (b) {
            this.cart[$doubleWhich].b1 = b;
          }
          if (c) {
            this.cart[$doubleWhich].c1 = c;
          }
        }
      },
      formSubmit: function () {
        var canSubmit = true;
        // check if everyone is 'out of stock' or not
        // if the element is 'out of stock',alert its name and set canSumit = false
        this.rewardIdForForm.forEach (function (el, i) {
          if (el.stock <= 1) {
            alert ("Sorry... '" + el.name + "' is out of stock.");
            canSubmit = false;
          }
        });
        if (canSubmit) {
          $ ('#output-popup').find ('form').submit ();
        }
      },
      deleteCartElement: function (status, item) {
        this.cart[status][item] = null;
      },
      // taiwan
      ChangeCartBackCase: function (backcase) {
        this.cart.common.backCase = backcase;
      },
      // taiwan Other's unlimitedCheckoutBtn()
      elementsAddOtherCart: function () {
        this.cart.unlimited.push (
          this.preview.now.a,
          this.preview.now.b,
          this.preview.now.c
        );
      },
      // unlimited(other) 時，加選跟刪除行為跟原本的不一樣
      elementAddOtherCart: function (code) {
        this.cart.unlimited.push (code);
      },
      elementAddOtherCartAndChangeStatus: function (code) {
        if (this.status !== 'unlimited') {
          this.status = 'unlimited';
          alert ('This item will appear in the "OTHER" section of the Cart.');
          this.cart.unlimited.push (code);
        } else {
          this.cart.unlimited.push (code);
        }
      },
      deleteOtherCartElement: function (index) {
        this.cart.unlimited.splice (index, 1);
      },
    }, // methods end
  }); // vue.js object end
}); // document ready end
