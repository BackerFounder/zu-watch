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

	$('section').removeClass('hide')
	
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
      status: 'Basic',
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
      ]
    },

    ready: function() {
    	this.fetchData()
    },
    computed: {
			previewChange: function() {
    		this.preview.prev.a = this.preview.now.a
    		this.preview.prev.b = this.preview.now.b
    		this.preview.prev.c = this.preview.now.c
    	}
    },
    methods: {
    	fetchData: function() {
  			// this.$data = JSON.parse(atob(localStorage['fullPage']))
    	},
    	elementChange: function(a,b,c) {
    		this.previewChange
    		if (a)
    			this.preview.now.a = a
    		if (b)
    			this.preview.now.b = b
    		if (c)
    			this.preview.now.c = c
    		localStorage['fullPage'] = btoa(JSON.stringify(this.$data))
    		// window.history.pushState({}, 0, 'http://' + window.location.host + '/?' + localStorage['fullPage'] );
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

