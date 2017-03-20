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

  $('.index-action .btn').click(function () {
    $('#index').fadeOut(300);
    $('section').removeClass('hide')
  })
	
	// 暫時先放這
	var clipboard = new Clipboard('.code-section-copy', {
    text: function() {
        return localStorage['fullPage']
    }
	});
	clipboard.on('success', function(e) {
    $('.generate-code-section').removeClass('active')
	});

	clipboard.on('error', function(e) {
    alert('Error')
	});

})



$(document).ready(function() {
  // vue
  ZuWatch = new Vue ({
    el: '#zu-watch',
    data: {
      status: 'basic',
      case: [
        'ca-01',
        'ca-02',
        'ca-03'
      ],
      dial: [
        'zu-01-b',
        'zu-01-w',
        'zu-02-b',
        'zu-02-w',
        'zu-03-b',
        'zu-03-w',
        'zu-04-b',
        'zu-04-w',
        'zu-05-b',
        'zu-05-w',
        'zu-06-b',
        'zu-06-w',
        'zu-07-b',
        'zu-07-w',
        'zu-08-b',
        'zu-08-w',
        'zu-09-b',
        'zu-09-w',
        'zu-10-b',
        'zu-10-w',
        'zu-11-b',
        'zu-11-w'
      ],
      strap: [
        'lc-01',
        'lc-02',
        'lc-03',
        'lc-04',
        'lc-05',
        'lf-01',
        'lf-02',
        'lf-03',
        'lf-04',
        'me-01',
        'me-02',
        'me-03',
        'nl-01',
        'nl-02',
        'nl-03',
        'ny-01',
        'ny-02',
        'ny-03'
      ],
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
      }
    },

    ready: function() {
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
      }
    },

    methods: {
    	fetchData: function() {
  			this.$data = JSON.parse(atob(localStorage['fullPage']))
    	},
      chooseStatus: function(type) {
        this.status = type
      },
    	elementChange: function(a, b, c) {
    		this.previewChange
    		if (a)
    			this.preview.now.a = a
    		if (b)
    			this.preview.now.b = b
    		if (c)
    			this.preview.now.c = c
        this.whichElementSelected
    		localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
      elementAddCart: function(a, b, c) {
        if ( this.status == 'basic' ) {
          if (a) {
            this.cart.basic.a1 = a
          }
          if (b) {
            this.cart.basic.b1 = b
          }
          if (c) {
            this.cart.basic.c1 = c
          }
        }
        else if ( this.status == 'pro' ) {
          if (a) {
            this.cart.pro.a1 = a
          }
          if (b) {
            if ( this.cart.pro.b1 == null ) {
              this.cart.pro.b1 = b
            }
            else if ( this.cart.pro.b2 == null ) {
              this.cart.pro.b2 = b
            }
            else {
              this.cart.pro.b2 = b
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
              this.cart.pro.c2 = c
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
              this.cart.double.a2 = a
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
              this.cart.double.b5 = b
            }
            else {
              for (var i = 0; i <= 4; i ++ ) {
                if ( !this.cart.double[ a[i+2] ] ) {
                  this.cart.double[ a[i+2] ] = b
                  localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
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
              this.cart.double.c5 = c
            }
            else {
              for (var i = 0; i <= 4; i ++ ) {
                if ( !this.cart.double[ a[i+7] ] ) {
                  this.cart.double[ a[i+7] ] = c
                  localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
                  // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
                  break
                }
              }
            }
          }
        }
        localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
        // window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
      },
      deleteCartElement: function(type, item) {
        this.cart[type][item] = null;
      },
    	randomElements: function() {
    		this.previewChange
    		var a = this.case
        var aN = this.case.length
    		var b = this.dial
        var bN = this.dial.length
    		var c = this.strap
        var cN = this.strap.length
  			this.preview.now.a = a[Math.floor((Math.random() * aN))]
  			this.preview.now.b = b[Math.floor((Math.random() * bN))]
  			this.preview.now.c = c[Math.floor((Math.random() * cN))]
        this.whichElementSelected
  			localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
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
	    				return
	    			}
	    		}
	    	}
    	},
    	callSave: function(saveN) {
    		this.preview.now.a = this.save[saveN].a
    		this.preview.now.b = this.save[saveN].b
    		this.preview.now.c = this.save[saveN].c
        this.whichElementSelected
    		localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
    	},
    	deleteElementsFromSave: function(saveN) {
    		this.save[saveN].a = null
    		this.save[saveN].b = null
    		this.save[saveN].c = null
    		localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
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
    		localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
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
    		localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
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
    			localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
    			$('input.code-section-area').val("")
    			$('.input-code-section').removeClass('active')
    		}
    	}
    }
  })
}); // document ready end

