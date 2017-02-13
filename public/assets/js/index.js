$(window).load(function() {
	$(".elements-tab-btn").click(function() {
		var t = $(this).attr('data-tab')
		$(".elements-tab-btn").removeClass('active')
		$(".elements-content-box").removeClass('active')
		$(".elements-tab-btn[data-tab='" + t + "']").addClass('active')
		$(".elements-content-box[data-tab='" + t + "']").addClass('active')
	});
})



$(document).ready(function() {
   // vue
  var ZuWatch = new Vue ({
    el: '#zu-watch',

    data: {
      preview: {
      	prev: {
      		a: null,
      		b: null,
      		c: null,
      	},
      	now: {
      		a: 1,
      		b: 1,
      		c: 1,
      	},
      	next: {
      		a: null,
      		b: null,
      		c: null,
      	}
      },
      save: {
      	saveA: {
      		a: null,
      		b: null,
      		c: null
      	},
      	saveB: {
      		a: null,
      		b: null,
      		c: null
      	},
      	saveC: {
      		a: null,
      		b: null,
      		c: null
      	},
      	saveD: {
      		a: null,
      		b: null,
      		c: null
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
    	}
    },
    methods: {
    	fetchData: function() {
    		var self = this
    	},
    	elementChange: function(a,b,c) {
    		this.previewChange
    		if (a)
    			this.preview.now.a = a
    		if (b)
    			this.preview.now.b = b
    		if (c)
    			this.preview.now.c = c
    	},
    	randomElements: function() {
    		this.previewChange
    		var a = [0,2,3,4,5,6,7,3,2,4,2,9,10,9,8,7]
    		var b = [0,2,3,4,5,6,7,4,2,4,1,8,9,1,9,4,2]
    		var c = [0,2,3,1,2,3,1,3,2,4,1,1,4,3,2,1,3]
  			this.preview.now.a = a[Math.floor((Math.random() * 10) + 5)]
  			this.preview.now.b = b[Math.floor((Math.random() * 10) + 5)]
  			this.preview.now.c = c[Math.floor((Math.random() * 10) + 5)]
    	},
    	saveElements: function() {
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
	    				return
	    			}
	    		}
	    	}
    	},
    	callSave: function(saveN) {
    		this.preview.now.a = this.save[saveN].a
    		this.preview.now.b = this.save[saveN].b
    		this.preview.now.c = this.save[saveN].c
    	},
    	deleteElementsFromSave: function(saveN) {
    		this.save[saveN].a = null
    		this.save[saveN].b = null
    		this.save[saveN].c = null
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
    	},
    	nextElements: function() {
    		this.previewChange
    		this.preview.now.a = this.preview.next.a
    		this.preview.now.b = this.preview.next.b
    		this.preview.now.c = this.preview.next.c
    		this.preview.next.a = null
    		this.preview.next.b = null
    		this.preview.next.c = null
    	}
    }
  })
}); // document ready end

