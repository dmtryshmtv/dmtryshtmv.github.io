        // Modified example from http://paperjs.org/tutorials/animation/creating-animations/
        var amount = 30;
        var height = 160;

        var path = new Path({
                strokeWidth: 5,
                strokeCap: 'round',
                strokeJoin: 'round',
                strokeColor: '#FF6347'
        });

        for (var i = 0; i <= amount; i++) {
                path.add(new Point(i / amount, 0.5) * view.size);
        }

        function onFrame(event) {
		if (event.count % 3 == 0) {
			for (var i = 0; i <= amount-1; i++) {
				var segment1 = path.segments[i];
				var segment2 = path.segments[i+1];
				segment1.point.y = segment2.point.y;	
		        }	
			var segment3 = path.segments[amount];
			if (segment3.point.y >= 160 || segment3.point.y <= 0) {
				segment3.point.y = 80; 
			}
			else {
				segment3.point.y = segment3.point.y + (height / 80) * Math.sign(1 - 2*Math.random());
			}
        	        path.smooth();
      		}
	}
