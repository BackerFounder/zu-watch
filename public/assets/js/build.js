$(window).load(function() {

	$(".elements-tab-btn").click(function() {
		var t = $(this).attr('data-tab')
		$(".elements-tab-btn").removeClass('active')
		$(".elements-content-box").removeClass('active')
		$(".elements-tab-btn[data-tab='" + t + "']").addClass('active')
		$(".elements-content-box[data-tab='" + t + "']").addClass('active')
	});
	$(".code-section-cancel[data-code]").click(function() {
		var t = $(this).attr('data-code')
		$(".code-section[data-code='" + t + "']").removeClass('active')
	})

	$(".code-btn[data-code]").click(function() {
		var t = $(this).attr('data-code')
		$(".code-section[data-code='" + t + "']").addClass('active')
	})


	// 暫時先放這
	var clipboard = new Clipboard('#code-result-copy', {
    text: function() {
        return $('#code-result').text()
    }
	});
	clipboard.on('success', function(e) {
    alert('Copy Success!')
	});

	clipboard.on('error', function(e) {
    alert('Error Q_Q')
	});

})



$(document).ready(function() {
  // vue
  ZuWatch = new Vue ({
    el: '#zu-watch',
    data: {
      apiData: [],
      utmFlag: '',
      location: 'tw',
      status: 'basic',
      elements: {
        case: [
          { code: 'ca-01', name: 'Silver Case' },
          { code: 'ca-02', name: 'Black Case' },
          { code: 'ca-03', name: 'Rose Gold Case' },
        ],
        dial: [
          { code: 'zu-01-b', name: 'Simple-Black' },
          { code: 'zu-01-w', name: 'Simple-White' },
          { code: 'zu-02-b', name: 'Gentry-Black' },
          { code: 'zu-02-w', name: 'Gentry-White' },
          { code: 'zu-03-b', name: 'Precision-Black' },
          { code: 'zu-03-w', name: 'Precision-White' },
          { code: 'zu-04-b', name: 'Light-Black' },
          { code: 'zu-04-w', name: 'Light-White' },
          { code: 'zu-05-b', name: 'Marble-Black' },
          { code: 'zu-05-w', name: 'Marble-White' },
          { code: 'zu-06-b', name: 'Amiable-Black' },
          { code: 'zu-06-w', name: 'Amiable-White' },
          { code: 'zu-07-b', name: 'Roman-Black' },
          { code: 'zu-07-w', name: 'Roman-White' },
          { code: 'zu-08-b', name: 'Kaleidoscope-Black' },
          { code: 'zu-08-w', name: 'Kaleidoscope-White' },
          { code: 'zu-09-b', name: 'Flow-Black' },
          { code: 'zu-09-w', name: 'Flow-White' },
          { code: 'zu-10-b', name: 'Grilles-Black' },
          { code: 'zu-10-w', name: 'Grilles-White' },
          { code: 'zu-11-b', name: 'Space Oddity' },
          { code: 'zu-11-w', name: 'Explorer' }
        ],
        strap: [
          { code: 'lc-01', name: 'Classic Black' },
          { code: 'lc-02', name: 'Classic White' },
          { code: 'lc-03', name: 'Classic Apricot' },
          { code: 'lc-04', name: 'Classic Gray' },
          { code: 'lc-05', name: 'Classic Blue' },
          { code: 'lf-01', name: 'Formal Black' },
          { code: 'lf-02', name: 'Formal White' },
          { code: 'lf-03', name: 'Formal Blue' },
          { code: 'lf-04', name: 'Formal Mulberry' },
          { code: 'me-01', name: 'Mesh Silver' },
          { code: 'me-02', name: 'Mesh Black' },
          { code: 'me-03', name: 'Mesh Rose Gold' },
          { code: 'nl-01', name: 'Nato Black' },
          { code: 'nl-02', name: 'Nato Chocolate' },
          { code: 'nl-03', name: 'Nato Brown' },
          { code: 'ny-01', name: 'Nylon Black' },
          { code: 'ny-02', name: 'Nylon Gray' },
          { code: 'ny-03', name: 'Nylon Army Green' }
        ],
        caseCodeArray: [],
        dialCodeArray: [],
        strapCodeArray: []
      },
      twElements: {
        case: [],
        dial: [],
        strap: [],
        backCase: [],
        others: []
      },
      preview: {
        prev: { a: null, b: null, c: null },
        now:  { a: 'ca-01', b: 'zu-01-b', c: 'lc-01' },
        next: { a: null, b: null, c: null }
      },
      save: {
        saveA: { a: null, b: null, c: null },
        saveB: { a: null, b: null, c: null },
        saveC: { a: null, b: null, c: null },
        saveD: { a: null, b: null, c: null }
      },
      cart: {
        basic: {
          a1: null,
          b1: null,
          c1: null
        },
        pro: {
          a1: null,
          b1: null,
          b2: null,
          c1: null,
          c2: null
        },
        double: {
          a1: null,
          a2: null,
          b1: null,
          b2: null,
          b3: null,
          b4: null,
          b5: null,
          c1: null,
          c2: null,
          c3: null,
          c4: null,
          c5: null
        }
      },
      /// 台灣版結帳使用的表單
      rewardIdForForm: [
        2560,
        2563,
        2566
      ],
      elementsCounts: {
        case: '',
        dial: '',
        strap: ''
      }
    },

    created: function() {
    	this.fetchData()
    },

    computed: {
			previewChange: function() {
    		this.preview.prev.a = this.preview.now.a
    		this.preview.prev.b = this.preview.now.b
    		this.preview.prev.c = this.preview.now.c
    	},
      whichElementSelected: function() {
        var a = this.preview.now.a
        var b = this.preview.now.b
        var c = this.preview.now.c
        $('[data-selected]').removeClass('active');
        $('[data-selected=' + a +']').addClass('active');
        $('[data-selected=' + b +']').addClass('active');
        $('[data-selected=' + c +']').addClass('active');
      },
      saveLocalStorage: function() {
        // 儲存在瀏覽器，讓重整不會掉
        localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
      }
    },

    watch: {
      status: function() {
        // After v-if render to bind her elements
        $(".cart-item").each(function() {
          this.observer = new MutationObserver(observeItemChange);
          var config = {
            attributes: true,
            childList: false,
            characterData: false,
            subtree: false
          };
          this.observer.observe(this, config);
        });
        function observeItemChange(mutations) {
          if ( mutations[0].target.className.indexOf("null") == -1 ) {
            var d = mutations[0].target.offsetLeft - 80
            $('#code-and-share .bottom-box').animate( { scrollLeft: d }, 400);
          }
        }
      },
      cart: {
        /// 要觀察下面只要有 object 變化要這樣寫，我也不知道為什麼 by Doppler
        handler: function (val, oldVal) {
          var self = this
          var valueArray = []
          var mainObject = val[self.status]
          var checkFormApiObject = self.apiData
          Object.keys(mainObject).forEach(function(e) {
            var mainValue = mainObject[e]
            if ( mainValue !== null ) {
              valueArray.push({
                id: checkFormApiObject[mainValue].id,
                code: mainValue,
                price: checkFormApiObject[mainValue].price
              })  
            }
          })
          self.rewardIdForForm = valueArray
        },
        deep: true
      }
    },

    filters: {
      casePreviewSprite: function(v) {
        var target = v
        var array = this.elements.caseCodeArray
        var n = array.indexOf(v)
        var l = array.length
        var bgs = 'background-size: auto ' + ( 100 * l ) + '%;'
        var bgp = 'background-position: center ' + ( 100 * n / ( l - 1 ) ) + '%;'
        return bgs + bgp
      },
      dialPreviewSprite: function(v) {
        var target = v
        var array = this.elements.dialCodeArray
        var n = array.indexOf(v)
        var l = array.length
        var bgs = 'background-size: auto ' + ( 100 * l ) + '%;'
        var bgp = 'background-position: center ' + ( 100 * n / ( l - 1 ) ) + '%;'
        return bgs + bgp
      },
      strapPreviewSprite: function(v) {
        var target = v
        var array = this.elements.strapCodeArray
        var n = array.indexOf(v)
        var l = array.length
        var bgs = 'background-size: auto ' + ( 100 * l ) + '%;'
        var bgp = 'background-position: center ' + ( 100 * n / ( l - 1 ) ) + '%;'
        return bgs + bgp
      },
      // taiwan
      in_stock: function(v) {
        var in_stock_count = v.quantity_limit - (v.pledged_count + v.wait_pledged_count)
        return in_stock_count
      }
    },

    methods: {
    	fetchData: function() {
  			// this.$data = JSON.parse(atob(localStorage['fullPage']))
        if ( this.location == 'jp' ) {
          this.whichElementSelected
          var path = document.location.pathname.split("/")[1]
          $('[data-hover-show="index-bg-' + path + '"]').click()
          var caseCodeArray = []
          var dialCodeArray = []
          var strapCodeArray = []
          this.elements.case.forEach(function(e){
            caseCodeArray.push(e.code)
          })
          this.elements.dial.forEach(function(e){
            dialCodeArray.push(e.code)
          })
          this.elements.strap.forEach(function(e){
            strapCodeArray.push(e.code)
          })
          this.elements.caseCodeArray = caseCodeArray
          this.elements.dialCodeArray = dialCodeArray
          this.elements.strapCodeArray = strapCodeArray
        } else if ( this.location == 'tw' ) {
          var self = this
          $.getJSON( "https://zuwatch.backme.tw/api/projects/532.json?token=a788fa70032f09bdfd3fe5af2b3ae6f3", function(data) {
            var newApiObject = {}
            data.rewards.forEach(function(el) {
              var key = el.title
              newApiObject[key] = {
                id: el.id,
                price: el.price,
              }
              if ( el.quantity_limit == 400 ) {
                self.twElements.case.push(el)
              }
              else if ( el.quantity_limit == 250 ) {
                self.twElements.dial.push(el)
              }
              else if ( el.quantity_limit == 800 ) {
                self.twElements.strap.push(el)
              }
            })
            self.apiData = newApiObject
          });
        }
    	},
      chooseStatus: function(type) {
        this.status = type
      },
    	elementChange: function(a, b, c) {
        $('div.preview-1, div.preview-2, div.preview-3').removeClass('active')
    		this.previewChange
    		if (a)
    			this.preview.now.a = a
    		if (b)
    			this.preview.now.b = b
    		if (c)
    			this.preview.now.c = c
        this.whichElementSelected
    		this.saveLocalStorage
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
      randomElements: function() {
        $('div.preview-1, div.preview-2, div.preview-3').addClass('active')
        this.previewChange
        var a = this.elements.caseCodeArray
        var aN = this.elements.case.length
        var b = this.elements.dialCodeArray
        var bN = this.elements.dial.length
        var c = this.elements.strapCodeArray
        var cN = this.elements.strap.length
        this.preview.now.a = a[Math.floor((Math.random() * aN))]
        this.preview.now.b = b[Math.floor((Math.random() * bN))]
        this.preview.now.c = c[Math.floor((Math.random() * cN))]
        this.whichElementSelected
        this.saveLocalStorage
        // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
      },
    	saveElements: function() {
    		// 檢查物件有無為空不用三個部位檢查，檢查一個就好
    		var checkA = this.save.saveA.a
    		var checkB = this.save.saveB.a
    		var checkC = this.save.saveC.a
    		var checkD = this.save.saveD.a
    		var a = [ checkA, checkB, checkC, checkD ]
    		var b = [ 'saveA', 'saveB', 'saveC', 'saveD' ]
    		if( checkA && checkB && checkC && checkD ) {
    			alert('Sorry... There is no space...')
    		}
    		else {
	    		for ( i = 0; i <= 3; i ++ ) {
	    			if ( !a[i] ) {
	    				this.save[b[i]].a = this.preview.now.a
	    				this.save[b[i]].b = this.preview.now.b
	    				this.save[b[i]].c = this.preview.now.c
              this.whichElementSelected
	    				localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
	    				// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
	    				break
	    			}
	    		}
	    	}
        if ($('.save-box.null').length == 4) { $('#save').addClass('hidetext') }
    	},
    	callSave: function(saveN) {
    		this.preview.now.a = this.save[saveN].a
    		this.preview.now.b = this.save[saveN].b
    		this.preview.now.c = this.save[saveN].c
        this.whichElementSelected
    		this.saveLocalStorage
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
    	deleteElementsFromSave: function(saveN) {
        this.save[saveN].a = null
        this.save[saveN].b = null
        this.save[saveN].c = null
        // 判斷如果都為空，把狀態加回來
        if ($('.save-box.null').length !== 4) { $('#save').removeClass('hidetext') }
        this.saveLocalStorage
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
    	undoElements: function() {
    		this.preview.next.a = this.preview.now.a
    		this.preview.next.b = this.preview.now.b
    		this.preview.next.c = this.preview.now.c
    		this.preview.now.a = this.preview.prev.a
    		this.preview.now.b = this.preview.prev.b
    		this.preview.now.c = this.preview.prev.c
    		this.preview.prev.a = null
    		this.preview.prev.b = null
    		this.preview.prev.c = null
        this.whichElementSelected
    		this.saveLocalStorage
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
    	nextElements: function() {
    		this.previewChange
    		this.preview.now.a = this.preview.next.a
    		this.preview.now.b = this.preview.next.b
    		this.preview.now.c = this.preview.next.c
    		this.preview.next.a = null
    		this.preview.next.b = null
    		this.preview.next.c = null
        this.whichElementSelected
    		this.saveLocalStorage
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
      calcElementsInCart: function() {
        var status = this.status
        var cart = this.cart
        var array = Object.keys(this.cart[status])
        var total_counts = array.length
        var counts = 0
        var case_counts = 0
        var case_total = 0
        var dial_counts = 0
        var dial_total = 0
        var strap_counts = 0
        var strap_total = 0
        var self = this
        array.forEach(function(e, i) {
          if ( e.indexOf('a') !== -1 ) {
            if ( cart[status][e] !== null ) {
              case_counts++
            }
            case_total++
            self.elementsCounts.case = case_counts.toString() + '/' + case_total.toString()
          }
          else if ( e.indexOf('b') !== -1 ) {
            if ( cart[status][e] !== null ) {
              dial_counts++
            }
            dial_total++
            self.elementsCounts.dial = dial_counts.toString() + '/' + dial_total.toString()
          }
          else if ( e.indexOf('c') !== -1 ) {
            if ( cart[status][e] !== null ) {
              strap_counts++
            }
            strap_total++
            self.elementsCounts.strap = strap_counts.toString() + '/' + strap_total.toString()
          }
          counts = case_counts + dial_counts + strap_counts
        })
        if ( total_counts !== counts ) {
          $('#cart-code-btn').removeClass('ok')
          $('#random-this-cart').removeClass('ok')
          $('#cart-code-btn .pg').css( 'width', ((counts/total_counts)*100) + '%' )
          return counts + '/' + total_counts
        } else {
          $('#cart-code-btn').addClass('ok')
          $('#random-this-cart').addClass('ok')
          $('#cart-code-btn .pg').css( 'width', ((counts/total_counts)*100) + '%' )
          if ( this.location == 'tw' ) { return 'Buy' }
          else if ( this.location == 'jp' ) { return 'Output' }
        }
      },
      elementAddCart: function(a, b, c) {
        if ( this.status == 'basic' ) {
          if (a) {
            if ( this.cart.basic.a1 == null ) {
              this.cart.basic.a1 = a;
            } else {
              if ( confirm("Do you want to replace with this Case?")) {
                this.cart.basic.a1 = a
              }
            }
          }
          if (b) {
            if ( this.cart.basic.b1 == null ) {
              this.cart.basic.b1 = b;
            } else {
              if ( confirm("Do you want to replace with this Dial?")) {
                this.cart.basic.b1 = b
              }
            }
          }
          if (c) {
            if ( this.cart.basic.c1 == null ) {
              this.cart.basic.c1 = c;
            } else {
              if ( confirm("Do you want to replace with this Strap?")) {
                this.cart.basic.c1 = c
              }
            }
          }
        }
        else if ( this.status == 'pro' ) {
          if (a) {
            if ( this.cart.pro.a1 == null ) {
              this.cart.pro.a1 = a;
            } else {
              if ( confirm("Do you want to replace with this Case?")) {
                this.cart.pro.a1 = a;
              }
            }
          }
          if (b) {
            if ( this.cart.pro.b1 == null ) {
              this.cart.pro.b1 = b
            }
            else if ( this.cart.pro.b2 == null ) {
              this.cart.pro.b2 = b
            }
            else {
              if ( confirm("Do you want to replace with this Dial?")) {
                this.cart.pro.b2 = b;
              }
            }
          }
          if (c) {
            if ( this.cart.pro.c1 == null ) {
              this.cart.pro.c1 = c
            }
            else if ( this.cart.pro.c2 == null ) {
              this.cart.pro.c2 = c
            }
            else {
              if ( confirm("Do you want to replace with this Strap?")) {
                this.cart.pro.c2 = c;
              }
            }
          }
        }
        else if ( this.status == 'double' ) {
          if (a) {
            if ( this.cart.double.a1 == null ) {
              this.cart.double.a1 = a
            }
            else if ( this.cart.double.a2 == null ) {
              this.cart.double.a2 = a
            }
            else {
              if ( confirm("Do you want to replace with this Case?")) {
                this.cart.double.a2 = a;
              }
            }
          }
          if (b) {
            var check1 = this.cart.double.b1
            var check2 = this.cart.double.b2
            var check3 = this.cart.double.b3
            var check4 = this.cart.double.b4
            var check5 = this.cart.double.b5
            var a = Object.keys(this.cart.double)
            if( check1 && check2 && check3 && check4 && check5 ) {
              if ( confirm("Do you want to replace with this Dial?")) {
                this.cart.double.b5 = b;
              }
            }
            else {
              for (var i = 0; i <= 4; i ++ ) {
                if ( !this.cart.double[ a[i+2] ] ) {
                  this.cart.double[ a[i+2] ] = b
                  this.saveLocalStorage
                  // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
                  break
                }
              }
            }
          }
          if (c) {
            var check1 = this.cart.double.c1
            var check2 = this.cart.double.c2
            var check3 = this.cart.double.c3
            var check4 = this.cart.double.c4
            var check5 = this.cart.double.c5
            var a = Object.keys(this.cart.double)
            if( check1 && check2 && check3 && check4 && check5 ) {
              if ( confirm("Do you want to replace with this Strap?")) {
                this.cart.double.c5 = c;
              }
            }
            else {
              for (var i = 0; i <= 4; i ++ ) {
                if ( !this.cart.double[ a[i+7] ] ) {
                  this.cart.double[ a[i+7] ] = c
                  this.saveLocalStorage
                  // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
                  break
                }
              }
            }
          }
        }
        this.saveLocalStorage
        // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
      },
      deleteCartElement: function(type, item) {
        this.cart[type][item] = null;
      },
      randomCartElements: function() {
        this.previewChange
        if ( this.status == 'pro' ) {
          var b = [ this.cart.pro.b1, this.cart.pro.b2 ]
          var bN = 2
          var c = [ this.cart.pro.c1, this.cart.pro.c2 ]
          var cN = 2
          this.preview.now.a = this.cart.pro.a1
          this.preview.now.b = b[Math.floor((Math.random() * bN))]
          this.preview.now.c = c[Math.floor((Math.random() * cN))]
        }
        else if ( this.status == 'double' ) {
          var a = [ this.cart.double.a1, this.cart.double.a2 ]
          var aN = 2
          var b = [ this.cart.double.b1, this.cart.double.b2, this.cart.double.b3, this.cart.double.b4, this.cart.double.b5 ]
          var bN = 5
          var c = [ this.cart.double.c1, this.cart.double.c2, this.cart.double.c3, this.cart.double.c4, this.cart.double.c5 ]
          var cN = 5
          this.preview.now.a = a[Math.floor((Math.random() * aN))]
          this.preview.now.b = b[Math.floor((Math.random() * bN))]
          this.preview.now.c = c[Math.floor((Math.random() * cN))]
        }
        this.whichElementSelected
        this.saveLocalStorage
        // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
      },
    	generateCode: function() {
    		var c = btoa(JSON.stringify(this.$data))
    		$('.generate-code-section .code-section-area').text(c)
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'])
    	},
    	inputCode: function() {
    		if ( $('input.code-section-area').val() !== '' ) {
    			this.$data = JSON.parse(atob($('input.code-section-area').val()))
    			this.saveLocalStorage
    			$('input.code-section-area').val("")
    			$('.input-code-section').removeClass('active')
    		}
    	},

    } // methods end

  }) // vue.js object end

}); // document ready end



