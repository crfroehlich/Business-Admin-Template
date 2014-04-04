(function($)
{
	if (typeof charts == 'undefined') 
		return;

	charts.chart_simple = 
	{
		// data
		data: 
		{
			sin: [],
			cos: []
		},
		
		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			// grid: 
			// {
			// 	show: true,
			//     aboveData: true,
			//     color: "#3f3f3f",
			//     labelMargin: 5,
			//     axisMargin: 0, 
			//     borderWidth: 0,
			//     borderColor:null,
			//     minBorderMargin: 5,
			//     clickable: true, 
			//     hoverable: true,
			//     autoHighlight: true,
			//     mouseActiveRadius: 20,
			//     backgroundColor : { }
			// },
			grid: {
				color: "#dedede",
			    borderWidth: 1,
			    borderColor: "transparent",
			    clickable: true, 
			    hoverable: true
			},
	        series: {
	        	grow: {active: false},
	            lines: {
            		show: true,
            		fill: false,
            		lineWidth: 4,
            		steps: false
            	},
	            points: {
	            	show:true,
	            	radius: 5,
	            	symbol: "circle",
	            	fill: true,
	            	borderColor: "#fff"
	            }
	        },
	        legend: { position: "se", backgroundColor: null, backgroundOpacity: 0, noColumns: 2 },
	        xaxis: { ticks:5, tickDecimals: 0, tickColor: 'transparent' },
	        colors: [ "#444444", primaryColor ],
	        shadowSize:0,
	        tooltip: true,
			tooltipOpts: {
				content: "%s : %y.3",
				shifts: {
					x: -30,
					y: -50
				},
				defaultTheme: false
			}
		},
		
		placeholder: "#chart_simple",

		// initialize
		init: function()
		{
			if (this.plot == null)
			{
				for (var i = 0; i < 14; i += 0.5) 
				{
			        this.data.sin.push([i, Math.sin(i)]);
			        this.data.cos.push([i, Math.cos(i)]);
			    }
			}
			this.plot = $.plot(
				$(this.placeholder),
	           	[{
	    			label: "Sin", 
	    			data: this.data.sin,
	    			points: {fillColor: "#fff"}
	    		}, 
	    		{	
	    			label: "Cos", 
	    			data: this.data.cos,
	    			points: {fillColor: "#fff"}
	    		}], this.options);
		}
	};

	$(window).on('load', function(){
		setTimeout(function(){
			charts.chart_simple.init();
		}, 100);
	});
	
})(jQuery);