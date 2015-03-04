# whale
		Whale is a javascript cache framework(Only 1.5kb).
		Some storage strategy like [LFU], [LRU], [Random Cache], [Two queues], [FIFO] are available.

If there have a huge javascript data to be resolved and need a javascript cache.
You can try the whale framework.
It provide several method to help you.

### Example
		//create a strategy of Least Frequently Used cache 
		(LFU: Methods for a treatment of cached objects are described. In one embodiment, management of a region of a cache is configured with an eviction policy plug-in. The eviction policy plug-in includes an eviction timing component and a sorting component, with the eviction timing component including code to implement an eviction timing method, and the eviction timing method to trigger eviction of an object from the region of cache. The sorting component includes code to implement a sorting method to identify an object that is eligible for eviction from said region of cache. The sorting method includes identifying an object for eviction that is cached in the region of cache and that has been used less frequently than other objects that are cached in the region of cache)
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
		If you meet any problem or find out any bug.
