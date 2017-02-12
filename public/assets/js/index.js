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
      		a: 2,
      		b: 3,
      		c: 3
      	},
      	saveB: {
      		a: 5,
      		b: 4,
      		c: 1
      	},
      	saveC: {
      		a: 2,
      		b: 5,
      		c: 2
      	},
      	saveD: {
      		a: 1,
      		b: 4,
      		c: 3
      	}
      }
    },

    created: function() {
      this.fetchData()
    },

    methods: {
    	fetchData: function() {
    		var self = this
    	}
    }
  })
}); // document ready end

