#whale.js

Whale.js is a javascript cache framework.

Some storage strategy like [LFU], [LRU], [Random Cache], [Two queues], [FIFO] are available.

If there have a huge javascript data to be resolved and need a javascript cache.

You can try it.

It provide several methods to help you.


### Example
		//create a strategy of LFU(Least Frequently Used) cache 
		var c1 = whale.LFU({size:10});
		c1.set('a','example a');
		c1.get('a');// example a

### More
		var c1 = whale.LFU({size:10}); //Least Frequently Used cache
		var c2 = whale.LRU({size:10}); //Least Recently Used cache
		var c3 = whale.Random({size:10}); //Random cache 
		var c4 = whale.FIFO({size:10}); //First in first out cahce
		var c5 = whale.TwoQueue({size:10, L2Size: 30});//Two queue cache.  L2Size is treble than L1Size is to be recommended.
### Contact Me
		If any problem or find out any bug.
