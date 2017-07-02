'use strict';

/**
 * Deep clone object
 * @param {object} object Object for cloning
 * @returns {object} Return deep clone object
 */

function clone( item = null ) {
    /**
	* check null and undefined value
	*/
	if (!item) {
		
		return item;
	}

	const types = [ Number, String, Boolean ];

	let result;
	
    /**
	* normalize primitive types if there is using String or Number constructor
	* as new String('some string') or new Number(25)
	*/
	types.map( type => {

		if (item instanceof type) {

			result = type( item );
		}
	});
	
	/**
	* if result is undefined
	* it may happen if current item was not creating due
	* new String or new Number
	*/
	if (typeof result === 'undefined') {
		/**
		* check if item is array
		*/
		if ( Array.isArray(item) ) {
            
			result = [];
            
			item.map( ( child, index ) => { 
                
				result[index] = clone( child );
			});
			
		} else if (typeof item === 'object') {
            
			/**
			* DOMNode are also objects too
			* check if it DOMNode
			*/
			if ( item.nodeType && typeof item.cloneNode === 'function' ) {
                
				result = item.cloneNode( true );    
				/**
				* if it is a literal
				*/
			} else if ( !item.prototype ) { 
                
				/*if item is instance of date*/
				
				if (item instanceof Date) {
                    
					result = new Date(item);
					
				} else {
                    
					/*if it is an object literal*/
					result = {};
					
					for ( let i in item ) {
						
						/**
						* do not check if it is own property of an object. In this case
						* we can copy the property which was inherited due to __proto__ or
						* Object.setPrototypeOf
						*/
							
						result[i] = clone( item[i] );
					}
				}
				
			} else {

				if (false && item.constructor) {

					result = new item.constructor();
					
				} else {

					result = item;
				}
			}
		} else {

			result = item;
		}
	}

	return result;
}