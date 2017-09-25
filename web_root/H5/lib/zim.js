// ZIM js Interactive Media framework http://zimjs.com by Dan Zen http://danzen.com (c) 2017
// Also see http://zimjs.com/code/distill to minify only the functions in your app
// free to use - donations welcome of course! http://zimjs.com/donate


////////////////  ZIM WRAP  //////////////

// Zim Wrap creates global wrapper functions for less typing

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

/*--
zog(item1, item2, etc.)         ~ log

zog
global function

DESCRIPTION
Short version of console.log()
to log the item(s) to the console.
Use F12 to open your Browser console.

EXAMPLE
zog("hello", circle.x); // logs these values to the console
END EXAMPLE

PARAMETERS
item1, item2 (optional), etc. - items (expressions) to log to the console

RETURNS items it is logging separated by a space if more than one
--*///+0
// reported a bug in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1280818
// that after FF 46 binding the console did not show file and line number
// this is fixed in FF 50
var zog = console.log.bind(console);
//-0

/*--
zid(string)                     ~ id

zid
global function

DESCRIPTION
Short version of document.getElementById(string)
to access an HTML tag by its id.

EXAMPLE
zid("logo").addEventListener("click", function(){});
END EXAMPLE

PARAMETERS
string - the id of the tag you are wanting to access

RETURNS HTML tag with id of string or null if not found
--*///+1
function zid(s) {
	z_d("1");
	return document.getElementById(s);
} //-1

/*--
zss(string)                     ~ css

zss
global function

DESCRIPTION
Short version of document.getElementById(string).style
to access the style property of an HTML tag by the tag id.

EXAMPLE
zss("logo").margin = "10px";
END EXAMPLE

PARAMETERS
string - the id of the tag whose style you are wanting to access

RETURNS style property of HTML tag with id of string or undefined if not found
--*///+2
function zss(s) {
	z_d("2");
	if (document.getElementById(s)) {return document.getElementById(s).style;}
	else if (zon) zog("zim wrap - zss(): id not found");
} //-2

/*--
zgo(url, target, modal)         ~ go

zgo
global function

DESCRIPTION
Short version of either window.location.href or window.open
to open a link in the same window or a specified window.

EXAMPLE
zid("logo").addEventListener("click", function(){zgo("http://zimjs.com");});

// with a ZIM object:
var button = new zim.Button();
button.center(stage);
button.on("click", function() {zgo("http://zimjs.com");});
END EXAMPLE

PARAMETERS
url - the link to use (Absolute, Relative or Virtual)
target - (default null) the string name of a window (tab) _blank for new window each time
modal - (default false) set to true to force user to close window

RETURNS null if opening in same window or reference to the window otherwise
--*///+3
function zgo(u,t,w,h,f,m) {
	z_d("3");
	if ((zot(t) && t != "") || t == "_self") {
		window.location.href = u;
	} else {
		var added = "";
		if (w) added += "width=" + w + ",";
		if (h) added += "height=" + h + ",";
		if (f) added += "fullscreen=yes,";
		if (m) added += "modal=yes,alwaysRaised=yes";
		return window.open(u,t,added);
	}
} //-3

/*--
zum(string)                     ~ num

zum
global function

DESCRIPTION
Takes the units off a string number.
Converts "10px" string from styles to number 10, for instance.
If there is no value then this will return 0.

EXAMPLE
// in HTML
<div id="logo" style="position:relative; left:10px">LOGO</div>

// in JavaScript
var left = zum(zss("logo").left); // converts 10px to the Number 10
left += 20; // adds 20 to 10
zss("logo").left = left + "px"; // assigns 30px to left style
END EXAMPLE

PARAMETERS
string - the string representation of a number eg. "10px"

RETURNS a Number
--*///+4
function zum(s) {
	z_d("4");
	if (zot(s)) return;
	return Number(String(s).replace(/[^\d\.\-]/g, ''));
} //-4

/*--
zot(value)                      ~ not

zot
global function

DESCRIPTION
Test to see if value has no value (value must exist as var or parameter)
or if value has been set to null.
Good for setting function defaults.
Really just asking if the value == null.
Often we forget exactly how to do this - it is tricky:
value === null, value == undefined, value == 0, !value DO NOT WORK.

EXAMPLE
if (zot(width)) width = 100;
// equivalent to
if (width == null) width = 100;
END EXAMPLE

PARAMETERS
value - a variable or parameter you want to see if there is no value assigned

RETURNS Boolean true if value does not exist
--*///+4.5
function zot(v) {
	return v==null; // both null and undefined match but not false or 0
}//-4.5

/*--
zop(e)                          ~ stop

zop
global function

DESCRIPTION
Stop event propagation to subsequently added existing listeners.
Must pass it e || window.event from your event function.
NOTE: this is not canceling the default action -
to cancel default action use e.preventDefault();

EXAMPLE
zid("button").addEventListener("click", function(e) {
	// do something
	zop(e||window.event);
});
END EXAMPLE

PARAMETERS
e - the event object from your event function
 	collect the event object as e and then pass in e || window.event

RETURNS null
--*///+5
function zop(e) {
	z_d("5");
	if (zot(e)) return;
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;
} //-5

/*--
zil()                           ~ still

zil
global function

DESCRIPTION
Stop keys from moving content - arrows, spacebar, pgup, pgdown, home, end.
Stop scroll wheel from moving content - scrolling the canvas for instance.
ZIM Frame does this in the full, fit and outside scale modes.
If not using Frame, then you can do this once at the start of your code.
Returns an array of references to three listeners: [keydown, mousewheel and DOMMouseScroll].
Use these to removeEventListeners.
The arrows, etc, still work but just not their default window behaviour.

EXAMPLE
// at the top of your code
var listenersArray = zil();
// key and mousewheel arrows, spacebar, etc.
// will have their default actions stopped until you remove the listeners:
// window.removeEventListener("keydown", listenersArray[0]); // etc.
END EXAMPLE

RETURNS an Array
--*///+6
function zil() {
	z_d("6");
	var a = function(e) {if (!e) e = event; if (e.keyCode && (e.keyCode >= 32 && e.keyCode <= 40)) e.preventDefault();}
	var b = function(e) {if (!e) e = event; e.preventDefault();}
	var c = b;
	window.addEventListener("keydown", a);
	window.addEventListener("mousewheel", b);
	window.addEventListener("DOMMouseScroll", c);
	return [a, b, c];
} //-6

/*--
zet(selector)                   ~ set

zet
global function

DESCRIPTION
Uses document.querySelectorAll() to get a list of tags.
Returns a ZIM Zet object which can be used to add events or styles to the set.

EXAMPLE
zet(".class").on("click", function(){}); // would add function event to all tags with the class
zet("p").css("color", "goldenrod"); // would make the text of all paragraphs goldenrod
zet("#test").css({color:"red", "backgound-color":"blue", paddingLeft:"20px"});

// set a custom open property on all section bars to false
zet("section .bar").prop("open", false);
// set the custom open property on all section bars to true and set the innerHTML to CLOSE
zet("section .bar").prop({open: true, innerHTML: "CLOSE"});
END EXAMPLE

PARAMETERS
selector -  a CSS query selector such as a class, id, tag, or multiple selectors separated by commands
	can also be complex selectors suchs as ".class img"

METHODS (on the returned Zet object)
zet(selector).on(type, function) - a shortcut for addEventListener() and will be added to all tags matching the selector
zet(selector).off(type, function) - a shortcut for removeEventListener() and will be remove from all tags matching the selector
zet(selector).css(property, value) - gets and sets styles
	- gets the first programmatic property if a single string property is passed
	- sets the property to the value on each of the Zet's tags from the selector passed to zet()
	- if an object of properties and values is passed as the single parameter then sets all these properties
	- NOTE: style names do not need quotes unless the dash is used - so camelCase does not require quotes
	- NOTE: remember that commas are used for objects - not the semi-colon as in CSS
zet(selector).prop(property, value) - gets or sets a property on a set of tags
	- if an object of properties and values is provided as a single parameter, then sets all these on the set
	- else if no value is set then returns an array of the set tags values for the property
	- else if value is a single value then sets the property of the tags in the set to the value

PROPERTIES  (on the returned Zet object)
tags - an HTML tag list

RETURNS Zet object with on(), off(), css() methods and tags property (HTML tag list)
--*///+6.1
function zet(selector) {
	z_d("6.1");
	function Zet() {
		var that = this;
		this.on = function(type, call) {
			if (zot(selector) || zot(type) || zot(call)) return;
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				tags[i].addEventListener(type, call);
			}
		}
		this.off = function(type, call) {
			if (zot(selector) || zot(type) || zot(call)) return;
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				tags[i].removeEventListener(type, call);
			}
		}
		Object.defineProperty(that, 'tags', {
			get: function() {
				if (zot(selector)) return [];
				if (typeof selector == 'string' || selector instanceof String) {
					return document.querySelectorAll(selector);
				} else { // selector is already an object - assume a tag
					if (typeof (selector).innerHTML == "string") return [selector];
					return [];
				}
			},
			set: function(t) {
			}
		});
		this.css = function(property, value) {
			// if property is object then assign all props in object
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
					for (var p in property) {
						tags[i].style[p] = property[p];
					}
				} else if (arguments.length == 1) {
					return that.tags[0].style[property];
				} else {
			    	tags[i].style[property] = value;
				}
			}
		}
		this.prop = function(property, value) {
			if (zot(property)) return;
			var tags = that.tags;
			var a = [];
			for (var i=0; i<tags.length; i++) {
				if (zot(value)) {
					if (property.constructor === {}.constructor) {
						for (var p in property) {
							tags[i][p] = property[p];
						}
					} else {
						a.push(tags[i][property]);
					}
				} else {
			    	tags[i][property] = value;
				}
			}
			if (zot(value)) return a;
		}
	}
	return new Zet();
} //-6.1

/*--
zob(func, args, sig, scope)     ~ object

zob
global function

DESCRIPTION
A system to build functions or classes that allow traditional parameters
or a configuration object passed in as a single parameter.
The configuration object has property names that match the function arguments.

To use zob on your own functions, pass in a function and the function's arguments
and insert zob into first line of your function as shown below.
Replace yourFunction with a reference to your function but keep arguments as is.

EXAMPLE
function test(a,b,c){
	var duo; if (duo = zob(yourFunction, arguments)) return duo;
};
test(1,null,3); // traditional parameters in order
test({a:1,c:3}); // configuration object with zob
END EXAMPLE

NOTE: if you are minifying the file then you need to do an extra step
add a string version of the signature of your function above the duo call
then pass the signature in as a parameter to zob()

EXAMPLE
var sig = "a,b,c";
var duo; if (duo = zob(yourFunction, arguments, sig)) return duo;
END EXAMPLE

NOTE: if you are running the function as a constructor with the new keyword
then you need to pass in this (keyword) as the last parameter (sig can be null)
this allows zob() to test to see if we need to rerun the function as a constructor

EXAMPLE
var duo; if (duo = zob(yourFunction, arguments, sig, this)) return duo;
END EXAMPLE

many of the ZIM functions and classes use this "DUO" technique
the documentation for parameters will tell you if they support DUO
works also with JS6 default parameter values

PARAMETERS
func - reference to the function you want to use params or a config object with
args - reference to the arguments property of the function (literally, use "arguments" with no quotes)
sig - (default null) a string listing of the parameters just how they are in the () not including the ()
	required if you are minifying the file as minifying changes the signature
scope - (default null) reference to this (litterally, use "this" without the quotes)
	required if the function is being run with the new keyword

RETURNS um... a Boolean
--*///+7
function isDUO(a) {return a.length == 1 && a[0].constructor === {}.constructor;}
function zob(func, args, sig, scope) {
	if (isDUO(args)) {
		z_d("7");
		var zp = args[0];
		var za = (zot(sig))?func.toString().split(/\n/,1)[0].match(/\((.*)\)/)[1].replace(/\s+/g,"").split(","):sig.replace(/\s+/g,"").split(",");
		var zv = []; var zi; var zt;
		for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}
		for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};
		var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {return zr;} else {return true;}
	}
}//-7

/*--
zik(Array|function|object)      ~ pick

zik
global function

DESCRIPTION
Receives what is called a ZIM VEE value which is a way of providing options.
zik() will then randomly pick from the options and return a value.
The ZIM VEE value can be the following:
1. an Array of values to pick from - eg. ["red", "green", "blue"]
2. a Function that returns a value - eg. function(){return Date.now();}
3. a ZIM RAND object literal - eg. {min:10, max:20, integer:true, negative:true} max is required
4. any combination of the above - eg. ["red", function(){x>100?["green", "blue"]:"yellow"}] zik is recursive
5. a single value such as a Number, String, zim.Rectangle(), etc. this just passes through unchanged
6. an object literal with a property of noZik and a value such as an Array or Function that zik will not process
NOTE: the ZIM RAND object gets passed to zim.rand() directly so read about params there - integer defaults to false for zik()

Think of zik() as a random option filter for a parameter that can be passed and then picked later with zik()
This is different than executing right away although you can use zik() directly for that
Used by zim.interval, zim.move, zim.animate and zim.Emitter
zik() is recursive so it will zik() the answer from an Array or Function

EXAMPLE
var loopCount = [1,2,3];
loopCount = zik(loopCount); // loopCount is 1, 2, or 3
// if just simple like this, could use loopCount = zim.shuffle(loopCount)[0];
// but then would have to check first if loopCount is an array rather than single value

var rotation = {min:10, max:20, integer:false, negative:true};
// an example of a RAND object - this will give values between -20 and -10 or 10 and 20
// rotation now holds an object as to how to pick its value
// this can be passed into a zim.Emitter() for instance
// which will make multiple copies and rotate them based on zik()
// or this can be passed into an animation object
// and then into zim.Emitter() for the animate parameter

var emitter = new zim.Emitter({
	obj:new zim.Rectangle(),
	random:[rotation:rotation] // the emitter will use zik() to pick a rotation each particle
});

function age() {
	// assuming user.age is some input value that exists
	if (user.age >= 18) return ["a", "b", ["c","d"]];
	else return ["e", "f"];
}
// below will be a, b, c or d if user is 18+ with a and b having more of a chance
// or e or f if not over 18
var show = zik(age);

// here we pass an array through without processing the array with zik:
zik({noZik:[1,2,3,4,5]}); // result is [1,2,3,4,5]
END EXAMPLE

PARAMETERS
value - an Array to randomly pick from or a Function yielding a return value
 	or an Object literal to pick a random number as follows:
	{min:0, max:20, integer:false, negative:false} - this RAND object is passes through to zim.rand()
	See zim.rand() for defaults and parameter descriptions
	NOTE: one change in defaults: the RAND object integer parameter defaults to false where zim.rand() defaults to true
	if you just want an array or function to pass through unprocessed, use {noZik:value} where the value is the array or function

RETURNS a random element from the Array or a Function result if a function is passed in
or a Number from Object instructions or the value that was given
and the value from an Array or Function is passed through zik() again, etc. until a single value is returned
--*///+7.5
function zik(v) {
	z_d("7.5");
	if (zot(v)) return;
	if ((v.constructor === {}.constructor) || Array.isArray(v) || typeof v == "function") {
		if (Array.isArray(v)) {
			var val = v[Math.floor(Math.random()*(v.length))];
			return zik(val); // recursive
		} else if (v.constructor === {}.constructor) {
			if (!zot(v.noZik)) return v.noZik; // a passthrough for arrays and functions
			if (zot(v.max)) return v;
			if (zot(v.integer)) v.integer = false;
			var val = zim.rand(v.min, v.max, v.integer, v.negative);
			return val;
		} else if (typeof v == "function") {
			return zik((v)()); // recursive
		}
	}
	return v;
}//-7.5

// the above functions are global for quick usage
// start the zim module pattern - from here on, everything is stored on the zim namespace

var zim = function(zim) {


////////////////  ZIM CODE  //////////////

// Zim Code adds some general code functionality along with Browser and DOM code
// some of these are common Web solutions over the years (sorry for lack of credit)

/*--
zim.shuffle = function(array)

shuffle
zim function

DESCRIPTION
Randomly shuffles elements of an array.
Actually changes the original array (and also returns it).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var array = ["happy", "sad", "spooked"];
var randomFromArray = zim.shuffle(array)[0];
// this will be randomized each time it is run
END EXAMPLE

EXAMPLE
var array = zim.shuffle(["happy", "sad", "spooked"]);
for (var i=0; i<array.length) zog(array[i]);
// this will get random and unique elements of the array
END EXAMPLE

PARAMETERS
array - the Array to shuffle

RETURNS the modified Array
--*///+8
	zim.shuffle = function(array) {
		z_d("8");
		if (zot(array)) return;
		var i = array.length, j, temp;
		if (i == 0) return array;
		while(--i) {
			j = Math.floor(Math.random()*(i+1));
			temp=array[i];
			array[i]=array[j];
			array[j]=temp;
		}
		return array;
	}//-8

/*--
zim.rand = function(a, b, integer, negative)

rand
zim function

DESCRIPTION
Returns a random integer between and including a and b if integer is true.
Returns a random number (with decimals) including a and up to b but not b if integer is false.
b is optional and if left out will default to 0 (includes 0).
integer is a boolean and defaults to true.
If a and b are 0 then just returns Math.random().

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var speed = zim.rand(10,20); // 10, 11, 12... 18, 19 or 20

var colors = ["blue", "yellow", "green"];
var color = colors[zim.rand(colors.length-1)]; // note the length-1

// the equivalent of:
var color = colors[Math.floor(Math.random()*colors.length)];

// OR a technique I often use without using zim.rand():
// but zim.rand() is probably better
var color = zim.shuffle(colors)[0];

// here we get a speed that is either from 5 to 10 or -5 to -10
var speed = zim.rand(5,10,null,true);
END EXAMPLE

PARAMETERS
a - the first Number for the range
	if a and b are not provided, zim.rand() acts like Math.random()
	if parameter b is not provided, rand will use range 0 to and including a
b - (default 0) second Number for the range
	it does not matter if a>b or a<b
integer - (default true) set to false to include decimals in results
	if false, range will include decimals up to but not including the highest number
	if a or b have decimals this is set to false
negative - (default false) includes the negative range as well as the positive

RETURNS a Number
--*///+9
	zim.rand = function(a, b, integer, negative) {
		z_d("9");
		if (zot(a) && zot(b)) return Math.random();
		if (zot(a) || isNaN(a)) a = 0;
		if (zot(b) || isNaN(b)) b = 0;
		if (a%1!=0 || b%1!=0) integer = false;
		if (zot(integer)) integer = true;
		if (negative) if (Math.random()>.5) {a*=-1; b*=-1;};
		if (integer) if (a>b) {a++;} else if (b>a) {b++;}
		var r;
		if (a == 0 && b == 0) {
			return 0;
		} else if (b == 0) {
			r = Math.random()*a;
		} else {
			r = Math.min(a,b) + Math.random()*(Math.max(a,b)-Math.min(a,b));
		}
		if (integer) {
			return Math.floor(r);
		} else {
			return r;
		}
	}//-9

/*--
zim.loop = function(obj, call, reverse, step, start, end)

loop
zim function

DESCRIPTION
1. If you pass in a Number for obj then loop() does function call that many times
and passes function call the currentIndex, totalLoops, startIndex, endIndex, obj.
By default, the index starts at 0 and counts up to one less than the number.
So this is like: for (var i=0; i<obj; i++) {}

2. If you pass in an Array then loop() loops through the array
and passes the function call the element in the array, currentIndex, totalLoops, startIndex, endIndex and the array.
So this is like: for (var i=0; i<obj; i++) {element = array[i]}

3. If you pass in an Object literal then loop() loops through the object
and passes the function call the property name, value, currentIndex, totalLoops, startIndex, endIndex, obj
So this is like: for (var i in obj) {property = i; value = obj[i];}

NOTE: If you pass in true for reverse, the loop is run backwards counting to 0 (by default)
NOTE: use return to act like a continue in a loop and go to the next loop
NOTE: return a value to return out of the loop completely like a break (and return a result if desired)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var container = new zim.Container();
zim.loop(1000, function(i) { // gets passed an index i, totalLoops 1000, startIndex 0, endIndex 999, obj 1000
	// make 1000 rectangles
	container.addChild(new zim.Rectangle());
});
stage.addChild(container);

// to continue or break from loop have the function return the string "continue" or "break"
zim.loop(10, function(i) {
	if (i%2==0) return; // skip even
	if (i>6) return "break"; // quit loop when > 6
	zog(i);
});

var colors = [frame.green, frame.yellow, frame.pink];
zim.loop(colors, function(color, index, start, end, array) { // do not have to collect all these
	zog(color); // each color
});

var person = {name:"Dan Zen", occupation:"Inventor", location:"Dundas"}
var result = zim.loop(person, function(prop, val, index, total, start, end, object) { // do not have to collect all these
	zog(prop, val); // each key value pair
	if (val == "criminal") return "criminal"; // this would return out of the loop to the containing function
});
if (result == "criminal") alert("oh no!");
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - a Number of times to loop or an Array or Object to loop through
call - the function to call
	the function will receive (as its final parameters) the index, total, start, end, obj
		where the index is the current index, total is how many times the loop will run
		start is the start index, end is the end index and obj is the object passed to the loop
	the starting parameters vary depending on the type of obj:
	if the obj is a number then the first parameter is the index (no extra starting parameters given)
	if the obj is an array then the first parameter is the element at the current index
	if the obj is an object literal then the first and second parameters are the property name and property value at the current index
reverse - (default false) set to true to run the loop backwards to 0
step - (default 1) each step will increase by this amount (positive whole number - use reverse to go backwards)
start - (default 0 or length-1 for reverse) index to start
end - (default length-1 or 0 for reverse) index to end

RETURNS any value returned from the loop - or undefined if no value is returned from a loop
--*///+9.5
	zim.loop = function(obj, call, reverse, step, start, end) {

		var sig = "obj, call, reverse, step, start, end";
		var duo; if (duo = zob(zim.loop, arguments, sig)) return duo;
		z_d("9.5");
		if (zot(obj) || zot(call)) return undefined;
		if (zot(reverse)) reverse = false;
		if (zot(step) || step <= 0) step = 1;

		var type = typeof obj=="number"?"number":(obj.constructor === Array?"array":(obj.constructor === {}.constructor?"object":"invalid"));

		if (type == "invalid") {
			return undefined;
		}
		if (type == "number" || type == "array") {
			var length = type=="number"?obj:obj.length;
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			}
		} else if (type == "object") {
			var length = 0;
			var props = [];
			for (var i in obj) {
				length++;
				props.push(i);
			}
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			}
		}
		function getTotal(max) {
			if (zot(start)) start = reverse?max:0;
			if (zot(end)) end = reverse?0:max;
			if ((reverse && end > start) || (!reverse && start > end)) return 0;
			if ((start < 0 && end) <0 || (start > max && end > max)) return 0;
			start = Math.max(0, Math.min(start, max));
			end = Math.max(0, Math.min(end, max));
			return Math.floor((reverse?(start-end):(end-start)) / step) + 1;
		}
	}//-9.5

/*--
zim.timeout = function(time, call)

timeout
zim function

DESCRIPTION
Calls a function after the time delay - like window.setTimeout()
Uses window.requestAnimationFrame() that tends to rest when the window is not showing

NOTE: setTimeout has the time parameter last, zim.timeout has it first
so that it is consistent with zim.loop() and the CreateJS on() method

NOTE: to clear a zim.timeout you use returnID.clear() - different than window.clearTimeout(returnID)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
zim.timeout(1000, function(){
	circle.x += 100;
	stage.upate();
});
// moves the circle 100 pixels after one second

// GAME to press button within one second:
var timeout = zim.timeout(1000, function() {
	zog("you lose!");
	button.enabled = false;
});
var button = new zim.Button().center(stage);
button.on("click", function() {
	zog("you win!");
	timeout.clear();
});
END EXAMPLE

PARAMETERS
time - |ZIM VEE| milliseconds to wait until function is called
	or pass in a ZIM VEE value and zik() will pick a time
	ZIM VEE value is an Array of choices or a Function or an Object literal with min, max, integer properties (RAND object)
call - function to call when the time passes - will receive the id object as a single parameter

RETURNS a ZIM timeoutObject to pause and clear the timeout with the following methods and properties:

METHODS - of ZIM timeoutObject
pause(state) - (default true) will pause the timeout - set to false to unpause the timeout
clear() - will clear the timeout

PROPERTIES - of ZIM timeoutObject
time - the time in milliseconds that has lapsed
paused - the paused state of the timeout
--*///+9.7
	zim.timeout = function(time, call) {

		z_d("9.7");
		if (zot(call)) return;
		if (typeof call != 'function') return;
		if (zot(time)) time = 1000;
		time = zik(time);
		var obj = {startTime:Date.now(), time:0, paused:false};
		var lastTime = obj.startTime;
		function next() {
			var now = Date.now()
			obj.time += now - lastTime;
			lastTime = now;
			if (obj.time >= time) {
				(call)(obj);
				obj.clear();
				return;
			}
			obj.rid = requestAnimationFrame(next);
		}

		obj.pause = function(state) {
			if (zot(state)) state = true;
			if (state) { // pausing
				cancelAnimationFrame(obj.rid);
			} else { // unpausing
				lastTime = Date.now();
				next();
			}
			obj.paused = state;
		}

		obj.clear = function() {
			if (obj) cancelAnimationFrame(obj.rid);
			for (var i in obj) {
				delete obj[i];
			}
			obj.pause = function() {};
			obj.clear = function() {};
		}
		next(); // thanks StevenWarren for the glitch fix!
		return obj;
	}//-9.7

/*--
zim.interval = function(time, call, total, immediate)

interval
zim function

DESCRIPTION
Calls a function after each time delay - like window.setInterval().
Can pass in an Array of two times to set random time delays each interval.
Can pass in how many times you want to run the function and whether it runs right away.
Uses window.requestAnimationFrame() that tends to rest when the window is not showing.

NOTE: setInterval has the time parameter last, zim.interval has it first
so that it is consistent with zim.loop() and the CreateJS on() method

NOTE: to clear a zim.interval you use intervalObj.clear() - different than window.clearInterval(returnID)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
zim.interval(1000, function(){
	circle.x += 100;
	stage.upate();
});
// every second the circle will move 100 pixels
// if you want smooth movement, use:

zim.Ticker.add(function() {
	circle.x += 100; // no need for stage.update()
});

zim.interval(1000, function(obj) {
	zog("counting " + obj.count); // starts counting at 1
	if (obj.count == 10) obj.clear(); // will now log 1 to 10
});
OR better:
zim.interval(1000, function(obj) {
	zog("counting " + obj.count); // starts counting at 1
}, 10); // now will log 1 - 10 with total parameter set to 10

IMMEDIATE:
zim.interval(1000, function(obj) {
	zog("counting " + obj.count); // starts counting at 0
}, 10, true); // now will log 0 - 9 with immediate parameter set to true

EXTERNAL control:
var interval = zim.interval(1000, function() {
	zog("counting " + interval.count); // starts counting at 1
});
var button = new zim.Button({label:"STOP", toggle:"START"}).center(stage);
button.on("click", function(){interval.pause(button.toggled);});

RANDOM intervals with zik()
zim.interval({min:200, max:800}, dropBombs); // bombs will fall at different rates between 200ms and 800ms
zim.interval([1000, 2000], dropBombs); // bombs will fall at either 1000 or 2000 ms
var count = 1;
function increase() {return ++count*1000}
zim.interval(increase, dropBombs); // bombs will fall at 1000, then again after 2000 more ms and 3000 ms more after that, etc.
END EXAMPLE

PARAMETERS
time - |ZIM VEE| (default 1000) milliseconds for the interval (delay until the function runs - again and again)
	or pass in a ZIM VEE value and zik() will pick a time
	ZIM VEE value is an Array of choices or a Function or an Object literal with min, max, integer properties (RAND object)
call - function to call when the interval passes
	Will be passed a ZIM intervalObject as a single parameter
	This is the same as the return object from zim.animate()
	See the Returns section below for methods and properties of the intervalObject
total - (default null - infinite) the number of times the function is called
	note: the count property counts intervals but the total property is based on function calls.
	The total will be equal to the end count with the immediate parameter set to false (default)
	but the total will be one less than the count if the immediate parameter is true (like an Array index and length)
immediate - (default false) set to true to call the function right away (and then still call every interval)
	This will not increase the count in the intervalObject because count counts intervals not function calls
	Use the provided parameter of the call function to access the intervalObject inside the call function

RETURNS a ZIM intervalObject to pause and clear the interval with the following methods and properties:

METHODS - of ZIM intervalObject
pause(state, immediate) - (default true) will pause the interval - set to false to unpause the interval
	immediate will make the interval function run right away when unpausing (no effect when pausing)
clear() - will clear the interval

PROPERTIES - of ZIM intervalObject
time - |ZIM VEE| get or set the time for the interval (see time parameter)
count - get the number of times the interval has run (if immediate is true, the first count is 0)
total - get or set the number of times the interval will run if the total parameter is set - otherwise -1 for infinite
paused - get the paused state of the interval (see pause() method)
pauseTimeLeft - if paused, get how much time is left once unpaused
--*///+9.8
	zim.interval = function(time, call, total, immediate) {
		z_d("9.8");
		if (zot(call)) return;
		if (typeof call != 'function') return;
		if (zot(time)) time = 1000;
		if (zot(immediate)) immediate = false;
		if (!zot(total) && (isNaN(total) || total<=0)) return;
		if (zot(total)) total = -1;
		var obj = {count:0, total:total, paused:false, time:time, active:true};


		function interval() {
			obj.startTime = Date.now();
			obj.interval = zik(obj.time);
			obj.id = setTimeout(function() {
				if (obj.paused) return;
				if (!obj.active) return;
				obj.rid = requestAnimationFrame(interval);
				obj.count++;
				(call)(obj);
				checkTotal();
			}, obj.interval);
		}
		if (immediate) {
			setTimeout(function() {
				(call)(obj);
				checkTotal();
			}, 10);
		}
		function checkTotal() {
			if (total == -1) return;
			if (obj.count >= (immediate?obj.total-1:obj.total)) obj.clear();
		}
		var pausedTimeout;
		obj.pause = function(state, immediate) {
			if (zot(state)) state = true;
			if (state) { // pausing
				clearTimeout(pausedTimeout);
				clearTimeout(obj.id);
				cancelAnimationFrame(obj.rid);
				obj.pauseTimeLeft = obj.interval - (Date.now()-obj.startTime);
			} else { // unpausing
					pausedTimeout = setTimeout(function() {
						obj.count++;
						(call)(obj);
						interval();
						checkTotal();
					}, immediate?0:obj.pauseTimeLeft);
				obj.pauseTimeLeft = null;
			}
			obj.paused = state;
		}
		obj.clear = function() {
			obj.active = false;
			clearTimeout(pausedTimeout);
			cancelAnimationFrame(obj.rid);
			clearTimeout(obj.id);
			var count = obj.count;
			for (var i in obj) {
				delete obj[i];
			}
			obj.active = false;
			obj.count = count;
			obj.pause = function() {};
			obj.clear = function() {};
		}
		interval();
		return obj;
	}//-9.8

/*--
zim.copy = function(obj)

copy
zim function

DESCRIPTION
Copies arrays and basic objects:
modified http://stackoverflow.com/users/35881/a-levy
If you have var obj = {prop:"val"};
and then try and copy obj to obj2 like so: obj2 = obj;
then obj2 and obj refer to the same object.
This means that after obj.prop = "new"; both obj.prop and obj2.prop would be "new".
zim.copy(obj) returns a new object so both will work independently
and after obj.prop = "new"; obj2.prop would still be "val".

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var obj = {hair:blue, cars:["audi", "honda"]};
var cop = zim.copy(obj);
cop.hair = "green";
zog(obj.hair, obj.cop); // blue, green
obj.cars.push("vw");
zog(obj.cars.length, cop.cars.length); // 3, 2

// copy with clone for cloneable objects
// without the second parameter as true these obj[0] and obj2[0] would be the same
// and when we do the second addTo it would just move the circle to the second position
var obj = [
	new zim.Circle(20,frame.green),
	new zim.Rectangle(30,30,frame.green),
	new zim.Triangle(40,40,40,frame.green)
];
var obj2 = zim.copy(obj, true); // copy and clone
obj[0].addTo(stage).pos(100, 200);
obj2[0].addTo(stage).pos(300, 400);
END EXAMPLE

PARAMETERS
obj - the object to copy
clone - (default false) set to true to clone any cloneable object while copying

RETURNS a new Object
--*///+10
	zim.copy = function(obj, clone) {
		z_d("10");
		if (zot(clone)) clone = false;
		if (obj==null || !(obj instanceof Array || obj.constructor == {}.constructor)) return clone?(obj.clone?obj.clone():obj):obj;
		if (obj instanceof Array) {
			var array = [];
			for (var i=0; i<obj.length; i++) {
				array[i] = zim.copy(obj[i], clone);
			}
			return array;
		}
		if (obj.constructor == {}.constructor) {
			var copy = {};
			for (var attr in obj) {
				var answer = zim.copy(obj[attr], clone);
				if (obj.hasOwnProperty(attr)) copy[attr] = answer;
			}
			return copy;
		}
	}//-10

/*--
zim.arraysEqual = function(a, b, strict)

arraysEqual
zim function

DESCRIPTION
Finds out if arrays are same (including nested arrays).
Works for arrays with strings and numbers (not necessarily other objects).
(Slightly modified Evan Steinkerchnerv & Tomas Zato)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var one = [1,2,"wow",[3,4]];
var two = [1,2,"wow",[3,4]];
zog(zim.arraysEqual(one, two)); // true
one[3][1] = 5;
zog(zim.arraysEqual(one, two)); // false
END EXAMPLE

PARAMETERS
a, b - the arrays to check to see if they are equal
strict - (default true) set to false so order in arrays does not matter

RETURNS a Boolean
--*///+11
	zim.arraysEqual = function(a, b, strict) {
		z_d("11");
		if (zot(a) || zot(b)) return false;
		if (zot(strict)) strict = true; // must be the same order
		if (a.length != b.length) return false;

		for (var i = 0; i < a.length; i++) {
			if (a[i] instanceof Array && b[i] instanceof Array) {
				if (!zim.arraysEqual(a[i], b[i], strict))	return false;
			}
			else if (strict && a[i] != b[i]) {
				return false;
			}
			else if (!strict) {
				return zim.arraysEqual(a.sort(), b.sort(), true);
			}
		}
		return true;
	}//-11

/*--
zim.isEmpty = function(obj)

isEmpty
zim function

DESCRIPTION
returns whether an object literal is empty

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var o = {};
zog( zim.isEmpty(o) ); // true
o.test = 9;
zog( zim.isEmpty(o) ); // false
END EXAMPLE

PARAMETERS
obj - the object literal to test

RETURNS a Boolean
--*///+11.5
	zim.isEmpty = function(obj) {
		z_d("11.5");
		if (zot(obj)) return;
		var count = 0;
		for (var o in obj) {
			count++; break;
		}
		return (count == 0);
	}//-11.5

/*--
zim.merge = function(objects)

merge
zim function

DESCRIPTION
Merges any number of objects {} you pass in as parameters.
Overwrites properties if they have the same name.
Returns a merged object with original objects kept intact.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var one = {food:"chocolate"};
var two = {drink:"milk"};
var tri = zim.merge(one, two);
zog(tri.food, tri.drink); // chocolate, milk
END EXAMPLE

PARAMETERS
objects - a list of objects (any number) to merge together

RETURNS a new Object
--*///+12
	zim.merge = function() {
		z_d("12");
		var obj = {}; var i; var j;
		for (i=0; i<arguments.length; i++) {
			for (j in arguments[i]) {
				if (arguments[i].hasOwnProperty(j)) {
					obj[j] = arguments[i][j];
				}
			}
		}
		return obj;
	}//-12

/*--
zim.decimals = function(num, places, addZeros, includeZero, time)

decimals
zim function

DESCRIPTION
Rounds number to the number of decimal places specified by places.
Negative number places round to tens, hundreds, etc.
If addZeros is true it fills up ends with zeros - if the places
is negative with addZeros then it fills up the start with zeros
and does not round to tens, hundreds, etc.  just adds zeros to start

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var score = 1.234;
score = zim.decimals(score);
zog(score); // 1.2
zog(zim.decimals(1.8345, 2)); // 1.83
zog(zim.decimals(123,-1)); // 120
zog(zim.decimals(2.3,2,true)); // 2.30
zog(zim.decimals(3,-2,true)); // 03
zog(zim.decimals(11,-2,true)); // 11
zog(zim.decimals(11,-3,true)); // 011
zog(zim.decimals(12,-1,true,time)); // 0:12
END EXAMPLE

PARAMETERS
num - the Number to operate on
places - (default 1) how many decimals to include (negative for left of decimal place)
addZeros - (default 0) set to number of places to fill in zeros after decimal (and return String)
addZerosBefore - (default 0) set to number of places to fill in zeros before decimal (and return String)
includeZero - (default true) set to false to always have zero just be 0 without any extra zeros
time - (default false) just a quick swap of : for . to handle minutes and seconds (not hours)

RETURNS a rounded Number or a String if addZeros, addZerosBefore or time is true
--*///+13
	zim.zut = function(e) {
		if (zot(e) || typeof e == "object") return true;
	}
	zim.decimals = function(num, places, addZeros, addZerosBefore, includeZero, time, evt) {
		z_d("13");
		if (zot(num)) return 0;
		if (zot(places)) places = 1;
		if (zot(addZeros)) addZeros = 0;
		if (zot(addZerosBefore)) addZerosBefore = 0;
		if (zot(addZerosBefore)) addZerosBefore = 0;
		if (zot(includeZero)) includeZero = true;
		if (zot(time)) time = false;
		// if (addZeros && places < 0) {
		// 	var place = String(num).indexOf(".");
		// 	var length = String(num).length;
		// 	var left = (place < 0) ? length : place;
		// 	for (var i=0; i<-places-left; i++) {num = "0" + num;}
		// 	return num;
		// }
		var answer = Math.round(num*Math.pow(10, places))/Math.pow(10, places);

		// if (addZeros && places > 0 && answer != 0) {
		// 	var place = String(answer).indexOf(".");
		// 	var length = String(answer).length;
		// 	if (place < 0) {place = length++; answer+=".";}
		// 	for (var i=0; i<places-(length-place-1); i++) {answer += "0";}
		// }
		var sign = zim.sign(answer);
		if (addZeros > 0) {
			var place = String(answer).indexOf(".");
			var length = String(answer).length;
			if (place < 0) {place = length++; answer+=".";}
			for (var i=0; i<addZeros-(length-place-1); i++) {answer += "0";}
		}
		if (addZerosBefore > 0) {
			if (sign == -1) answer = answer.substr(1,answer.length-1);
			var place = String(answer).indexOf(".");
			var length = String(answer).length;
			var left = (place < 0) ? length : place;
			for (var i=0; i<addZerosBefore-left; i++) {answer = "0" + answer;}
			if (sign == -1) answer = "-" + answer;
		}
		if ((addZeros + addZerosBefore > 0) && !includeZero && Number(answer) == 0) answer = 0;
		if (time) answer = String(answer).replace(".", ":");
		return zim.zut(evt) ? answer : null;
	}//-13

/*--
zim.sign = function(num)

sign
zim function

DESCRIPTION
returns -1, 0 or 1 depending on whether the number is less than, equal to or greater than 0

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var speed = 20;
zog(zim.sign(speed)); // 1

var speed = 0;
zog(zim.sign(speed)); // 0

var speed = -20;
zog(zim.sSign(speed)); // -1
END EXAMPLE

PARAMETERS
num - the Number to operate on

RETURNS -1, 0 or 1
--*///+13.1
	zim.sign = function(num) {
		z_d("13.1");
		return num?num<0?-1:1:0;
	}//-13.1


/*--
zim.constrain = function(num, min, max, negative)

constrain
zim function

DESCRIPTION
returns a number constrained to min and max

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var cirle.x = zim.constrain(circle.radius, stageW-circle.radius);
// circle.x will not be smaller than the radius or bigger than stageW-radius

var speed = zim.constrain(minSpeed, maxSpeed, true);
// will confine the speed between minSpeed and maxSpeed if speed is positive
// and confine the speed between -maxSpeed and -minSpeed if the speed is negative
END EXAMPLE

PARAMETERS
num - the number to be constrained
min - (default 0) the minimum value of the return number
max - (default Number.MAX_VALUE) the maximum value of the return number
negative - (default false) allow the negative range of min and max when num is negative

RETURNS num if between min and max otherwise returns min if less or max if greater (inclusive)
RETURNS num between -max and -min if num is negative and negative parameter is set to true
--*///+13.2
	zim.constrain = function(num, min, max, negative) {
		z_d("13.2");
		if (zot(num)) return;
		if (zot(min)) min = 0;
		if (zot(max)) max = Number.MAX_VALUE;
		if (max < min) {max2 = min; max = min; min = max2;} // ES6 Fix to come
		if (zot(negative)) negative = false;
		if (negative && num < 0) {
			return Math.max(-max, Math.min(num, -min));
		} else {
			return Math.max(min, Math.min(num, max));
		}
	}//-13.2

/*--
zim.dist = function(x1, y1, x2, y2)

dist
zim function

DESCRIPTION
Calculates the distance between two points.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var distance = zim.dist(stageW/2, stageH/2, stage.mouseX, stage.mouseY);
// distance of mouse from center of stage
END EXAMPLE

PARAMETERS
x1, y1 - first point x and y
x2, y2 - (default 0, 0) second point x and y

RETURNS a positive Number that is the distance (could be on an angle)
--*///+13.3
	zim.dist = function(x1, y1, x2, y2) {
		z_d("13.3");
		if (zot(x1) || zot(y1)) return;
		if (zot(x2)) x2 = 0;
		if (zot(y2)) y2 = 0;
		return Math.sqrt((Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)));
	}//-13.3

/*--
zim.angle = function(x1, y1, x2, y2)

angle
zim function

DESCRIPTION
Calculates the angle between two points relative to the positive x axis

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var angle = zim.angle(stageW/2, stageH/2, stageW/2+100, stageH/2+100); // 45
// angle from center of stage to 100, 100 to the right and down from the center of the stage

var angle2 = zim.angle(stageW/2, stageH/2, stageW/2-100, stageH/2+100); // 135

var angle3 = zim.angle(stageW/2, stageH/2, stageW/2+100, stageH/2-100); // 315
END EXAMPLE

PARAMETERS
x1, y1 - first point x and y
	unless no second point in which case x1, y1 will be second point and first point will be 0, 0
x2, y2 - second point x and y

RETURNS a positive Number that is the angle between first and second point relative to positive x axis
--*///+13.4
	zim.angle = function(x1, y1, x2, y2) {
		z_d("13.4");
		if (zot(x1) || zot(y1)) return;
		if (zot(x2)) {x2 = x1; x1 = 0};
		if (zot(y2)) {y2 = y1; y1 = 0};
		return (Math.atan2(y2-y1, x2-x1)*180/Math.PI+360)%360;
	}//-13.4

/*--
zim.makeID = function(length, type, letterCase)

makeID
zim function

DESCRIPTION
makes a random letter, number or mixed id of specified length

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var id1 = zim.makeID(); // five random letters and numbers (starts with letter)
var id2 = zim.makeID(null, "string"); // five random uppercase letters
var id3 = zim.makeID(10, "number"); // ten random numbers
var id4 = zim.makeID(5, ["Z", "I", "M", 1, 2, 3, 4, 5, "-"]); // random five characters from array (possibly repeating)
END EXAMPLE

PARAMETERS
length - (default 5) the length of the id
type - (default "mixed") set to "letters" or "numbers" as well
	note: no O, 0, 1, I or L due to identification problems
	pass in an array of characters to make an id from only those characters
letterCase - (default uppercase) - set to "lowercase" or "mixed" as well

RETURNS a String id (even if type is number)
--*///+13.5
	zim.makeID = function(type, length, letterCase) {
		z_d("13.5");
		if (zot(type)) type = "mixed";
		if (zot(length)) length = 5;
		if (zot(letterCase)) letterCase = "uppercase";
		var choices;
		var nums = [2,3,4,5,6,7,8,9];
		var lets = "abcdefghjkmnpqrstuvwxyz".split("");
		if (type.constructor === Array) {
			choices = type;
		} else if (type == "numbers") {
			choices = nums;
		} else if (type == "letters") {
			choices = lets;
		} else {
			choices = nums.concat(lets);
		}
		var id = "";
		var c; // character - note, char is a reserved word for compressor!
		var rand;
		for (var i=0; i<length; i++) {
			c = choices[Math.floor(Math.random()*length)];
			rand = Math.random();
			if (letterCase == "uppercase" || (letterCase == "mixed" && rand > .5)) {
				if (c.toUpperCase) c = c.toUpperCase();
			} else {
				if (c.toLowerCase) c = c.toLowerCase();
			}
			id += String(c);
		}
		return id;
	}//-13.5

/*--
zim.smoothStep = function(min, max, value)

smoothStep
zim function

DESCRIPTION
smoothStep takes an input value and outputs a value between 0 and 1
that represents a transition between the min and max with easing at both ends.
If you want the easing to be more pronounced, then reduce difference between min and max.
If the value falls outside the min or max then it is set to the min or max.
Remember the return value is between 0 and 1 so you can multiply by max-min and add it to min
to get a value at the original scale.
Used to make blobs with zim.Noise(): http://zimjs.com/code/noise/blobs.html

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// here we use smoothStep to make a gradient between black and white
// not an even one right across but a gradient across a transition zone of 40-100

// create an empty Bitmap size 200, 200 and center it on the stage
var bmp = new Bitmap(null, 200, 200).center(stage);

// we need to loop and get a value for each pixel
// normally we loop across the rows and then do each column
// but here we are making a horizontal gradient
// so we will loop across the x and get the desired value
// then when we loop across the y in the inner loop, we just use that same value
for (var x = 0; x < bmp.width; x++) {
	// making gradient in x only so calculate smoothStep here
	// x will be from 0 to the width of 200
	// we pass in a min of 40 and a max of 100
	// the result of smoothStep is between 0 and 1
	// so from 0 to 40 the return of smoothStep will be 0
	// and from 100 to 200 the return of smoothStep will be 1
	// In between, the return value starts off close to 0, then speeds up
	// and then slows down to 1 in a curve that is somewhat like the letter f
	// When we multiply by 255 and apply that result to each color,
	// we get black and then a range of greys and then white
	var value = smoothStep(40, 100, x)*255;

	// now we loop down the column for the x position
	for (var y = 0; y < bmp.height; y++) {
		// imageData is four values per pixel
		// the red, green, blue and alpha
		// in one big long array - each value will be constrained to between 0 and 255
		// this i value will increase by 4 each time
		// then we write the same value for red, green, blue to get a shade of grey
		var i = (x + y * bmp.width) * 4;
		bmp.imageData.data[i] = value; // red (0-255)
		bmp.imageData.data[i + 1] = value; // green (0-255)
		bmp.imageData.data[i + 2] = value; // blue (0-255)
		bmp.imageData.data[i + 3] = 255; // alpha (0-255)
	}
}
bmp.drawImageData(); // draw the imageData to the Bitmap
END EXAMPLE

PARAMETERS
min - the lower edge for smoothStep (often termed edge0) - anything smaller will be set to min
max - the upper edge for smoothStep (often termed edge1) - anything bigger will be set to max
input - the input value with respect to min and max

RETURNS a number between 0 and 1 that represents a transition factor
--*///+13.7
	zim.smoothStep = function(min, max, input) {
		z_d("13.7");
	    var x = zim.constrain((input - min)/(max - min), 0, 1);
	    return x*x*x*(x*(x*6 - 15) + 10); // Perlin
	}//-13.7

/*--
zim.Noise = function(seed)

Noise
zim class

DESCRIPTION
Noise creates OpenSimplex Noise: https://en.wikipedia.org/wiki/OpenSimplex_noise
Converted from https://www.npmjs.com/package/open-simplex-noise
See examples at http://zimjs.com/code/noise/
In general, this is special noise where the pixels relate to one another in a complex way.
This connection, lets us do things like create terrains or blobs, etc. that look organic.
There is 1D, 2D, 3D, and 4D noise where we pass in one value, two values, three values and four values.
We always get back a number between -1 and 1 and this result relates to the results around it.

1D - we can plot 1D by drawing line segments across the stage (x) and setting the y value to the result of simplex1D(x)
This makes a 2D mountain-like terrain across the stage

2D - if we keep the plot from the 1D but use 2D and change the second parameter, we can animate the line.
We just need to adjust the second parameter by a very small amount each time such as .005.
Or we can plot put the return value of simplex2D onto its x,y matching location in a Bitmap
mapping it to a greyscale to make a traditional noise pattern.
We can adjust the "size" of the noise by dividing the x and y values (frequency).
If we use the ZIM smoothStep() function we can smoothen these to make blobs.
We can also use the return value as height for 3D terrain.

3D - if we keep the traditional noise/blob pattern from the 2D but use simplex3D and animate the third parameter,
we can animate the 2D noise in time which looks great when we animate blobs!
This plotting is thousands of computations and will bog the computer if too big.

4D - will allow us to animate 3D values, etc.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// 1D Noise to make a jagged line across the stage
var noise = new Noise();
var shape = new Shape(stageW, stageH).addTo(stage);
shape.graphics.s("black").ss(2).mt(0, stageH/2);
loop(stageW/50, function(i) {
	shape.graphics.lt((i+1)*50, stageH/2 + noise.simplex1D(i)*200);
});
// the above can be animated by using simplex2D and animating the second number by small amounts
END EXAMPLE

EXAMPLE
// 2D noise
// create a Noise object:
var noise = new zim.Noise();

// create an empty Bitmap size 200, 200 into which to draw the noise
var bmp = new Bitmap(null, 200, 200).center(stage);

// we fill the bitmap starting from top left going across in the inner loop,
// then down, then across, etc. until we get to bottom right.
for (var y = 0; y < bmp.height; y++) {
	for (var x = 0; x < bmp.width; x++) {
		// the noise methods return a number from -1 to 1
		// by adding 1 we get a number between 0 and 2 and we divide by 2 to get 0-1
		// and we multiply this by 255 to get a number between 0 and 255
		var value = (noise.simplex2D(x,y)+1)/2 * 255;
		// imageData is one big array with four values per pixel
		// the red, green, blue and alpha
		// each value will constrained to between 0 and 255
		// the i value is how many on the current row plus the columns from the previous rows
		// and we set it to increase by 4 each time giving us a place for each color and alpha
		// We write the same value for red, green, blue to get a shade of grey
		var i = (x + y * bmp.width) * 4;
		bmp.imageData.data[i] = value; // red (0-255)
		bmp.imageData.data[i + 1] = value; // green (0-255)
		bmp.imageData.data[i + 2] = value; // blue (0-255)
		bmp.imageData.data[i + 3] = 255; // alpha (0-255)
	}
}
bmp.drawImageData(); // this draws the imageData to the Bitmap

// Here is the same example to get blobs using smoothStep:

var f = 25; // try changing this number around
for (var y = 0; y < bmp.height; y++) {
	for (var x = 0; x < bmp.width; x++) {
		var value = noise.simplex2D(x/f, y/f)+1)/2; // 0-1
		// smoothStep sets less than .3 to 0 and greater than .35 to 1
		// and transitions between using an easing formula in the shape of an f
		var value = zim.smoothStep(.3, .35, value) * 255;
		var i = (x + y * bmp.width) * 4;
		bmp.imageData.data[i] = value; // red (0-255)
		bmp.imageData.data[i + 1] = value; // green (0-255)
		bmp.imageData.data[i + 2] = value; // blue (0-255)
		bmp.imageData.data[i + 3] = 255; // alpha (0-255)
	}
}
bmp.drawImageData();
END EXAMPLE

PARAMETERS
seed - (default Math.random()*1000000) keeping the same seed can remake a pattern the same

METHODS
simplex1D(x) - returns a noise value between -1 and 1
	In each method, the noise value relates to its neighbor rather than a completely random value
simplex2D(x,y) - returns a noise value between -1 and 1
simplex3D(x,y,z) - returns a noise value between -1 and 1
simplex4D(x,y,z,w) - returns a noise value between -1 and 1

PROPERTIES
seed - read only - the seed that was used for the Noise object
--*///+13.9
	zim.Noise = function(seed) {
		"use strict";
		z_d("13.9");

		if (zot(seed)) seed = Math.random()*1000000;
		var clientSeed = seed;
		this.seed = seed;

		var that = this;

		var con = {}; // holds the constants
		con.NORM_2D = 1.0 / 47.0;
		con.NORM_3D = 1.0 / 103.0;
		con.NORM_4D = 1.0 / 30.0;
		con.SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
		con.SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
		con.SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
		con.STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
		con.STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
		con.STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
		con.base2D = [
			[1, 1, 0, 1, 0, 1, 0, 0, 0],
			[1, 1, 0, 1, 0, 1, 2, 1, 1]
		];
		con.base3D = [
			[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
			[2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1],
			[1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1]
		];
		con.base4D = [
			[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
			[3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1],
			[
				1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1,
				0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1
			],
			[
				3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1,
				0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1
			]
		];
		con.gradients2D = [5, 2, 2, 5, -5, 2, -2, 5, 5, -2, 2, -5, -5, -2, -2, -5];
		con.gradients3D = [
			-11, 4, 4, -4, 11, 4, -4, 4, 11,
			11, 4, 4, 4, 11, 4, 4, 4, 11,
			-11, -4, 4, -4, -11, 4, -4, -4, 11,
			11, -4, 4, 4, -11, 4, 4, -4, 11,
			-11, 4, -4, -4, 11, -4, -4, 4, -11,
			11, 4, -4, 4, 11, -4, 4, 4, -11,
			-11, -4, -4, -4, -11, -4, -4, -4, -11,
			11, -4, -4, 4, -11, -4, 4, -4, -11
		];
		con.gradients4D = [
			3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3,
			-3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3,
			3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3,
			-3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3,
			3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3,
			-3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3,
			3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3,
			-3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3,
			3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3,
			-3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3,
			3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3,
			-3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3,
			3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3,
			-3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3,
			3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3,
			-3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3
		];
		con.lookupPairs2D = [0, 1, 1, 0, 4, 1, 17, 0, 20, 2, 21, 2, 22, 5, 23, 5, 26, 4, 39, 3, 42, 4, 43, 3];
		con.lookupPairs3D = [
			0, 2, 1, 1, 2, 2, 5, 1, 6, 0, 7, 0, 32, 2, 34, 2, 129, 1, 133, 1, 160, 5, 161, 5, 518, 0, 519, 0, 546, 4, 550, 4, 645,
			3, 647, 3, 672, 5, 673, 5, 674, 4, 677, 3, 678, 4, 679, 3, 680, 13, 681, 13, 682, 12, 685, 14, 686, 12, 687, 14, 712,
			20, 714, 18, 809, 21, 813, 23, 840, 20, 841, 21, 1198, 19, 1199, 22, 1226, 18, 1230, 19, 1325, 23, 1327, 22, 1352, 15,
			1353, 17, 1354, 15, 1357, 17, 1358, 16, 1359, 16, 1360, 11, 1361, 10, 1362, 11, 1365, 10, 1366, 9, 1367, 9, 1392, 11,
			1394, 11, 1489, 10, 1493, 10, 1520, 8, 1521, 8, 1878, 9, 1879, 9, 1906, 7, 1910, 7, 2005, 6, 2007, 6, 2032, 8, 2033,
			8, 2034, 7, 2037, 6, 2038, 7, 2039, 6
		];
		con.lookupPairs4D = [
			0, 3, 1, 2, 2, 3, 5, 2, 6, 1, 7, 1, 8, 3, 9, 2, 10, 3, 13, 2, 16, 3, 18, 3, 22, 1, 23, 1, 24, 3, 26, 3, 33, 2, 37, 2,
			38, 1, 39, 1, 41, 2, 45, 2, 54, 1, 55, 1, 56, 0, 57, 0, 58, 0, 59, 0, 60, 0, 61, 0, 62, 0, 63, 0, 256, 3, 258, 3, 264,
			3, 266, 3, 272, 3, 274, 3, 280, 3, 282, 3, 2049, 2, 2053, 2, 2057, 2, 2061, 2, 2081, 2, 2085, 2, 2089, 2, 2093, 2,
			2304, 9, 2305, 9, 2312, 9, 2313, 9, 16390, 1, 16391, 1, 16406, 1, 16407, 1, 16422, 1, 16423, 1, 16438, 1, 16439, 1,
			16642, 8, 16646, 8, 16658, 8, 16662, 8, 18437, 6, 18439, 6, 18469, 6, 18471, 6, 18688, 9, 18689, 9, 18690, 8, 18693,
			6, 18694, 8, 18695, 6, 18696, 9, 18697, 9, 18706, 8, 18710, 8, 18725, 6, 18727, 6, 131128, 0, 131129, 0, 131130, 0,
			131131, 0, 131132, 0, 131133, 0, 131134, 0, 131135, 0, 131352, 7, 131354, 7, 131384, 7, 131386, 7, 133161, 5, 133165,
			5, 133177, 5, 133181, 5, 133376, 9, 133377, 9, 133384, 9, 133385, 9, 133400, 7, 133402, 7, 133417, 5, 133421, 5,
			133432, 7, 133433, 5, 133434, 7, 133437, 5, 147510, 4, 147511, 4, 147518, 4, 147519, 4, 147714, 8, 147718, 8, 147730,
			8, 147734, 8, 147736, 7, 147738, 7, 147766, 4, 147767, 4, 147768, 7, 147770, 7, 147774, 4, 147775, 4, 149509, 6,
			149511, 6, 149541, 6, 149543, 6, 149545, 5, 149549, 5, 149558, 4, 149559, 4, 149561, 5, 149565, 5, 149566, 4, 149567,
			4, 149760, 9, 149761, 9, 149762, 8, 149765, 6, 149766, 8, 149767, 6, 149768, 9, 149769, 9, 149778, 8, 149782, 8,
			149784, 7, 149786, 7, 149797, 6, 149799, 6, 149801, 5, 149805, 5, 149814, 4, 149815, 4, 149816, 7, 149817, 5, 149818,
			7, 149821, 5, 149822, 4, 149823, 4, 149824, 37, 149825, 37, 149826, 36, 149829, 34, 149830, 36, 149831, 34, 149832,
			37, 149833, 37, 149842, 36, 149846, 36, 149848, 35, 149850, 35, 149861, 34, 149863, 34, 149865, 33, 149869, 33,
			149878, 32, 149879, 32, 149880, 35, 149881, 33, 149882, 35, 149885, 33, 149886, 32, 149887, 32, 150080, 49, 150082,
			48, 150088, 49, 150098, 48, 150104, 47, 150106, 47, 151873, 46, 151877, 45, 151881, 46, 151909, 45, 151913, 44,
			151917, 44, 152128, 49, 152129, 46, 152136, 49, 152137, 46, 166214, 43, 166215, 42, 166230, 43, 166247, 42, 166262,
			41, 166263, 41, 166466, 48, 166470, 43, 166482, 48, 166486, 43, 168261, 45, 168263, 42, 168293, 45, 168295, 42,
			168512, 31, 168513, 28, 168514, 31, 168517, 28, 168518, 25, 168519, 25, 280952, 40, 280953, 39, 280954, 40, 280957,
			39, 280958, 38, 280959, 38, 281176, 47, 281178, 47, 281208, 40, 281210, 40, 282985, 44, 282989, 44, 283001, 39,
			283005, 39, 283208, 30, 283209, 27, 283224, 30, 283241, 27, 283256, 22, 283257, 22, 297334, 41, 297335, 41, 297342,
			38, 297343, 38, 297554, 29, 297558, 24, 297562, 29, 297590, 24, 297594, 21, 297598, 21, 299365, 26, 299367, 23,
			299373, 26, 299383, 23, 299389, 20, 299391, 20, 299584, 31, 299585, 28, 299586, 31, 299589, 28, 299590, 25, 299591,
			25, 299592, 30, 299593, 27, 299602, 29, 299606, 24, 299608, 30, 299610, 29, 299621, 26, 299623, 23, 299625, 27,
			299629, 26, 299638, 24, 299639, 23, 299640, 22, 299641, 22, 299642, 21, 299645, 20, 299646, 21, 299647, 20, 299648,
			61, 299649, 60, 299650, 61, 299653, 60, 299654, 59, 299655, 59, 299656, 58, 299657, 57, 299666, 55, 299670, 54,
			299672, 58, 299674, 55, 299685, 52, 299687, 51, 299689, 57, 299693, 52, 299702, 54, 299703, 51, 299704, 56, 299705,
			56, 299706, 53, 299709, 50, 299710, 53, 299711, 50, 299904, 61, 299906, 61, 299912, 58, 299922, 55, 299928, 58,
			299930, 55, 301697, 60, 301701, 60, 301705, 57, 301733, 52, 301737, 57, 301741, 52, 301952, 79, 301953, 79, 301960,
			76, 301961, 76, 316038, 59, 316039, 59, 316054, 54, 316071, 51, 316086, 54, 316087, 51, 316290, 78, 316294, 78,
			316306, 73, 316310, 73, 318085, 77, 318087, 77, 318117, 70, 318119, 70, 318336, 79, 318337, 79, 318338, 78, 318341,
			77, 318342, 78, 318343, 77, 430776, 56, 430777, 56, 430778, 53, 430781, 50, 430782, 53, 430783, 50, 431000, 75,
			431002, 72, 431032, 75, 431034, 72, 432809, 74, 432813, 69, 432825, 74, 432829, 69, 433032, 76, 433033, 76, 433048,
			75, 433065, 74, 433080, 75, 433081, 74, 447158, 71, 447159, 68, 447166, 71, 447167, 68, 447378, 73, 447382, 73,
			447386, 72, 447414, 71, 447418, 72, 447422, 71, 449189, 70, 449191, 70, 449197, 69, 449207, 68, 449213, 69, 449215,
			68, 449408, 67, 449409, 67, 449410, 66, 449413, 64, 449414, 66, 449415, 64, 449416, 67, 449417, 67, 449426, 66,
			449430, 66, 449432, 65, 449434, 65, 449445, 64, 449447, 64, 449449, 63, 449453, 63, 449462, 62, 449463, 62, 449464,
			65, 449465, 63, 449466, 65, 449469, 63, 449470, 62, 449471, 62, 449472, 19, 449473, 19, 449474, 18, 449477, 16,
			449478, 18, 449479, 16, 449480, 19, 449481, 19, 449490, 18, 449494, 18, 449496, 17, 449498, 17, 449509, 16, 449511,
			16, 449513, 15, 449517, 15, 449526, 14, 449527, 14, 449528, 17, 449529, 15, 449530, 17, 449533, 15, 449534, 14,
			449535, 14, 449728, 19, 449729, 19, 449730, 18, 449734, 18, 449736, 19, 449737, 19, 449746, 18, 449750, 18, 449752,
			17, 449754, 17, 449784, 17, 449786, 17, 451520, 19, 451521, 19, 451525, 16, 451527, 16, 451528, 19, 451529, 19,
			451557, 16, 451559, 16, 451561, 15, 451565, 15, 451577, 15, 451581, 15, 451776, 19, 451777, 19, 451784, 19, 451785,
			19, 465858, 18, 465861, 16, 465862, 18, 465863, 16, 465874, 18, 465878, 18, 465893, 16, 465895, 16, 465910, 14,
			465911, 14, 465918, 14, 465919, 14, 466114, 18, 466118, 18, 466130, 18, 466134, 18, 467909, 16, 467911, 16, 467941,
			16, 467943, 16, 468160, 13, 468161, 13, 468162, 13, 468163, 13, 468164, 13, 468165, 13, 468166, 13, 468167, 13,
			580568, 17, 580570, 17, 580585, 15, 580589, 15, 580598, 14, 580599, 14, 580600, 17, 580601, 15, 580602, 17, 580605,
			15, 580606, 14, 580607, 14, 580824, 17, 580826, 17, 580856, 17, 580858, 17, 582633, 15, 582637, 15, 582649, 15,
			582653, 15, 582856, 12, 582857, 12, 582872, 12, 582873, 12, 582888, 12, 582889, 12, 582904, 12, 582905, 12, 596982,
			14, 596983, 14, 596990, 14, 596991, 14, 597202, 11, 597206, 11, 597210, 11, 597214, 11, 597234, 11, 597238, 11,
			597242, 11, 597246, 11, 599013, 10, 599015, 10, 599021, 10, 599023, 10, 599029, 10, 599031, 10, 599037, 10, 599039,
			10, 599232, 13, 599233, 13, 599234, 13, 599235, 13, 599236, 13, 599237, 13, 599238, 13, 599239, 13, 599240, 12,
			599241, 12, 599250, 11, 599254, 11, 599256, 12, 599257, 12, 599258, 11, 599262, 11, 599269, 10, 599271, 10, 599272,
			12, 599273, 12, 599277, 10, 599279, 10, 599282, 11, 599285, 10, 599286, 11, 599287, 10, 599288, 12, 599289, 12,
			599290, 11, 599293, 10, 599294, 11, 599295, 10
		];
		con.p2D = [0, 0, 1, -1, 0, 0, -1, 1, 0, 2, 1, 1, 1, 2, 2, 0, 1, 2, 0, 2, 1, 0, 0, 0];
		con.p3D = [
			0, 0, 1, -1, 0, 0, 1, 0, -1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 0, -1, 0, 1, 0, 0, -1, 1, 0, 2, 1, 1, 0, 1, 1, 1, -1, 0,
			2, 1, 0, 1, 1, 1, -1, 1, 0, 2, 0, 1, 1, 1, -1, 1, 1, 1, 3, 2, 1, 0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 3, 1, 0, 2, 1, 3, 0, 2,
			1, 3, 0, 1, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 0, 1, 0, 2, 0, 2, 0, 1, 1, 0, 0, 1, 2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1,
			-1, 1, 2, 0, 0, 0, 0, 1, -1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, -1, 2, 3, 1, 1, 1, 2, 0, 0, 2, 2, 3, 1, 1, 1, 2, 2, 0, 0,
			2, 3, 1, 1, 1, 2, 0, 2, 0, 2, 1, 1, -1, 1, 2, 0, 0, 2, 2, 1, 1, -1, 1, 2, 2, 0, 0, 2, 1, -1, 1, 1, 2, 0, 0, 2, 2, 1,
			-1, 1, 1, 2, 0, 2, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0
		];
		con.p4D = [
			0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, -1, 0, 1,
			0, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 2, 1, 1, 0, 0, 1, 1, 1, -1,
			0, 1, 1, 1, 0, -1, 0, 2, 1, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 0, 2, 0, 1, 1, 0, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1,
			0, 2, 1, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 2, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 2, 0, 0, 1, 1,
			1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 1, 4, 2, 1, 1, 0, 4, 1, 2, 1, 0, 4, 1, 1, 2, 0, 1, 4, 2, 1, 0, 1, 4, 1, 2, 0, 1, 4, 1,
			1, 0, 2, 1, 4, 2, 0, 1, 1, 4, 1, 0, 2, 1, 4, 1, 0, 1, 2, 1, 4, 0, 2, 1, 1, 4, 0, 1, 2, 1, 4, 0, 1, 1, 2, 1, 2, 1, 1,
			0, 0, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 1, 2, 1, 0, 1, 0, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 1, 2, 0, 1, 1, 0, 3, 0, 2, 1, 0,
			3, 0, 1, 2, 0, 1, 2, 1, 0, 0, 1, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 1, 2, 0, 1, 0, 1, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 1, 2,
			0, 0, 1, 1, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1,
			-1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0,
			0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 2, 0, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 2, 0, 0, 2, 3, 1, 1, 1, 0,
			2, 1, 1, 1, -1, 2, 0, 0, 2, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2,
			0, 0, 2, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 0, 0, 2, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 0, 2, 2, 3, 0,
			1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 0, 0, 2, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0,
			1, -1, 0, 0, 0, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0,
			0, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 0, 0, 0, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, -1,
			0, 1, 1, 1, 0, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1,
			2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 2, 0, 2, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 2, 0, 2, 0, 0, 2,
			1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 1, 1, 0, 1,
			0, 1, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 2, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 2, 0,
			0, 0, 2, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 0, 0, 2, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 0, 2, 3, 1, 1,
			0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2,
			0, 2, 1, 1, 1, -1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1,
			3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, 1, -1, 1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 1, 0, 2,
			0, 0, 2, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, -1, 1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, -1,
			1, 1, 1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, -1, 1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, -1, 1, 1, 1, 3, 3, 2, 1,
			0, 0, 3, 1, 2, 0, 0, 4, 1, 1, 1, 1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 4, 1, 1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0,
			4, 1, 1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 4, 1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 4, 1, 1, 1, 1, 3, 3,
			0, 0, 2, 1, 3, 0, 0, 1, 2, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, 1, -1, 3, 3, 2, 0, 1, 0, 3, 1, 0,
			2, 0, 2, 1, 1, 1, -1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, 1, 1, 1, -1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, -1,
			1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, 1, -1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, 1, 1, -1, 1, 3, 3, 2, 0, 1, 0,
			3, 1, 0, 2, 0, 2, 1, -1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, -1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2,
			1, -1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, -1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, -1, 1, 1, 1, 3, 3,
			0, 0, 2, 1, 3, 0, 0, 1, 2, 2, -1, 1, 1, 1
		];

		// helper classes

		function shuffleSeed(seed) {
			var newSeed = new Uint32Array(1);
			newSeed[0] = seed[0] * 1664525 + 1013904223;
			return newSeed;
		}

		function Contribution2(multiplier, xsb, ysb) {
			this.dx = -xsb - multiplier * con.SQUISH_2D;
			this.dy = -ysb - multiplier * con.SQUISH_2D;
			this.xsb = xsb;
			this.ysb = ysb;
		}

		function Contribution3(multiplier, xsb, ysb, zsb) {
			this.dx = -xsb - multiplier * con.SQUISH_3D;
			this.dy = -ysb - multiplier * con.SQUISH_3D;
			this.dz = -zsb - multiplier * con.SQUISH_3D;
			this.xsb = xsb;
			this.ysb = ysb;
			this.zsb = zsb;
		}

		function Contribution4(multiplier, xsb, ysb, zsb, wsb) {
			this.dx = -xsb - multiplier * con.SQUISH_4D;
			this.dy = -ysb - multiplier * con.SQUISH_4D;
			this.dz = -zsb - multiplier * con.SQUISH_4D;
			this.dw = -wsb - multiplier * con.SQUISH_4D;
			this.xsb = xsb;
			this.ysb = ysb;
			this.zsb = zsb;
			this.wsb = wsb;
		}

		// initialize

		var contributions2D = [];
		for (var i = 0; i < con.p2D.length; i += 4) {
			var baseSet = con.base2D[con.p2D[i]];
			var previous = null;
			var current = null;
			for (var k = 0; k < baseSet.length; k += 3) {
				current = new Contribution2(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
				if (previous === null)
					contributions2D[i / 4] = current;
				else
					previous.next = current;
				previous = current;
			}
			current.next = new Contribution2(con.p2D[i + 1], con.p2D[i + 2], con.p2D[i + 3]);
		}
		this.lookup2D = [];
		for (var i = 0; i < con.lookupPairs2D.length; i += 2) {
			this.lookup2D[con.lookupPairs2D[i]] = contributions2D[con.lookupPairs2D[i + 1]];
		}
		var contributions3D = [];
		for (var i = 0; i < con.p3D.length; i += 9) {
			var baseSet = con.base3D[con.p3D[i]];
			var previous = null;
			var current = null;
			for (var k = 0; k < baseSet.length; k += 4) {
				current = new Contribution3(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3]);
				if (previous === null)
					contributions3D[i / 9] = current;
				else
					previous.next = current;
				previous = current;
			}
			current.next = new Contribution3(con.p3D[i + 1], con.p3D[i + 2], con.p3D[i + 3], con.p3D[i + 4]);
			current.next.next = new Contribution3(con.p3D[i + 5], con.p3D[i + 6], con.p3D[i + 7], con.p3D[i + 8]);
		}
		this.lookup3D = [];
		for (var i = 0; i < con.lookupPairs3D.length; i += 2) {
			this.lookup3D[con.lookupPairs3D[i]] = contributions3D[con.lookupPairs3D[i + 1]];
		}
		var contributions4D = [];
		for (var i = 0; i < con.p4D.length; i += 16) {
			var baseSet = con.base4D[con.p4D[i]];
			var previous = null;
			var current = null;
			for (var k = 0; k < baseSet.length; k += 5) {
				current = new Contribution4(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
				if (previous === null)
					contributions4D[i / 16] = current;
				else
					previous.next = current;
				previous = current;
			}
			current.next = new Contribution4(con.p4D[i + 1], con.p4D[i + 2], con.p4D[i + 3], con.p4D[i + 4], con.p4D[i + 5]);
			current.next.next = new Contribution4(con.p4D[i + 6], con.p4D[i + 7], con.p4D[i + 8], con.p4D[i + 9], con.p4D[i + 10]);
			current.next.next.next = new Contribution4(con.p4D[i + 11], con.p4D[i + 12], con.p4D[i + 13], con.p4D[i + 14], con.p4D[i + 15]);
		}
		this.lookup4D = [];
		for (var i = 0; i < con.lookupPairs4D.length; i += 2) {
			this.lookup4D[con.lookupPairs4D[i]] = contributions4D[con.lookupPairs4D[i + 1]];
		}

		// end initialize

		this.perm = new Uint8Array(256);
		this.perm2D = new Uint8Array(256);
		this.perm3D = new Uint8Array(256);
		this.perm4D = new Uint8Array(256);
		var source = new Uint8Array(256);
		for (var i = 0; i < 256; i++)
			source[i] = i;
		var seed = new Uint32Array(1);
		seed[0] = clientSeed;
		seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
		for (var i = 255; i >= 0; i--) {
			seed = shuffleSeed(seed);
			var r = new Uint32Array(1);
			r[0] = (seed[0] + 31) % (i + 1);
			if (r[0] < 0)
				r[0] += (i + 1);
			this.perm[i] = source[r[0]];
			this.perm2D[i] = this.perm[i] & 0x0E;
			this.perm3D[i] = (this.perm[i] % 24) * 3;
			this.perm4D[i] = this.perm[i] & 0xFC;
			source[r[0]] = source[i];
		}

		this.simplex1D = function(x) {
			return that.simplex2D(x, 1);
		}

		this.simplex2D = function (x, y) {
			var stretchOffset = (x + y) * con.STRETCH_2D;
			var _a = [x + stretchOffset, y + stretchOffset], xs = _a[0], ys = _a[1];
			var _b = [Math.floor(xs), Math.floor(ys)], xsb = _b[0], ysb = _b[1];
			var squishOffset = (xsb + ysb) * con.SQUISH_2D;
			var _c = [x - (xsb + squishOffset), y - (ysb + squishOffset)], dx0 = _c[0], dy0 = _c[1];
			var _d = [xs - xsb, ys - ysb], xins = _d[0], yins = _d[1];
			var inSum = xins + yins;
			var hashVals = new Uint32Array(4);
			hashVals[0] = xins - yins + 1;
			hashVals[1] = inSum;
			hashVals[2] = inSum + yins;
			hashVals[3] = inSum + xins;
			var hash = hashVals[0] | (hashVals[1] << 1) | (hashVals[2] << 2) | (hashVals[3] << 4);
			var c = that.lookup2D[hash];
			var value = 0.0;
			while (typeof c !== 'undefined') {
				var _e = [dx0 + c.dx, dy0 + c.dy], dx = _e[0], dy = _e[1];
				var attn = 2 - dx * dx - dy * dy;
				if (attn > 0) {
					var _f = [xsb + c.xsb, ysb + c.ysb], px = _f[0], py = _f[1];
					var i = that.perm2D[(that.perm[px & 0xFF] + py) & 0xFF];
					var valuePart = con.gradients2D[i] * dx + con.gradients2D[i + 1] * dy;
					attn *= attn;
					value += attn * attn * valuePart;
				}
				c = c.next;
			}
			return value * con.NORM_2D;
		};

		this.simplex3D = function (x, y, z) {
			var stretchOffset = (x + y + z) * con.STRETCH_3D;
			var _a = [x + stretchOffset, y + stretchOffset, z + stretchOffset], xs = _a[0], ys = _a[1], zs = _a[2];
			var _b = [Math.floor(xs), Math.floor(ys), Math.floor(zs)], xsb = _b[0], ysb = _b[1], zsb = _b[2];
			var squishOffset = (xsb + ysb + zsb) * con.SQUISH_3D;
			var _c = [x - (xsb + squishOffset), y - (ysb + squishOffset), z - (zsb + squishOffset)], dx0 = _c[0], dy0 = _c[1], dz0 = _c[2];
			var _d = [xs - xsb, ys - ysb, zs - zsb], xins = _d[0], yins = _d[1], zins = _d[2];
			var inSum = xins + yins + zins;
			var hashVals = new Uint32Array(7);
			hashVals[0] = yins - zins + 1;
			hashVals[1] = xins - yins + 1;
			hashVals[2] = xins - zins + 1;
			hashVals[3] = inSum;
			hashVals[4] = inSum + zins;
			hashVals[5] = inSum + yins;
			hashVals[6] = inSum + xins;
			var hash = hashVals[0] | hashVals[1] << 1 | hashVals[2] << 2 | hashVals[3] << 3 | hashVals[4] << 5 |
				hashVals[5] << 7 | hashVals[6] << 9;
			var c = that.lookup3D[hash];
			var value = 0.0;
			while (typeof c !== 'undefined') {
				var _e = [dx0 + c.dx, dy0 + c.dy, dz0 + c.dz], dx = _e[0], dy = _e[1], dz = _e[2];
				var attn = 2 - dx * dx - dy * dy - dz * dz;
				if (attn > 0) {
					var _f = [xsb + c.xsb, ysb + c.ysb, zsb + c.zsb], px = _f[0], py = _f[1], pz = _f[2];
					var i = that.perm3D[(that.perm[(that.perm[px & 0xFF] + py) & 0xFF] + pz) & 0xFF];
					var valuePart = con.gradients3D[i] * dx + con.gradients3D[i + 1] * dy + con.gradients3D[i + 2] * dz;
					attn *= attn;
					value += attn * attn * valuePart;
				}
				c = c.next;
			}
			return value * con.NORM_3D;
		};

		this.simplex4D = function (x, y, z, w) {
			var stretchOffset = (x + y + z + w) * con.STRETCH_4D;
			var _a = [x + stretchOffset, y + stretchOffset, z + stretchOffset, w + stretchOffset], xs = _a[0], ys = _a[1], zs = _a[2], ws = _a[3];
			var _b = [Math.floor(xs), Math.floor(ys), Math.floor(zs), Math.floor(ws)], xsb = _b[0], ysb = _b[1], zsb = _b[2], wsb = _b[3];
			var squishOffset = (xsb + ysb + zsb + wsb) * con.SQUISH_4D;
			var dx0 = x - (xsb + squishOffset);
			var dy0 = y - (ysb + squishOffset);
			var dz0 = z - (zsb + squishOffset);
			var dw0 = w - (wsb + squishOffset);
			var _c = [xs - xsb, ys - ysb, zs - zsb, ws - wsb], xins = _c[0], yins = _c[1], zins = _c[2], wins = _c[3];
			var inSum = xins + yins + zins + wins;
			var hashVals = new Uint32Array(11);
			hashVals[0] = zins - wins + 1;
			hashVals[1] = yins - zins + 1;
			hashVals[2] = yins - wins + 1;
			hashVals[3] = xins - yins + 1;
			hashVals[4] = xins - zins + 1;
			hashVals[5] = xins - wins + 1;
			hashVals[6] = inSum << 6;
			hashVals[7] = inSum + wins;
			hashVals[8] = inSum + zins;
			hashVals[9] = inSum + yins;
			hashVals[10] = inSum + xins;
			var hash = hashVals[0] | hashVals[1] << 1 | hashVals[2] << 2 | hashVals[3] << 3 | hashVals[4] << 4 | hashVals[5] << 5 |
				hashVals[6] << 6 | hashVals[7] << 8 | hashVals[8] << 11 | hashVals[9] << 14 | hashVals[10] << 17;
			var c = that.lookup4D[hash];
			var value = 0.0;
			while (typeof c !== 'undefined') {
				var _d = [dx0 + c.dx, dy0 + c.dy, dz0 + c.dz, dw0 + c.dw], dx = _d[0], dy = _d[1], dz = _d[2], dw = _d[3];
				var attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
				if (attn > 0) {
					var _e = [xsb + c.xsb, ysb + c.ysb, zsb + c.zsb, wsb + c.wsb], px = _e[0], py = _e[1], pz = _e[2], pw = _e[3];
					var i = that.perm4D[(that.perm[(that.perm[(that.perm[px & 0xFF] + py) & 0xFF] + pz) & 0xFF] + pw) & 0xFF];
					var valuePart = con.gradients4D[i] * dx + con.gradients4D[i + 1] * dy + con.gradients4D[i + 2] * dz + con.gradients4D[i + 3] * dw;
					attn *= attn;
					value += attn * attn * valuePart;
				}
				c = c.next;
			}
			return value * con.NORM_4D;
		};

	}//-13.9

/*--
zim.Damp = function(startValue, damp)

Damp
zim class

DESCRIPTION
Damping emulates things slowing down due to friction.
The movement heads towards the right value and looks organic.
This is similar if not the same as easing out when tweening.
Create your Damp object outside an interval or Ticker
then inside an interval or ticker call the convert method.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var d = new zim.Damp(parameters);
setInterval(function() {
	dampedValue = d.convert(desiredValue);
}, 100);
END EXAMPLE

you would then apply that desired value to a property such as x or y or scale
if you want to do both x and y then you need two Damp objects
and two convert calls (you can do both in one interval or ticker)

EXAMPLE
var circle = new zim.Circle();
circle.center(stage);
var dampX = new zim.Damp(circle.x);
var dampY = new zim.Damp(circle.y);
// start moving once mouse enters stage
// this event will only run once (the last parameter is true)
stage.on("stagemousemove", start, null, true);
function start() {
	zim.Ticker.add(function() {
		circle.x = dampX.convert(stage.mouseX);
		circle.y = dampY.convert(stage.mouseY);
	}, stage);
}
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
startValue - (default 0) start object at this value and then start damping
damp - (default .1) the damp value with 1 being no damping and 0 being no movement

METHODS
convert() - converts a value into a damped value
immediate() - immediately goes to value and returns the Damp object

PROPERTIES
damp - can dynamically change the damping (usually just pass it in as a parameter to start)
lastValue - setting this would go immediately to this value (would not normally use)
--*///+14
	zim.Damp = function(startValue, damp) {
		z_d("14");
		var sig = "startValue, damp";
		var duo; if (duo = zob(zim.Damp, arguments, sig, this)) return duo;
		this.lastValue = (zot(startValue)) ? 0 : startValue;
		this.damp = (zot(damp)) ? .1 : damp;
	}
	zim.Damp.prototype.convert = function(desiredValue) {
		return this.lastValue = this.lastValue + (desiredValue - this.lastValue) * this.damp;
	}
	zim.Damp.prototype.immediate = function(desiredValue) {
		this.lastValue = desiredValue;
		return this;
	}//-14

/*--
zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound)

Proportion
zim class

DESCRIPTION
Proportion converts an input value to an output value on a different scale.
(sometimes called a map() function)
For instance, like a slider controlling the scale of an object or sound volume.
Make a Proportion object and then in an interval, ticker or event,
convert the base value to the target value using the convert method.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
frame.loadAssets("mySound.mp3");
frame.on("complete", function() {
	var sound = frame.asset("mySound.mp3").play();
	var p = new zim.Proportion(0, 10, 0, 1);
	var dial = new zim.Dial(); // default range of 0 to 10
	dial.currentValue = 10;
	dial.on("change", function(){
		sound.volume = p.convert(dial.currentValue);
	}); // end of dial change
}); // end sound loaded
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
baseMin - min for the input scale (say x value)
baseMax - max for the input scale (say x value)
targetMin - (default 0) min for the output scale (say volume)
targetMax - (default 1) max for the output scale (say volume)
factor (default 1) is going the same direction and -1 is going in opposite direction
targetRound (default false) set to true to round the converted number

METHODS
convert(input) - will return the output property (for instance, a volume)

NOTE: the object always starts by assuming baseMin as baseValue
just call the convert method right away if you want it to start at a different baseValue
for instance, if your slider went from 100 to 500 and you want to start at half way
make the object and call p.convert(300); on the next line
--*///+15
	zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, factor, targetRound";
		var duo; if (duo = zob(zim.Proportion, arguments, sig, this)) return duo;
		z_d("15");
		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number
		if (zot(targetMin)) targetMin = 0;
		if (zot(targetMax)) targetMax = 1;
		if (zot(factor)) factor = 1;
		if (zot(targetRound)) targetRound = false;

		// proportion
		var baseAmount;
		var proportion;
		var targetAmount;

		baseAmount = baseMin; // just start at the min otherwise call immediate(baseValue);

		this.convert = function(baseAmount) {
			if (isNaN(baseAmount)) {return;}
			baseAmount = Math.max(baseAmount, baseMin);
			baseAmount = Math.min(baseAmount, baseMax);
			proportion = (baseAmount - baseMin) / (baseMax - baseMin);
			if (factor > 0) {
				targetAmount = targetMin + (targetMax-targetMin) * proportion;
			} else {
				targetAmount = targetMax - (targetMax-targetMin) * proportion;
			}
			if (targetRound) {targetAmount = Math.round(targetAmount);}
			return targetAmount;
		}
	}//-15

/*--
zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound)

ProportionDamp
zim class

DESCRIPTION
ProportionDamp converts an input value to an output value on a different scale with damping.
Works like Proportion Class but with a damping parameter.
Damping needs constant calculating so do not put in mousemove event.
The below example scales the circle based on the mouse height.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage); // center method added in ZIM 4TH
var pd = new zim.ProportionDamp(0, stageH, 0, 5, .2);
zim.Ticker.add(function() {
	circle.scale(pd.convert(stage.mouseH)); // scale method added in ZIM 4TH
}, stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
baseMin - min for the input scale (say x value)
baseMax - max for the input scale (say x value)
targetMin - (default 0) min for the output scale (say volume)
targetMax - (default 1) max for the output scale (say volume)
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
factor (default 1) is going the same direction and -1 is going in opposite direction
targetRound (default false) set to true to round the converted number

METHODS
convert(input) - converts a base value to a target value
immediate(input) - immediately sets the target value (no damping) and returns the ProportionDamp object
dispose() - clears interval

PROPERTIES
damp - can adjust this dynamically (usually just pass it in as a parameter to start)

NOTE: the object always starts by assuming baseMin as baseValue
if you want to start or go to an immediate value without easing then
call the pd.immediate(baseValue) method with your desired baseValue (not targetValue)
--*///+16
	zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound";
		var duo; if (duo = zob(zim.ProportionDamp, arguments, sig, this)) return duo;
		z_d("16");
		// damp - can be changed via damp get/set method property
		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number
		// zot() is found in danzen.js (the z version of not)
		if (zot(targetMin)) targetMin = 0;
		if (zot(targetMax)) targetMax = 1;
		if (zot(damp)) damp = .1;
		if (zot(factor)) factor = 1;
		if (zot(targetRound)) targetRound = false;

		this.damp = damp; // want to expose as a property we can change
		var that = this;

		// proportion
		var baseAmount;
		var proportion;
		var targetDifference;
		var targetAmount;

		// damping
		var differenceAmount;
		var desiredAmount=0;
		var lastAmount = 0;

		baseAmount = baseMin; // just start at the min otherwise call immediate(baseValue);
		lastAmount = targetMin;

		var interval = setInterval(calculate, 20);

		function calculate() {
			if (isNaN(baseAmount)) {return;}

			baseAmount = Math.max(baseAmount, baseMin);
			baseAmount = Math.min(baseAmount, baseMax);

			proportion = (baseAmount - baseMin) / (baseMax - baseMin);
			targetDifference = targetMax - targetMin;

			if (factor > 0) {
				targetAmount = targetMin + targetDifference * proportion;
			} else {
				targetAmount = targetMax - targetDifference * proportion;
			}

			desiredAmount = targetAmount;
			differenceAmount = desiredAmount - lastAmount;
			lastAmount += differenceAmount*that.damp;
		}

		this.immediate = function(n) {
			that.convert(n);
			calculate();
			lastAmount = targetAmount;
			if (targetRound) {lastAmount = Math.round(lastAmount);}
			return that;
		}

		this.convert = function(n) {
			baseAmount = n;
			if (targetRound) {
				return Math.round(lastAmount);
			} else {
				return lastAmount;
			}
		}

		this.dispose = function() {
			clearInterval(interval);
			return true;
		}
	}//-16


/*--
zim.Dictionary = function(unique)

Dictionary
zim class

DESCRIPTION
An object that uses objects as keys to give values.
Similar to an object literal with properties except the property names are objects instead of strings.
JavaScript currently does not have a dictionary, but other languages do.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var o = {test:"test"};
var f = function(w) {zog(w)};
var c = new zim.Circle();
var d = new zim.Dictionary();
d.add(o, 1); d.add(f, 2); d.add(c, f);
zog(d.at(o)); // 1
zog(d.at(f)); // 2
d.at(c)("hello"); // hello
d.remove(o); // to clear o
zog(d.length); // 2
END EXAMPLE

EXAMPLE
var d = new zim.Dictionary();
d.add(circle, "one");
d.add(circle, "two");
zog(d.at(circle)); // two - just the latest but "one" is still there
for (var i=0; i<d.length; i++) {
	if (d.objects[i] == circle) zog(d.values[i]); // one then two
}
// note, loop backwards to clear values at a key
END EXAMPLE

EXAMPLE
// with unique property add(key, val) removes the last val at that key
var d = new zim.Dictionary(true);
d.add(circle, "one");
d.add(circle, "two");
zog(d.at(circle)); // two - and now only two is there
for (var i=0; i<d.length; i++) {
	if (d.objects[i] == circle) zog(d.values[i]); // two
}
// note, now d.remove(key) removes that unique entry for the key
END EXAMPLE

PARAMETERS
unique (default false) - set to true to only accept a single entry (the last added) for a key

METHODS
add(object, value) - adds a value that can be retrieved by an object reference
	if unique is false, this will not overwrite previous entries at the object key
	if unique is true, this will overwrite previous entries at the object key
	value is optional and will default to true
at(object) - retrieves the last value stored at the object (or returns null if not there)
remove(object) - removes the last value at the object from the Dictionary
dispose() - deletes Dictionary object

PROPERTIES
length - the number of items in the Dictionary
unique - whether the dictionary will overwrite values (going from false to true will not delete previous values)
objects - array of keys
values - array of values synched to keys
--*///+17
	zim.Dictionary = function(unique) {
		z_d("17");
		this.length = 0;
		this.unique = unique;
		var objects = this.objects = []; // store objects and values in synched arrays
		var values = this.values = [];

		this.add = function(o,v) {
			if (zot(o)) return;
			if (zot(v)) v = true;
			if (this.unique) this.remove(o);
			objects.push(o);
			values.push(v);
			this.length++;
		}

		this.at = function(o) {
			if (zot(o)) return;
			var i = objects.indexOf(o);
			if (i > -1) return values[i];
			return null;
		}

		this.remove = function(o) {
			if (zot(o)) return;
			var i = objects.indexOf(o);
			if (i > -1) {
				objects.splice(i,1);
				values.splice(i,1);
				this.length--
			}
		}

		this.dispose = function() {
			objects = null;
			values = null;
			this.length = null;
			return true;
		}
	}//-17

/*--
zim.swapProperties = function(property, objA, objB)

swapProperties
zim function

DESCRIPTION
Pass in a property as a string and two object references
and this function will swap the property values.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// exchanges the x position of two ZIM circles
zim.swapProperties("x", circle1, circle2); stage.update();
END EXAMPLE

PARAMETERS
property - a String of the property to swap values eg. "alpha"
objA, objB - the objects on which to swap properties

RETURNS Boolean indicating success
--*///+17.1
	zim.swapProperties = function(property, objA, objB) {
		z_d("17.1");
		if (zot(objA) || zot(objB) || zot(objA[property]) || zot(objB[property])) return false;
		var temp = objB[property];
		objB[property] = objA[property];
		objA[property] = temp;
		return true;
	}//-17.1

	// DOM CODE

/*--
zim.swapHTML = function(idA, idB)

swapHTML
zim function

DESCRIPTION
Pass in two tag ids as strings and this function will swap their innerHTML content.
The content (including nested tags) will be swapped.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// exchanges the content of two divs called question and answer
zim.swapHTML("question","answer");
END EXAMPLE

PARAMETERS
idA, idB - String names of the tag id with which to swap innerHTML values

RETURNS Boolean indicating success
--*///+17.2
	zim.swapHTML = function(idA, idB) {
		z_d("17.2");
		return zim.swapProperties("innerHTML", zid(idA), zid(idB));
	}//-17.2

/*--
zim.scrollX = function(num, time)

scrollX
zim function

DESCRIPTION
This function gets or sets how many pixels from the left the browser window has been scrolled.
If num is provided then the function scrolls the window to this x position.
If num and time are provided it animates the window to the x position in time milliseconds.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// hide the logo if the page is scrolled left more than 200 pixels
if (zim.scrollX < -200) zss("logo").display = "none";
END EXAMPLE

PARAMETERS
num - (default null) optional scroll position to go to (probably negative)
time - (default 0) time in milliseconds to take to go to the num position

RETURNS a Number
--*///+18
	zim.scrollX = function(num, time) {
		z_d("18");
		return zim.abstractScroll("X", "Left", num, time);
	}//-18


/*--
zim.scrollY = function(num, time)

scrollY
zim function

DESCRIPTION
This function gets or sets how many pixels from the top the browser window has been scrolled.
If num is provided then the function scrolls the window to this y position.
If num and time are provided it animates the window to the y position in time milliseconds.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// animate the scroll position down 100 pixels in half a second
zim.scrollY(zim.scrollY()-100, 500);
END EXAMPLE

PARAMETERS
num - (default null) optional scroll position to go to (probably negative)
time - (default 0) time in milliseconds to take to go to the num position

RETURNS a Number
--*///+19
	zim.scrollY = function(num, time) {
		z_d("19");
		return zim.abstractScroll("Y", "Top", num, time);
	}//-19

	//+20
	zim.abstractScroll = function(dir, side, num, time) {
		z_d("20");
		var perpend = (dir == "X") ? "Y" : "X"; // perpendicular direction
		if (zot(num)) {
			var safari = 0;
			var browser=navigator.applicationName;
			var navindex=navigator.userAgent.indexOf('Safari');
			if (navindex != -1 || browser=='Safari') {
				var safari = 1;
			}
			if (!safari && document.compatMode == 'CSS1Compat') {
				return document.documentElement["scroll"+side];
			} else {
				return document.body["scroll"+side];
			}
		} else if (zot(time)) {
			window.scrollTo(zim["scroll"+perpend](), num);
		} else {
			var interval = 50;
			if (time < interval) time = interval;
			var steps = time/interval;
			var current = zim["scroll"+dir]();
			var amount = num - current;
			var diff = amount/steps;
			var count = 0;
			var scrollInterval = setInterval(function() {
				count++;
				current+=diff;
				window.scrollTo(zim["scroll"+perpend](), current);
				if (count >= steps) {
					window.scrollTo(zim["scroll"+perpend](), num);
					clearInterval(scrollInterval);
				}
			}, interval);
		}
		return num;
	}//-20

/*--
zim.windowWidth = function()

windowWidth
zim function

DESCRIPTION
Returns the width of a window.
(window.clientWidth or window.innerWidth)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
if (zim.windowWidth() < 500) zss("related").display = "none";
END EXAMPLE

RETURNS a Number
--*///+21
	zim.windowWidth = function() {
		z_d("21");
		return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
	}//-21

/*--
zim.windowHeight = function()

windowHeight
zim function

DESCRIPTION
Returns the height of a window.
(window.clientHeight or window.innerHeight)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
if (zim.windowHeight() > 1000) zgo("big.html");
END EXAMPLE

RETURNS a Number
--*///+22
	zim.windowHeight = function() {
		z_d("22");
		return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
	}//-22

/*--
zim.urlEncode = function(string)

urlEncode
zim function

DESCRIPTION
Matches PHP urlencode and urldecode functions
for passing data on end of URL.
NOTE: only encode values of key=value pairs (not keys and not both keys and values)
NOTE: JSON automatically encodes and decodes

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var motto = "good = life & life = now";
zgo("submit.php?motto="+zim.urlEncode(motto));
END EXAMPLE

PARAMETERS
string - a value to URL encode (space to plus, etc.)

RETURNS a String
--*///+23
	zim.urlEncode = function(s) {
		z_d("23");
		var s = (s + '').toString();
		return encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}//-23

/*--
zim.urlDecode = function(string)

urlDecode
zim function

DESCRIPTION
Matches PHP urlencode and urldecode functions
for receiving raw data from a source that URLencodes.
NOTE: JSON automatically encodes and decodes

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var pairs = command.split("&");
var motto = zim.urlDecode(pairs[0].split("=")[1]);
END EXAMPLE

PARAMETERS
string - a URLencoded String to decode

RETURNS a String
--*///+24
	zim.urlDecode = function(s) {
		z_d("24");
		 return decodeURIComponent((s + '').replace(/\+/g, '%20'));
	}//-24

/*--
zim.setCookie = function(name, value, days)

setCookie
zim function

DESCRIPTION
Sets an HTML cookie to remember some user data your site has set over time.
If no days, it will be a session cookie (while browser is open).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var visits = zim.getCookie("visits");
if (zot(visits)) visits = 0;
zim.setCookie("visits", ++visits);
END EXAMPLE

PARAMETERS
name - a String name for your cookie
value - a String value that you want to store
days - (default 0) for how many days do you want to store the cookie

ALSO: see zim.getCookie and zim.deleteCookie

RETURNS a Boolean indicating success
--*///+25
	zim.setCookie = function(name, value, days) {
		z_d("25");
		if (zot(name) || zot(value)) return;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+escape(value)+expires+"; path=/";
		return true;
	}//-25

/*--
zim.getCookie = function(name)

getCookie
zim function

DESCRIPTION
Gets an HTML cookie that you have previously set.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var visits = zim.getCookie("visits");
if (zot(visits)) visits = 0;
zim.setCookie("visits", ++visits);
END EXAMPLE

PARAMETERS
name - the String name of your stored cookie

ALSO: see zim.setCookie and zim.deleteCookie

RETURNS a String or undefined if not found
--*///+26
	zim.getCookie = function(name) {
		z_d("26");
		var outer = document.cookie.split(/;\s*/);
		var cookies = new Array();
		var inner;
		for (i=0; i<outer.length; i++) {
			inner = outer[i].split("=");
			cookies[inner[0]] = inner[1];
		}
		if (typeof cookies[name] == 'undefined') return undefined;
		return unescape(cookies[name]);
	}//-26

/*--
zim.deleteCookie = function(name)

deleteCookie
zim function

DESCRIPTION
Deletes an HTML cookie.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
zim.deleteCookie("visits"); // clears the cookie
END EXAMPLE

PARAMETERS
name - the String name of your stored cookie to delete

ALSO: see zim.setCookie and zim.getCookie

RETURNS a Boolean indicating success
--*///+27
	zim.deleteCookie = function(name) {
		z_d("27");
		if (zot(zim.getCookie(name))) return false;
		zim.setCookie(name,"",-1);
		return true;
	}//-27

/*--
zim.convertColor = function(color, hexToWord)

convertColor
zim function

DESCRIPTION
Converts HTML String colors to hex numbers or hex numbers to HTML String colors (if it matches) else black

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var color = zim.convertColor("red"); // color is "#ff0000"
var color = zim.convertColor("#ff0000", true); // color is "red"
var color = zim.convertColor("f00", true); // color is "red" - note missing # okay and can use three digits
END EXAMPLE

PARAMETERS
color - (default black) the HTML string or hex color (case insensitive) (does not work with "rgba()")
hexToWord - (default false) set to true to convert a hex value to the HMTL string

RETURNS a String with the converted color or black or #000000 if a match is not found
--*///+27.5
	zim.convertColor = function(color, hexToWord) {
		if (zot(hexToWord)) hexToWord = false;
		if (hexToWord) {
			color = color.replace("#","");
			if (color.length == 3) {
				color = color.charAt(0)+color.charAt(0)+color.charAt(1)+color.charAt(1)+color.charAt(2)+color.charAt(2);
			}
		} else {
			if (color.charAt(0)=="#") return color; // already hex
		}
		var colors = ['black','aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','blanchedalmond','blue','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgrey','darkgreen','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','grey','green','greenyellow','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgrey','lightgreen','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','rebeccapurple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white','whitesmoke','yellow','yellowgreen'];
		var hex = ['000000','f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32'];
		if (hexToWord) {
			return colors[hex.indexOf(color.toLowerCase())!=-1?hex.indexOf(color):0];
		} else {
			return "#"+hex[colors.indexOf(color.toLowerCase())!=-1?colors.indexOf(color):0];
		}
	}//-27.5

/*--
zim.mobile = function(orientation)

mobile
zim function

DESCRIPTION
Detects if app is on a mobile device - if so, returns the mobile device type:
android, ios, blackberry, windows, other (all which evaluate to true) else returns false.
orientation defaults to true and if there is window.orientation then it assumes mobile
BUT this may return true for some desktop and laptop touch screens
so you can turn the orientation check off by setting orientation to false.
If orientation is set to false the check may miss non-mainstream devices
The check looks at the navigator.userAgent for the following regular expression:
/ip(hone|od|ad)|android|blackberry|nokia|opera mini|mobile|phone|nexus|webos/i
Microsoft mobile gets detected by nokia, mobile or phone.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
if (zim.mobile()) {
	var pane = new zim.Pane(stage, 300, 200, "Desktop Only");
	pane.show();
}
END EXAMPLE

PARAMETERS
orientation - (default true) uses window.orientation property to determine mobile
	this may call certain touch screens mobile
	but setting to false uses a test on mobile names which could be incomplete

RETURNS a String or false
--*///+28
	zim.mobile = function(orientation) {
		z_d("28");
		if (zot(orientation)) orientation = true;
		if (/ip(hone|od|ad)/i.test(navigator.userAgent)) return "ios";
		if (/android|nexus/i.test(navigator.userAgent)) return "android";
		if (/blackberry/i.test(navigator.userAgent)) return "blackberry";
		if (/nokia|phone|mobile/i.test(navigator.userAgent)) return "windows";
		if (/opera mini|webos/i.test(navigator.userAgent)) return "other";
		if (orientation && window.orientation !== undefined) return true;
		return false;
	}//-28

/*--
zim.async = function(url, callback)

async
zim function

DESCRIPTION
A way to send data back and forth to a server script without reloading the HTML page.
(like AJAX but without the bother)
Uses a dynamic script call with an optional callback (cross domain calls are okay)
also known as JSON-P pattern but JSON is unnecessary - note, no JSON in the examples below.
Pass a url to the server script (ie. php or node page)
and an optional callback function that you define in your code (cannot be an anonymous function).
zim.async will automatically add a random number to the end of your script call to defeat cache.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// existing service:
// assuming that we have a callback function called test as shown below
zim.async("http://ip-api.com/json?callback=zim.async.test",test);
function test(data) {zog(data.country);}
// note that the callback we pass the service is zim.async.test not just test
// this allows zim to handle scope issues and garbage collect the dynamic script when done
// if the service passes JSON you may need to JSON.decode() the data being returned
// this service passes an object literal not JSON despite its file name
END EXAMPLE

EXAMPLE
// CLIENT - your own server script:
// assuming we have a callback function called myFunction as shown below
zim.async("http://yourserver.com/script.php?id=72&name=dan", myFunction);
function myFunction(data){zog(data);}

// SERVER - your script must output the following format as a string:
// "zim.async.myFunction(somedata)"
// in the php file we would use:
echo "zim.async.myFunction('success')";
// to return an object literal with nodejs express for example, you would use:
res.send('zim.async.myFunction({list:[1,2,3], name:"whatever"})');
// the data parameter in the myFunction function defined earlier would be an object literal
// we could then do zog(data.list[0]) to log the value 1, etc.
END EXAMPLE

PARAMETERS
url - url to the server script (ie. php or node page)
callback - (default null) callback function that you define in your code (cannot be an anonymous function)

calling the return function on zim.async does two things:
1. it handles scope issues so we can find your callback function
2. it handles garbage collection to remove the dynamic script tag that was used
if you do not specify a callback function then just send "" back from your server script
NOTE: we have experienced duplicate script calls if nothing is sent back

RETURNS undefined
--*///+29
	zim.async = function (url, callback) {
		z_d("29");
		if (zot(url)) return;
		var tag = document.createElement("script");
		if (callback) {
			var n = callback.toString().split(/\n/,1)[0].match(/^function\s?([^\s(]*)/)[1];
			// create callback bridge on async function object
			zim.async[n] = function() { // closure to access tag on callback bridge
				var t = tag;
				return function(d){
					// remove the script tag and do the callback
					if (t) t.parentNode.removeChild(t); t = null;
					callback(d);
				}
			}();
		} else {
			if (zim.async.z_s && zim.async.z_s.parentNode) zim.async.z_s.parentNode.removeChild(zim.async.z_s); // keep overwriting same script tag if no callback
			zim.async.z_s = tag;
		}
		if (!url.match(/\?/)) url += "?";
		tag.setAttribute("src", url + "&r="+Math.random());
		document.getElementsByTagName("head")[0].appendChild(tag);
	}//-29

/*--
zim.extend = function(subclass, superclass, override, prefix, prototype)

extend
zim function - modified CreateJS extend and promote utility methods

DESCRIPTION
Place after a sub class to extend a super class.
Extending a super class means that the sub class receives all the properties and methods of the super class.
For example, a ZIM Container() extends a CreateJS Container and then adds more methods and properties
but all the CreateJS Container methods and properties are still there too like x, y, addChild(), etc.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
function Person() {
	this.talk = function() {
		zog("I am a person");
	}
}
function Woman() {
	this.super_constructor();
}
zim.extend(Woman, Person);
var woman = new Woman();
woman.talk();
END EXAMPLE

NOTE: CreateJS display objects require their constructor to be called otherwise it is like quantum entanglement (seriously)
zim.extend() adds access to the super class constructor so it can be called in the subclass as follows:
this.super_constructor();
It also provides access to super class methods that are overridden

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// make a Collection class that will extend a zim.Container
// the Collection class will call the zim.Container constructor
// and override the the ZIM Container center method in the class body
// and override the CreateJS Container addChild method in the prototype
// either method would work in either place - it is often a matter of preference
// but you might need to use a method in the class body to access local variables
// The ZIM extend() method parameter values need to change depending on where you override
// see the comments inline for the instructions

var Collection = function() {
	// for CreateJS the super constructor must be run
	this.super_constructor();

	// override the zim center() method
	// methods in the function call that override must be passed in as an array of strings
	// to the override parameter of zim.extend() to be able to access the super_method
	this.center = function(where) {
		this.super_center(where);
		this.y -= 50;
	}
}
// override the super class addChild() that comes from the CreateJS Container
// methods on the prototype that override are automatically provided a super_method
// unless the prototype parameter of zim.extend() is set to false (default is true)
Collection.prototype.addChild = function(c) {
	this.super_addChild(c); // call the super class addChild
	zog("added a child to Collection");
}

// make the Collection extend a zim.Container()
// it will receive all the properties and methods of the zim.Container plus its own
zim.extend(Collection, zim.Container, "center"); // or pass an array of overridden methods

// use the Collection
var c = new Collection();
c.addChild(new zim.Rectangle(100, 100, frame.green)); // zogs "added a child to Collection"
c.center(stage); // centers the collection but then offsets it 50 pixels up
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
subclass - the class to extend
superclass - the class to extend from (an existing class)
override - (default null) an Array of methods (as Strings) to override.
	You can override any function by just defining that function in the subclass
	the override parameter gives you access to the overridden function in the superclass prototype
	only methods on the superclass prototype can be accessed once overridden - not methods in the superclass body
	if there is only one method being overridden then a single string is fine ("test" or ["test"] is fine)
	any methods passed to this parameter will be given prefix_methodName() access on the sub class (this.prefix_methodName())
	where the prefix is below (note, the prototype setting has no bearing on these manual overrides)
	this list is only needed for methods in the subclass body
	methods assigned to the prototype of the subclass that override are automatically given prefixes
prefix - (default "super") a prefix that will be followed by "_" and then the overridden method name
	by default this.super_constructor() would call the super class constructor
	if prefix is set to "Person" then this.Person_constructor() would call the super class constructor
	the same system is used to call overridden files in override or prototype
prototype - (default true) will search the subclass prototype for overriding methods
	the overridden methods are then available as this.prefix_methodName()
	set to false to avoid searching the super class for methods overridden by the sub class prototype
	just quickens the code minutely if there is no need

NOTE: the superclass constructor is always available as this.prefix_constructor() no matter the override or prototype settings
NOTE: this.prefix_constructor(); should be called at the top of the subclass to avoid problems when multiple copies of object
NOTE: to extend a class that already extends a ZIM class then change the prefix to a unique name:

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// if we already had the Collection example above and we want to extend that
// then we must use a new prefix when using zim.extend()

var Records = function() {
	this.Collection_constructor();
}
zim.extend(Records, Collection, null, "Collection");

// you will still have this.super_center(), this.super_addChild() if needed
// plus any newly overridden methods available as this.Collection_methodName() etc.
var r = new Records();
r.addChild(new zim.Circle(20, zim.pink));
r.super_center(stage); // call the original center (without vertical shift)

// to extend again, use yet another prefix - for example: "Records"
var Jazz = function() {
	this.Records_constructor();
}
zim.extend(Jazz, Records, null, "Records");
END EXAMPLE

NOTE: extend() is included in Distill if DISPLAY, METHODS or FRAME Module classes are used (otherwise NOT included)

RETURNS the subclass
--*///+50.35
	zim.extend = function(subclass, superclass, override, prefix, prototype) {

		var sig = "subclass, superclass, override, prefix, prototype";
		var duo; if (duo = zob(zim.extend, arguments, sig)) return duo;

		if (zot(subclass) || zot(superclass)) if (zon) {zog("zim.extend() - please supply a class and its superclass"); return;}
		if (zot(prefix)) prefix = "super";
		if (zot(override)) override = [];
		if (!Array.isArray(override)) override = [override];
		if (zot(prototype)) prototype = true;
		// modified CreateJS extend() to include any prototype members already added
		// see http://www.createjs.com/docs/easeljs/classes/Utility%20Methods.html
		var existingP = {};
		for (var f in subclass.prototype) Object.defineProperty(existingP,f,Object.getOwnPropertyDescriptor(subclass.prototype, f));
		function o() {this.constructor = subclass;}
		o.prototype = superclass.prototype;
		subclass.prototype = new o();
		for (f in existingP) Object.defineProperty(subclass.prototype,f,Object.getOwnPropertyDescriptor(existingP,f));

		// modified CreateJS promote() to promote methods other than constructor only if methods is true
		// zim does not override with prototypes so it is uneccessary to loop through the super class methods
		// added checking an array of string values of methods defined in class (not prototype) that are being overridden
		var subP = subclass.prototype;
		var supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
		if (supP) {
			subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
			var n;
			for (var i=0; i<override.length; i++) {
				n = override[i];
				if (typeof supP[n] == "function") {subP[prefix + n] = supP[n];}
			}
			if (prototype) {
				for (n in supP) {
					if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) {subP[prefix + n] = supP[n];}
				}
			}
		}
		return subclass;
	}
	//-50.35

if (typeof(createjs) == "undefined") {if (zon) {zog("ZIM >= 4.3.0 requires createjs namespace to be loaded (import createjs before zim)");} return zim;}



////////////////  ZIM DISPLAY  //////////////

// Zim Display (formerly Zim Build) adds common display classes for multies (interactive media)
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

/*--
zim.Container = function(width||boundsX, height||boundsY, null||width, null||height)

Container
zim class - extends a createjs.Container

DESCRIPTION
A Container object is used to hold other display objects or other containers.
You can then move or scale the container and all objects inside will move or scale.
You can apply an event on a container and use the target property of the event object
to access the object in the container that caused the event
or use the currentTarget property of the event object to access the container itself.
Containers do not have bounds unless some items in the container have bounds -
at which point the bounds are the combination of the bounds of the objects with bounds.
You can manually set the bounds with setBounds(x,y,w,h) - read the CreateJS docs.
Or pass in width and height, or boundsX, boundsY, width, height to have zim.Container set bounds
Manually set bounds will not update automatically unless you setBounds(null).

NOTE: All the ZIM shapes and components extend the zim.Container.
This means all shapes and components inherit the methods and properties below
and indeed, the zim.Container inherits all the createjs.Container methods and properties.
See the CreateJS documentation for x, y, alpha, rotation, on(), addChild(), etc.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var container = new zim.Container();
stage.addChild(container);
container.x = 100; container.y = 100;

var rect = new zim.Rectangle(100, 100, "blue");
container.addChild(rect); // add rectangle to container
var circle = new zim.Circle(40, "red");
circle.center(container) // add the circle to the container and center

container.drag(); // will drag either the rectangle or the circle
container.drag({currentTarget:true}); // will drag both the rectangle and the circle

// below will reduce the alpha of the object in the container that was clicked (target)
container.on("click" function(e) {e.target.alpha = .5; stage.update();})
// below will reduce the alpha of all the objects in the container (currentTarget)
container.on("click" function(e) {e.currentTarget.alpha = .5; stage.update();})
END EXAMPLE

PARAMETERS
width - (default null) the width of the container
height - (default width) the height of the container
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(boundsX,boundsY,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

OR if four parameters are set:
boundsX - (default 0) the x of the bounds
boundsY - (default 0) the y of the bounds
width - (default null) the width of the container
height - (default width) the height of the container
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(boundsX,boundsY,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

**** this class has all the DISPLAY METHODS introduced in ZIM 4TH
**** the methods below are available in ZIM Rectangle, Circle, Triangle
**** as well as all components like: Label, Button, Slider, Dial, Tab, Pane, etc.
**** as well as the ZIM display wrappers: Container, Shape, Sprite, MovieClip and Bitmap
**** the addition of methods and display wrappers added 3.4K to the file size

METHODS
* see the ZIM Create Module functions for full documentation
* see the USAGE section that follows this list of methods
* most methods accept ZIM DUO (except for 0 or 1 parameter functions like the hitTests)

drag(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens)
noDrag()
dragRect(rect)
setSwipe(swipe)
gesture(move, scale, rotate, rect, minScale, maxScale, snapRotate)
noGesture(move, scale, rotate)
hitTestPoint(x, y)
hitTestReg(b)
hitTestRect(b, num)
hitTestCircle(b, num)
hitTestBounds(b, boundsShape)
boundsToGlobal(rect, flip)
hitTestGrid(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)
move(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindWaitCall, rewindWaitParams, rewindParams, sequence, sequenceCall, sequenceParams, props, protect, override, from, id)
animate(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindWaitCall, rewindWaitParams, rewindParams, sequence, sequenceCall, sequenceParams, props, css, protect, override, from, id)
loop(call, reverse, step, start, end)
wiggle(target, property, baseAmount, minAmount, maxAmount, minTime, maxTime, ease, integer, id)
copyMatrix(source)
pos(x, y)
alp(alpha)
rot(rotation)
scale(scale)
scaleTo(boundObj, percentX, percentY, type, boundsOnly)
fit(left, top, width, height, inside)
outline(color, size)
addTo(container, index)
removeFrom(container)
added()
centerReg(container, index, add)
center(container, index, add)
place(id)
placeReg(id)
expand(padding, paddingVertical)
setMask(mask)

USAGE
the above list of methods work on all objects that extend zim.Container
such as ZIM shapes and components (Label, Button, Slider, Dial, etc.)
also other ZIM display objects can use these methods (Shape, Bitmap, MovieClip, Sprite)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle();
circle.center(stage); // add circle to stage and center
circle.drag();

// alternatively, we can still use the traditional ZIM functions:
zim.center(circle, stage);
zim.drag(circle);

// ZIM DUO works the same way as before - eg.
circle.drag({slide:true});
END EXAMPLE

METHODS, CONT'D
clone() - clones the container, its properties and all its children

ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** bounds must be set first (or width and height parameters set) for these to work
** setting these adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.5
zim.Container = function(a, b, c, d) {
		z_d("50.5");
		this.cjsContainer_constructor();
		this.type = "Container";
		if (!zot(c)) {
			var boundsX = a;
			var width = c;
			var boundsY = b;
			var height = d;
		} else {
			var boundsX = 0;
			var width = a;
			var boundsY = 0;
			var height = b;
		}
		if (zot(height)) height = width;
		if (!zot(a)) this.setBounds(boundsX,boundsY,width,height);
		this.clone = function() {
			return this.cloneChildren(this.cloneProps(new zim.Container(boundsX, boundsY, width, height)));
		}
	}
	zimify(zim.Container.prototype);
	zim.extend(zim.Container, createjs.Container, "clone", "cjsContainer", false);

	//-50.5

/*--
zim.Shape = function(width||boundsX, height||boundsY, null||width, null||height, graphics)

Shape
zim class - extends a createjs.Shape

DESCRIPTION
ZIM Shape lets you draw dynamic shapes beyond the ZIM provided shapes.
You make a new shape object and then draw in its graphics property
using similar commands to the HTML Canvas commands (and Flash Bitmap drawing).
See the CreateJS Easel Shapes and Graphics docs:
http://www.createjs.com/docs/easeljs/classes/Graphics.html

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var shape = new zim.Shape();
shape.graphics.fill("red").drawRect(0,0,200,100);
// similar to zim.Rectangle(200, 100, "Red");

// we can draw lines, etc.
var g = shape.graphics; // shorter reference to graphics object
g.stroke("blue").moveTo(200,200).lineTo(300,300);

// we can continue to draw as much as we want in the same shape
// there is also a tiny API with shortcuts: stroke, fill, etc.
g.s("green").f("red").mt(500,500).qt(550,500,600,500);
END EXAMPLE

PARAMETERS
width - (default null) the width of the shape
height - (default width) the height of the shape
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(0,0,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

OR if four parameters are set:
boundsX - (default 0) the x of the bounds
boundsY - (default 0) the y of the bounds
width - (default null) the width of the shape
height - (default width) the height of the shape
	if there is a width supplied but no height then the height is set to the width
	setting these run shape.setBounds(boundsX,boundsY,width,height);
	you should be able to shape.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

graphics - (default null) a CreateJS Graphics instance (see CreateJS docs)
	or just use the graphics property of the shape object (like usual)

METHODS
clone(recursive) - makes a copy of the shape
	recursive defaults to true so copy will have own copy of graphics
	set recursive to false to have clone share graphic property

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), placeReg(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** bounds must be set first (or width and height parameters set) for these to work
** setting these adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Shape properties, such as:
graphics, x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, etc.

EVENTS
See the CreateJS Easel Docs for Shape events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.6
	zim.Shape = function(a, b, c, d, graphics) {
		z_d("50.6");
		this.cjsShape_constructor(graphics);
		this.type = "Shape";
		var that = this;
		if (!zot(c)) {
			var boundsX = a;
			var width = c;
			var boundsY = b;
			var height = d;
		} else {
			var boundsX = 0;
			var width = a;
			var boundsY = 0;
			var height = b;
		}
		if (zot(height)) height = width;
		if (!zot(a)) this.setBounds(boundsX,boundsY,width,height);

		this.clone = function(recursive) {
			if (zot(recursive)) recursive = true;
			var c = that.cloneProps(new zim.Shape(width, height, boundsX, boundsY, graphics));
			if (recursive) c.graphics = that.graphics.clone();
			else c.graphics = that.graphics;
			return c;
		}
	}
	zim.extend(zim.Shape, createjs.Shape, "clone", "cjsShape", false);
	zimify(zim.Shape.prototype);
	//-50.6

/*--
zim.Bitmap = function(image, width, height, id)

Bitmap
zim class - extends a createjs.Bitmap

DESCRIPTION
Makes a Bitmap object from an image.
It is best to use the loadAssets() method of ZIM Frame
to preload the image and then use the asset() method to access the Bitmap.
See the ZIM Frame class and asset example on the ZIM Frame page of templates.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var frame = new zim.Frame();
frame.on("ready", function() {
	var stage = frame.stage;
	frame.loadAssets("logo.jpg");
	frame.on("complete", function() {
		var logo = frame.asset("logo.jpg"); // logo is a zim.Bitmap
		logo.center(stage);
		stage.update();
	});
});
END EXAMPLE

EXAMPLE
// fill a Bitmap with noise:
var noise = new zim.Noise();
// empty Bitmap size 200, 200
var bmp = new Bitmap(null,200,200).center(stage);
// we fill the bitmap starting from top left going across in the inner loop,
// then down, then across, etc. until we get to bottom right.
var f = 50; // used to make noise bigger or smaller - see the blob comment below
for (var y = 0; y < bmp.height; y++) {
	for (var x = 0; x < bmp.width; x++) {
		// the noise methods return a number from -1 to 1
		// by adding 1 we get a number between 0 and 2 then divide by 2
		// and we multiply this by 255 to get a number between 0 and 255
		value = (noise.simplex2D(x, y)+1)/2 * 255;
		// or get blobs by smoothing and adjusting frequency:
		// var value = zim.smoothStep(.3,.35, (noise.simplex2D(x/f, y/f)+1)/2) * 255;
		// imageData is four values per pixel
		// the red, green, blue and alpha
		// in one big long array - each value will be constrained to between 0 and 255
		// this i value will increase by 4 each time
		// then we write the same value for red, green, blue to get a shade of grey
		var i = (x + y * bmp.width) * 4;
		bmp.imageData.data[i] = value; // red (0-255)
		bmp.imageData.data[i + 1] = value; // green (0-255)
		bmp.imageData.data[i + 2] = value; // blue (0-255)
		bmp.imageData.data[i + 3] = 255; // alpha (0-255)
	}
}
bmp.drawImageData();
END EXAMPLE

PARAMETERS
image - an HTML image URL (may not load right away - see zim.Frame loadAssets)
width - (default 100) used with putImageData to draw a Bitmap otherwise ignored
height - (default 100) used with putImageData to draw a Bitmap otherwise ignored
id - an optional id

METHODS
drawImageData(x, y, sourceX ,srcY, srcWidth, srcHeight) - draws the Bitmap's imageData data to the Bitmap
	NOTE: This is only used when dynamically drawing a Bitmap with data - not for your normal picture
	See the imageData property which should be set before using the drawImageData() method
	ZIM calls a putImageData method for the HTML Canvas and then transfers this to the Bitmap
	See also https://www.w3schools.com/tags/canvas_putimagedata.asp - but let ZIM do the work...
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Bitmap methods, such as:
on(), off(), getBounds(), setBounds(), dispatchEvent(), etc.

PROPERTIES
type - holds the class name as a String
imageData - data for the pixels stored in a data property of an ImageData object
	NOTE: This is only used when dynamically drawing a Bitmap with data - not for your normal picture
	The data property is an one dimensional Array with consecutive red, green, blue, alpha values (0-255) for each pixels
	eg. 0,0,0,255,255,255,255,255 is a white pixel with 1 alpha and a black pixel with 1 alpha
	You set this before calling the Bitmap drawImageData() method
 	See also https://developer.mozilla.org/en-US/docs/Web/API/ImageData - but let ZIM do the work
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
id - the filename used in the frame.loadAssets()
	if you add the path the file name then it will be included with the id
	if you add the path with the path parameter, it will not be included with the id
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Bitmap properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, etc.

EVENTS
See the CreateJS Easel Docs for Bitmap events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.7
	zim.Bitmap = function(image, width, height, id) {
		z_d("50.7");

		this.cjsBitmap_constructor(image);
		var that = this;
		this.type = "Bitmap";
		this.id = id;
		if (!zot(width) && !zot(height)) that.setBounds(0,0,width,height);
		if (zot(width)) width = 100;
		if (zot(height)) height = 100;
		this.imageData = new ImageData(width, height);
		this.drawImageData = function(x, y, sourceX, sourceY, sourceWidth, sorceHeight) {
			if (zot(x)) x = 0;
			if (zot(y)) y = 0;
			if (zot(sourceX)) sourceX = 0;
			if (zot(sourceY)) sourceY = 0;
			if (zot(sourceWidth)) sourceWidth = width;
			if (zot(sorceHeight)) sorceHeight = height;
			if (!that.proxyCanvas) {
				var c = that.proxyCanvas = document.createElement("canvas");
				c.setAttribute("width", width);
				c.setAttribute("height", height);
				that.proxyContext = c.getContext('2d');
				image = that.image = c;
			}
			if (that.proxyContext) {
				that.proxyContext.putImageData(that.imageData, x, y, sourceX, sourceY, sourceWidth, sorceHeight);
			}
		}
		if (zot(image)) that.drawImageData();

		this.clone = function() {
			return this.cloneProps(new zim.Bitmap(image, width, height, id));
		}
	}
	zim.extend(zim.Bitmap, createjs.Bitmap, "clone", "cjsBitmap", false);
	zimify(zim.Bitmap.prototype);
	//-50.7

/*--
zim.Sprite = function(image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, id, globalControl, spriteSheet)

Sprite
zim class - extends a createjs.Sprite

DESCRIPTION
A Sprite plays an animation of a spritesheet
which is a set of images layed out in one file.
You play the Sprite with the run() method.
This animates the Sprite over a given time
with various features like playing a labelled animation,
playing animation series,
SEE: http://zimjs.com/code/spritesheet/index.html
AND: http://zimjs.com/code/spritesheet/skateboard.html
wait, loop, rewind and call functions.
This actually runs a ZIM animation and animates the frames.

NOTE: A ZIM Sprite handles both an evenly tiled spritesheet - use cols and rows
and an un-evenly tiled spritesheet - use the json parameter.
The json can come from TexturePacker for instance exported for EaselJS/CreateJS
CreateJS Easel Sprite and SpriteSheet docs:
http://www.createjs.com/docs/easeljs/classes/Sprite.html
http://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
You can optionally pass in an existing createjs.SpriteSheet as a parameter.
When you do so, all other parameters are ignored.

NOTE: You can use CreateJS gotoAndPlay(), play(), etc.
but we found the framerate could not be kept
with other animations or Ticker events running.
So we recommend using the ZIM Sprite run() method.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// inside zim.Frame template
// boom.png is a sprite sheet found online
// It has 8 columns and 6 rows that we can visually count
// We can enter a total parameter if it does not end evenly in the grid
// A graphics editor (like Photoshop) could be used to see
// if there is an offset or spacing, etc. and enter those as parameters
// In this case, we do not need to do any of this - just enter the cols and rows

frame.on("complete", function() {
	var spriteImage = frame.asset("boom.png");

	var animation = new zim.Sprite({
		image:spriteImage,
		cols:8,
		rows:6,
		animations:{mid:[10,20], end:[30,40]} // optional animations with labels
		// see CreateJS SpriteSheet docs for the various animation format as there are a few different ones!
	});
	animation.center(stage);
	animation.run(2000); // plays the frames of the Sprite over 2 seconds (master time)

	// OR use the label to play the frames listed in animations parameter
	animation.run(1000, "mid");

	// OR run a series of animations
	// by passing an array of label objects to the label parameter
	// these each have a time so the master time is ignored
	// they can also have any of the run() parameters
	// if you provide an array of labels, you cannot rewind the overall animation
	animation.run(null, [
		{label:"mid", time:1000},
		{label:"end", time:500, loop:true, loopCount:5, call:function(){zog("loops done");}},
		{startFrame:10, endFrame:20, time:1000}
	]);

	// OR can call a function when done
	animation.run(1000, "mid", function(){
		stage.removeChild(animation);
		stage.update();
	});

	// OR can loop the animation
	animation.run({time:2000, loop:true}); // see run() parameters for more
});
END EXAMPLE

EXAMPLE
// Here is an example with CreateJS SpriteSheet data
// robot.png is a sprite sheet made by ZOE based on a Flash swf
// you can also make your own with Photoshop or Texture Packer

frame.loadAssets("robot.png");
frame.on("complete", function() {

	// using ZOE to export swf animation to spritesheet data
	// spritesheet data uses the image name, not the Bitmap itself
	var image = frame.asset("robot.png").image;
	var spriteData = {
		"framerate":24,
		"images":[image],
		"frames":[[0, 0, 256, 256, 0, -54, -10], many more - etc.],
		"animations":{}
	};
	var animation = new zim.Sprite({json:spriteData});
	animation.center(stage);
	animation.run(2000); // note, duration alternative to framerate
});

OR
// load in data from externa JSON
frame.loadAssets(["robot.json", "robot.png"]);
// ... same as before
var animation = new zim.Sprite({json:frame.asset("robot.json")});
// ... same as before

// see CreateJS SpriteSheet docs for the format of the JSON file
// including various animation formats
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
image - the ZIM Bitmap for the spritesheet
cols - (default 1) - the columns in the spritesheet
rows - (default 1) the rows in the spritesheet
count - (default cols*rows) how many total frames in the spritesheet
offsetX - (default 0) the pixels from the left edge to the frames
offsetY - (default 0) the pixels from the top edge to the frames
spacingX - (default 0) the horizontal spacing between the frames
spacingY - (default 0) the vertical spacing between the frames
width - (default image width) the width including offset and spacing for frames
height - (default image height) the height including offset and spacing for frames
animations - (default null) an object literal of labels holding frames to play
	{label:3, another:[4,10]}
	run(1000, "label") would play frame 3 for a second
	run(1000, "another") would play frames 4 to 10 for a second
	{unordered:{frames:[1,2,3,22,23,24,"anotherLabel",5,6], next:prevLabel}}
	There are also ways to set speeds - but would recommend dividing into simple labels
	and using the label series technique available with the run() method
json - (default null) a JSON string for a CreateJS SpriteSheet
	If you pass in a json parameter, all other parameters are ignored
	NOTE: remember that JSON needs quotes around the animation properties above:
	{"label":3, "another":[4,10]}
id - (default randomly assigned) an id you can use in other animations - available as sprite.id
	use this id in other animations for pauseRun and stopRun to act on these as well
globalControl - (default true) pauseRun and stopRun will control other animations with same id
spriteSheet - (default null) pass in a CreateJS SpriteSheet to build a Sprite from that

METHODS
time, label, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, startFrame, endFrame, tweek, id, globalControl
run(time, label, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindWaitCall, rewindWaitParams, startFrame, endFrame, spriteID)
	The run() method animates the Sprite over an amount of time
	Would recommend this method over the CreateJS play() and gotoAndPlay()
	methods because the framerate for these get overwritten by other stage.update() calls
	With run() you get other nice ZIM animate features as well as follows:
	Returns the object for chaining
	Can be paused with pauseZimAnimate(true) or unpaused with pauseZimAnimate(false)
	Can be stopped with stopZimAnimate() on the Sprite
	supports DUO - parameters or single object with properties below
	time (default 1) - the time in milliseconds to run the animations (the master time)
	label (default null) - a label specified in the Sprite animations parameter
		if this is an array holding label objects for example:
		[{label:"run", time:1000}, {label:"stand", time:2000}]
		then the sprite will play the series with the times given and ignore the master time
		Note: if any of the series has a loop and loops forever (a loopCount of 0 or no loopCount)
		then this will be the last of the series to run
		rewind is not available on the outside series but is available on an inside series
	call - (default null) the function to call when the animation is done
	params - (default target) a single parameter for the call function (eg. use object literal or array)
	wait - (default 0) milliseconds to wait before doing animation
	waitedCall - (default null) call the function after a wait time if there is one
	waitedParams - (default null) parameters to pass to the waitedCall function
	loop - (default false) set to true to loop animation
	loopCount - (default 0) if loop is true how many times it will loop (0 is forever)
	loopWait - (default 0) milliseconds to wait before looping (post animation wait)
	loopCall - (default null) calls function after loop and loopWait (not including last loop)
	loopParams - (default target) parameters to send loopCall function
	loopWaitCall - (default null) calls function after at the start of loopWait
	loopWaitParams - (default target) parameters to send loopWaitCall function
	rewind - (default false) set to true to rewind (reverse) animation (doubles animation time) (not available on label series)
	rewindWait (default 0) milliseconds to wait in the middle of the rewind
	rewindCall (default null) calls function at middle of rewind after rewindWait
	rewindParams - (default target) parameters to send rewindCall function
	rewindWaitCall (default null) calls function at middle of rewind before rewindWait
	rewindWaitParams - (default target) parameters to send rewindCall function
	startFrame - (default null - or 0) the frame to start on - will be overridden by a label with frames
	endFrame - (default null - or totalFrames) the frame to end on - will be overridden by a label with frames
	tweek - (default 1) a factor for extra time on rewind and loops if needed
	id - (default randomly assigned) an id you can use in other animations - available as sprite.id
		use this id in other animations for pauseRun and stopRun to act on these as well
	globalControl - (default true) pauseRun and stopRun will control other animations with same id
pauseRun(state) - pause or unpause the animation (including an animation series)
	state - (default true) when true the animation is paused - set to false to unpause
	returns object for chaining
stopRun() - stop the sprite from animating
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Sprite methods, such as:
play(), gotoAndPlay(), gotoAndStop(), stop(), advance(),
on(), off(), getBounds(), setBounds(), dispatchEvent(), etc.

PROPERTIES
id - an id that you can use in other animations to also be controlled by pauseRun() and stopRun()
frame - get and set the current frame of the Sprite
normalizedFrame - if animations have CreateJS speeds applied, zim handles these by making extra frames
	for example, if a speed is given of .5 then two frames are made (min resulution is .1)
normalizedFrames - an array of total frames after being normalized - really for internal usage
totalFrames - get the total frames of the Sprite - read only
animations - the animations data with labels of frames to animate
running - is the sprite animation being run (includes both paused and unpaused) - read only
runPaused - is the sprite animation paused (also returns paused if not running) - read only
	note: this only syncs to pauseRun() and stopRun() not pauseZimAnimate() and stopZimAnimate()
	note: CreateJS has paused, etc. but use that only if running the CreateJS methods
	such as gotoAndPlay(), gotoAndStop(), play(), stop()
** bounds must be set first for these to work
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Sprite properties, such as:
currentFrame, framerate, paused, currentAnimation, currentAnimationFrame, spriteSheet,
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, etc.

EVENTS
See the CreateJS Easel Docs for Sprite events, such as:
animationend, change, added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.8
	zim.Sprite = function(image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, id, globalControl, spriteSheet) {
		var sig = "image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, id, globalControl, spriteSheet";
		var duo; if (duo = zob(zim.Sprite, arguments, sig, this)) return duo;

		this.type = "Sprite";
		z_d("50.8");

		var that = this;
		var sheet;
		if (zot(json) && !zot(image)) {
			if (zot(cols)) cols = 1;
			if (zot(rows)) rows = 1;
			if (zot(count)) count = cols * rows;
			if (zot(offsetX)) offsetX = 0;
			if (zot(offsetY)) offsetY = 0;
			if (zot(spacingX)) spacingX = 0;
			if (zot(spacingY)) spacingY = 0;
			if (zot(width)) width = image.width;
			if (zot(height)) height = image.height;

			var frameW = (width-offsetX+spacingX) / cols - spacingX;
			var frameH = (height-offsetY+spacingY) / rows - spacingY;
			var frames = [];
			var num = 0;
			outer:
			for (var j=0; j<rows; j++) {
				for (var i=0; i<cols; i++) {
					if (++num > count) break outer;
					frames.push([
						offsetX + i*(frameW+spacingX),
						offsetY + j*(frameH+spacingY),
						frameW,
						frameH
					]);
				}
			}
			var spriteData = {
				images:[image.image], // note, this takes the image, not the Bitmap
				frames:frames,
				animations:animations
			};
			sheet = new createjs.SpriteSheet(spriteData);
		} else if (spriteSheet) {
			sheet = spriteSheet;
			animations = sheet.animations;
		} else {
			animations = json.animations;
			sheet = new createjs.SpriteSheet(json);
		}
		this.animations = animations;
		this.cjsSprite_constructor(sheet);

		if (zot(id)) id = zim.makeID();
		this.id = id;

		if (zot(globalControl)) globalControl = true;
		that.globalControl = globalControl;

		var _normalizedFrame = 0;
		var _normalizedFrames;
		this.parseFrames = function(label, startFrame, endFrame, fromDynamo) {
			var frames = [];
			var minSpeed = Number.MAX_VALUE;
			var maxSpeed = 0;
			if (zot(label)) {
				if (zot(startFrame)) startFrame = 0;
				if (zot(endFrame)) endFrame = that.totalFrames-1;
				addSequential(startFrame, endFrame);
			} else {
				if (zot(that.animations) || zot(that.animations[label])) return [];
				var a = that.animations[label];
				processAnimation(a);
			}
			function processAnimation(a) {
				if (Array.isArray(a)) {
					processArray(a);
				} else if (a.constructor == {}.constructor) {
					processObject(a);
				} else if (!isNaN(a)) {
					frames.push({f:Math.floor(a), s:1});
				}
			}
			function processArray(a) {
				addSequential(a[0], a[1], a[3]);
				if (a[2] && !zot(that.animations[a[2]])) processAnimation(that.animations[a[2]]);
			}
			function processObject(a) {
				if (zot(a.frames)) return;
				if (zot(a.speed)) a.speed = 1;
				for (var i=0; i<a.frames.length; i++) {
					if (a.speed < minSpeed) minSpeed = a.speed;
					if (a.speed > maxSpeed) maxSpeed = a.speed;
					frames.push({f:a.frames[i], s:a.speed});
				}
				if (a.next && !zot(that.animations[a.next])) processAnimation(that.animations[a.next]);
			}
			function addSequential(start, end, speed) {
				if (zot(speed)) speed = 1;
				for (var i=start; i<=end; i++) {
					if (speed < minSpeed) minSpeed = speed;
					if (speed > maxSpeed) maxSpeed = speed;
					frames.push({f:i, s:speed});
				}
			}
			if (fromDynamo) return frames;
			// run() uses an array of frame numbers (normalized to speed) where dynamo uses the speed

			// normalize up to 1/10 - as in if put at .1 then have to multiply all others speeds by 10
			minSpeed = zim.constrain(zim.decimals(minSpeed), .1);
			maxSpeed = zim.constrain(zim.decimals(maxSpeed), .1);

			// normalize speed:
			var framesNormalized = [];
			var normalize = (minSpeed != maxSpeed);
			var fr;
			for (var i=0; i<frames.length; i++) {
				fr = frames[i];
				if (normalize) {
					// if minSpeed less than 1 then divide all others by minSpeed otherwise use speed - and need to round to a number that is at least .1
					for (var j=0; j<zim.constrain(Math.round(minSpeed<1?fr.s/minSpeed:fr.s), .1); j++) {
						framesNormalized.push(fr.f);
					}
				} else {
					framesNormalized.push(fr.f);
				}
			}
			return framesNormalized;
		}

		this.run = function(time, label, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, startFrame, endFrame, tweek, id, globalControl) {
			var sig = "time, label, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, startFrame, endFrame, tweek, id, globalControl";
			var duo; if (duo = zob(this.run, arguments, sig)) return duo;

			var obj;
			var set;
			var lookup;
			if (zot(tweek)) tweek = 1;
			if (!zot(id)) that.id = id;
			if (!zot(globalControl)) that.globalControl = globalControl;

			if (Array.isArray(label)) {
				// check labels
				var innerLabel;
				var lastLabel;
				obj = [];
				var extraTime = 0;
				var firstStartFrame;
				for (var i=0; i<label.length; i++) {
					innerLabel = label[i]; // {label:"first", time:1000, etc}

					innerLabel.lookup = that.parseFrames(innerLabel.label, innerLabel.startFrame, innerLabel.endFrame);
					if (i==0) firstStartFrame = innerLabel.lookup[0];
					delete innerLabel.startFrame;
					delete innerLabel.endFrame;

					innerLabel.obj = zim.merge(innerLabel.obj, {normalizedFrame:innerLabel.lookup.length-1});
					innerLabel.set = zim.merge(innerLabel.set, {normalizedFrames:{noZik:innerLabel.lookup}, normalizedFrame:0});

					// based on previous frames
					if (zot(innerLabel.wait)) innerLabel.wait = extraTime*tweek;

					lastLabel = innerLabel.label;
					delete innerLabel.label;

					obj.push(innerLabel);

					// will get applied next set of frames
					extraTime = 0;
					var tt = zot(innerLabel.time)?time:innerLabel.time;
					if (endFrame-startFrame > 0) extraTime = tt / (endFrame-startFrame) / 2; // slight cludge - seems to look better?

					// if (i==0) firstStartFrame = startFrame;
				}
				//startFrame = firstStartFrame;
				if (obj.length == 0) return this;
				if (obj.length == 1) { // just one label in list ;-)
					time = obj[0].time;
					label = lastLabel;
					setSingle();
				} else {
					that.gotoAndStop(firstStartFrame);
				}
			} else { // single label
				setSingle();
			}

			function setSingle() {
				_normalizedFrames = that.parseFrames(label, startFrame, endFrame);
				that.gotoAndStop(_normalizedFrames[_normalizedFrame]);
				startFrame = endFrame = null;
				obj = {normalizedFrame:_normalizedFrames.length-1};
			}

			if (zot(time)) time = 1000;
			// if already running the sprite then stop the last run
			if (that.running) that.stopZimAnimate(that.id);
			that.running = true;

			if (!Array.isArray(obj)) {
				var extraTime = 0;
				if (endFrame-startFrame > 0) extraTime = time / (endFrame-startFrame) / 2; // slight cludge - seems to look better?
				if (zot(loopWait)) {loopWait = extraTime*tweek};
				if (zot(rewindWait)) {rewindWait = extraTime*tweek};
			}

			// locally override call to add running status after animation done
			var localCall = function() {
				if (call && typeof call == 'function') call(params);
				that.running = false;
			}

			zim.animate({
				target:that,
				obj:obj,
				time:time,
				ease:"linear",
				call:localCall,
				params:params,
				wait:wait, wait:waitedCall, wait:waitedParams,
				loop:loop, loopCount:loopCount, loopWait:loopWait,
				loopCall:loopCall, loopParams:loopParams,
				loopWaitCall:loopWaitCall, loopWaitParams:loopWaitParams,
				rewind:rewind, rewindWait:rewindWait, // rewind is ignored by animation series
				rewindCall:rewindCall, rewindParams:rewindParams,
				rewindWaitCall:rewindWaitCall, rewindWaitParams:rewindWaitParams,
				override:false,
				id:that.id
			});
			that.runPaused = false;
			return that;
		}

		this.runPaused = true;
		this.pauseRun = function(paused) {
			if (zot(paused)) paused = true;
			that.runPaused = paused;
			if (that.globalControl) {
				zim.pauseZimAnimate(paused, that.id);
			} else {
				that.pauseZimAnimate(paused, that.id);
			}
			return that;
		}
		this.stopRun = function() {
			that.runPaused = true;
			that.running = false;
			if (that.globalControl) {
				zim.stopZimAnimate(that.id);
			} else {
				that.stopZimAnimate(that.id);
			}
			return that;
		}

		Object.defineProperty(this, 'frame', {
			get: function() {
				return this.currentFrame;
			},
			set: function(value) {
				value = Math.round(value);
				if (this.paused) {
					this.gotoAndStop(value);
				} else {
					this.gotoAndPlay(value);
				}
			}
		});

		Object.defineProperty(this, 'normalizedFrame', {
			get: function() {
				return _normalizedFrame;
			},
			set: function(value) {
				_normalizedFrame = Math.round(value);
				this.gotoAndStop(_normalizedFrames[_normalizedFrame]);
			}
		});

		Object.defineProperty(this, 'normalizedFrames', {
			get: function() {
				return _normalizedFrames;
			},
			set: function(value) {
				_normalizedFrames = value;
			}
		});

		Object.defineProperty(this, 'totalFrames', {
			get: function() {
				return sheet.getNumFrames();
			},
			set: function(value) {
				zog("zim.Sprite - totalFrames is read only");
			}
		});

		this.clone = function() {
			return this.cloneProps(new zim.Sprite(image, cols, rows, count, offsetX, offsetY, spacingX, spacingY, width, height, animations, json, null, globalControl, spriteSheet));
		}
	}
	zim.extend(zim.Sprite, createjs.Sprite, "clone", "cjsSprite", false);
	zimify(zim.Sprite.prototype);
	//-50.8

/*--
zim.MovieClip = function()

MovieClip
zim class - extends a createjs.MovieClip

DESCRIPTION
A MovieClip adds timelines to a Container.
The timelines are zim.move() or zim.animate() zimTween properties.
The zimTween property returns a CreateJS Tween object.
Primarily made to support Adobe Animate MovieClip export.
*Consider this experimental for the moment...

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var movieClip = new zim.MovieClip();
var circle = new zim.Circle(20, frame.blue);
// circle needs to be on stage for zim.animate()
// movieClip will add it to itself anyway
stage.addChild(circle);

// *not sure why time is messed up
movieClip.timeline.addTween(circle.animate({obj:{scale:3}, time:100, rewind:true}).zimTween);
movieClip.play();
movieClip.center(stage);
stage.on("stagemousedown", function() {
	movieClip.paused = !movieClip.paused;
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
// from the CreateJS MovieClip docs: http://www.createjs.com/docs/easeljs/classes/MovieClip.html
mode - (default "independent") or single_frame (based on startPosition) or synched (syncs to parent)
startPosition - (default 0) the start position of the MovieClip (*could not get to work)
loop - (default true) set to false not to loop
labels - (default null) declare label property with position value
	eg. {explode:20} to use with gotoAndPlay("explode") rather than gotoAndPlay(20)
	*could not get labels to work either

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for MovieClip methods, such as:
play(), gotoAndPlay(), gotoAndStop(), stop(), advance(),
on(), off(), getBounds(), setBounds(), dispatchEvent(), etc.

PROPERTIES
type - holds the class name as a String
** bounds must be set first for these to work
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for MovieClip properties, such as:
currentFrame, totalFrames, currentLabel, duration, framerate, labels, loop, mode, paused, startPosition, timeline,
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseEnabled, parent, etc.

EVENTS
See the CreateJS Easel Docs for MovieClip events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+50.9
	zim.MovieClip = function(mode, startPosition, loop, labels) {
		var sig = "mode, startPosition, loop, labels";
		var duo; if (duo = zob(zim.MovieClip, arguments, sig, this)) return duo;

		this.type = "MovieClip";
		z_d("50.9");
		this.cjsMovieClip_constructor(mode, startPosition, loop, labels);
		this.clone = function() {
			return this.cloneProps(new zim.MovieClip(mode, startPosition, loop, labels));
		}
	}
	zim.extend(zim.MovieClip, createjs.MovieClip, "clone", "cjsMovieClip", false);
	zimify(zim.MovieClip.prototype);
	//-50.9

/*--
zim.Circle = function(radius, color, borderColor, borderWidth, dashed)

Circle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a circle shape inside a container.
The registration and origin will be the center.
NOTE: mouseChildren is turned to false for all zim Shape containers.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);

// or with 10 pixel grey stroke
var circle = new zim.Circle(50, "red", "#666", 10);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
radius - (default 50) the radius ;-)
color - (default "black") the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
** the methods setFill(), setStroke(), setStrokeSize() - have been removed - see properties above
clone() - makes a copy of the shape

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
shape - gives access to the circle shape
color - get and set the fill color
borderColor - get and set the stroke color
borderWidth - get and set the stroke size in pixels
radius - gets or sets the radius.
	The radius is independent of scaling and can be different than the width/2
	Setting the radius redraws the circle but any current scaling is kept
** setting widths, heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
mouseChildren - set to false so you do not drag the shape inside the circle
	if you nest things inside and want to drag them, will want to set to true
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+51
	zim.Circle = function(radius, color, borderColor, borderWidth, dashed) {

		var sig = "radius, color, borderColor, borderWidth, dashed";
		var duo; if (duo = zob(zim.Circle, arguments, sig, this)) return duo;
		z_d("51");
		this.zimContainer_constructor();
		this.type = "Circle";

		if (zot(radius)) radius = 50;
		if (zot(dashed)) dashed = false;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":"black";

		var that = this;
		var _radius = radius;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		this.mouseChildren = false;

		var circle = this.shape = new createjs.Shape();
		this.addChild(circle);

		var g = circle.graphics;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		var borderDashedObj;
		drawShape();
		function drawShape() {
			g.c();
			colorObj =g.f(_color).command;
			// border of 0 or a string value still draws a border in CreateJS
			if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
				if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
					if (zot(_borderColor)) _borderColor = "black";
					borderColorObj = g.s(_borderColor).command;
					borderWidthObj = g.ss(_borderWidth).command;
					if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
				}
			}
			g.dc(0,0,_radius);
			that.setBounds(-_radius,-_radius,_radius*2,_radius*2);
		}

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});
		Object.defineProperty(that, 'radius', {
			get: function() {
				return _radius;
			},
			set: function(value) {
				_radius = value;
				drawShape();
			}
		});
		this.clone = function() {
			return that.cloneProps(new zim.Circle(that.radius, that.color, that.borderColor, that.borderWidth, dashed));
		}
	}
	zim.extend(zim.Circle, zim.Container, "clone", "zimContainer", false);
	//-51

/*--
zim.Rectangle = function(width, height, color, borderColor, borderWidth, corner, flatBottom, dashed)

Rectangle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a rectangle shape inside a container.
The registration and origin will be top left corner.
NOTE: mouseChildren is turned to false for all zim Shape containers.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var rect = new zim.Rectangle(200, 100, "blue");
rect.center(stage);

// or with rounded corners:
var rect = new zim.Rectangle({width:200, height:100, color:"blue", corner:20});

// or with 2 pixel white stroke
var rect = new zim.Rectangle(200, 100, "blue", "white", 2);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width, height - (default 100) the width and height ;-)
color - (default "black") the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
corner - (default 0) the round of corner
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
** the methods setFill(), setStroke(), setStrokeSize() - have been removed - see properties above
clone() - makes a copy of the shape

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
shape - gives access to the rectangle shape
color - get and set the fill color
borderColor - get and set the stroke color
borderWidth - get and set the stroke size in pixels
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
mouseChildren - set to false so  you do not drag the shape inside the rectangle
	if you nest things inside and want to drag them, will want to set to true
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+52
	zim.Rectangle = function(width, height, color, borderColor, borderWidth, corner, flatBottom, dashed) {

		var sig = "width, height, color, borderColor, borderWidth, corner, flatBottom, dashed";
		var duo; if (duo = zob(zim.Rectangle, arguments, sig, this)) return duo;
		z_d("52");
		this.zimContainer_constructor();
		this.type = "Rectangle";

		if (zot(width)) width = 100;
		if (zot(height)) height = 100;
		if (zot(corner)) corner = 0;
		if (zot(flatBottom)) flatBottom = false;
		if (zot(dashed)) dashed = false;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":"black";

		var that = this;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		this.mouseChildren = false;

		var rectangle = this.shape = new createjs.Shape();
		this.addChild(rectangle);

		var g = rectangle.graphics;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		drawShape();
		function drawShape() {
			g.c();
			colorObj =g.f(_color).command;
			// border of 0 or a string value still draws a border in CreateJS
			if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
				if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
					if (zot(_borderColor)) _borderColor = "black";
					borderColorObj = g.s(_borderColor).command;
					borderWidthObj = g.ss(_borderWidth).command;
					if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
				}
			}
			if (flatBottom) {
				g.rc(0,0,width,height,corner,corner,0,0);
			} else {
				g.rr(0,0,width,height,corner);
			}

			that.setBounds(0,0,width,height);
		}

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});
		this.clone = function() {
			return that.cloneProps(new zim.Rectangle(width, height, that.color, that.borderColor, that.borderWidth, corner, flatBottom, dashed));
		}
	}
	zim.extend(zim.Rectangle, zim.Container, "clone", "zimContainer", false);
	//-52

/*--
zim.Triangle = function(a, b, c, color, borderColor, borderWidth, center, adjust, dashed)

Triangle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a triangle shape inside a container using three line lengths.
Passing one length parameter makes an equilateral triangle.
Passing two length parameters makes an isosceles triangle.
Passing -1 as the last length parameter makes a 90 degree triangle.
NOTE: mouseChildren is turned to false for all zim Shape containers.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var tri = new zim.Triangle(200, null, null, "green");
tri.center(stage);

// all three sides specified - tall pointy triangle with yellow stroke of 10 pixels
var tri = new zim.Triangle(100, 200, 200, "green", "yellow", 10);

// here we adjust so rotation looks better
var tri = new zim.Triangle({a:200, color:"green", adjust:30});
tri.center(stage);
tri.animate({obj:{rotation:360}, time:3000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
a, b and c - (default 100) the lengths of the sides
	a will run horizontally along the bottom
	b is upwards and c is back to the origin
	if c is set to -1 will assume a 90 angle
color - (default "black") the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
center - (default true) puts the registration point to the center
adjust - (default 0) pixels to bring center towards vertical base
	the actual center is not really the weighted center
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
** the methods setFill(), setStroke(), setStrokeSize() - have been removed - see properties above
clone() - makes a copy of the shape

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
shape - gives access to the triangle shape
color - get and set the fill color
borderColor - get and set the stroke color
borderWidth - get and set the stroke size in pixels
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
one, two, three - read only - points with x, y properties for bottom left, bottom right, top right
angles - read only - Array of angles [bottom left, bottom right, top right]
mouseChildren - set to false so  you do not drag the shape inside the triangle
	if you nest things inside and want to drag them, will want to set to true
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+53
	zim.Triangle = function(a, b, c, color, borderColor, borderWidth, center, adjust, dashed) {

		var sig = "a, b, c, color, borderColor, borderWidth, center, adjust, dashed";
		var duo; if (duo = zob(zim.Triangle, arguments, sig, this)) return duo;
		z_d("53");
		this.zimContainer_constructor();
		this.type = "Triangle";

		if (zot(a)) a = 100;
		if (zot(b)) b = a;
		if (zot(c)) c = b;
		if (c==-1) c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
		if (zot(center)) center = true;
		if (zot(adjust)) adjust = 0;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":"black";

		var that = this;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		this.mouseChildren = false;

		var lines = [a,b,c];
		lines.sort(function(a, b){return b-a});
		aa = lines[0];
		bb = lines[1];
		cc = lines[2];
		var order = [lines.indexOf(a), lines.indexOf(b), lines.indexOf(c)];

		if (aa > bb+cc) {
			zog("zim display - Triangle(): invalid triangle lengths");
			return;
		}

		var tri = this.shape = new createjs.Shape();
		this.addChild(tri);

		var g = tri.graphics;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		drawShape();
		function drawShape() {
			g.c();
			colorObj =g.f(_color).command;
			// border of 0 or a string value still draws a border in CreateJS
			if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
				if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
					if (zot(_borderColor)) _borderColor = "black";
					borderColorObj = g.s(_borderColor).command;
					borderWidthObj = g.ss(_borderWidth).command;
					if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
				}
			}
			g.mt(0,0);
			that.one={x:0,y:0};
			g.lt(a,0);
			that.two={x:a,y:0};

			// find biggest angle with cosine rule
			var angle1 = Math.acos( (Math.pow(bb,2) + Math.pow(cc,2) - Math.pow(aa,2)) / (2 * bb * cc) ) * 180 / Math.PI;

			// use the sine rule for next biggest angle
			var angle2 = Math.asin( bb * Math.sin(angle1 * Math.PI / 180) / aa ) * 180 / Math.PI;

			// find last angle
			var angle3 = 180 - angle1 - angle2;

			// get position of angles by mapping to opposite side sizes
			// as in smallest angle is across from smallest side
			// largest angle is across from largest size, etc.
			var temp = [angle1, angle2, angle3]; // largets to smallest
			that.angles = [temp[order[1]], temp[order[2]], temp[order[0]]];

			var nextAngle = that.angles[1];
			var backX = Math.cos(nextAngle * Math.PI / 180) * b;
			var upY = Math.sin(nextAngle * Math.PI / 180) * b;

			var width = Math.max(a, a-backX);
			var height = upY
			that.setBounds(0,0,width,height);
			tri.y = height;

			g.lt(a-backX,0-upY);
			that.three={x:a-backX,y:0-upY};
			g.cp();

			if (center) {
				that.regX = width/2;
				that.regY = height/2;
			}
			if (adjust) {
				that.shape.y+=adjust;
			}
		}

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});

		this.clone = function() {
			return that.cloneProps(new zim.Triangle(a, b, c, that.color, that.borderColor, that.borderWidth, center, adjust, dashed));
		}
	}
	zim.extend(zim.Triangle, zim.Container, "clone", "zimContainer");
	//-53

/*--
zim.Blob = function(color, borderColor, borderWidth, points, radius, controlLength, controlType, lockControlType, showControls, lockControls, dblclick, dblclickDrag, ctrlclick, dashed)

Blob
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a blob shape inside a container using a number of points.
The points have Bezier controls - little handles that change the shape of the Blob.
The type of control can be specified overall and individually - and can be hidden or shown
The type of control can be changed by double clicking the point - colors of the handles will change
The shape of the Blob can be recorded with the record() method
The Blob can be set to show and hide controls when double clicked - and to drag and to copy with shift click
NOTE: mouseChildren is turned to false for all zim Shape containers.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var blob = new zim.Blob(); // makes a circle with default 4 points with Bezier controls
blob.center(stage);

var moreBlob = new zim.Blob({
	points:12, // 12 points for more complex shape
	dblclick:true, // doubleClick to show and hide controls - drag when controls are hidden
	ctrlclick:true // shift click to make a copy of the current blob shape
}).center(stage);

var specifiedBlob = new zim.Blob({
	color:frame.purple,
	controlType:"free", // free will be default control type (rather than "straight")
	points:[
		// the control position x, y
		// then three point positions inside the control - so relative to the control position
		// 1. circle position x, y (usually the same as the control position - so 0,0)
		// 2. the location of the first control rectangle x and y
		// 3. the location of the second control rectangle x and y
		// then an optional specific type of control that overrides the controlType parameter (or the default type of "straight")
		[-100,-100,-100,100,100,-100,0,0,"mirror"], // this will be type "mirror"
		[100,-100,100,0,-50,0], // this will be type "free" because controlType parameter
		[100,100], // these will be type "none" because no dimensions (or dimensions 0) specified for controls
		[-100,100]
	]
}).centerReg(stage).drag();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
color - (default frame.green) the fill color as any CSS color including "rgba()" for alpha fill (set a to 0 for tranparent fill)
borderColor - (default null) the stroke color
borderWidth - (default 1 if stroke is set) the size of the stroke in pixels
points - (default 4) a number of points to start with around a circle OR an array of points as follows:
	NOTE: this format is different than the points property which is related but holds the actual point objects as opposed to x and y positions used in the parameter:
	[[controlX, controlY, circleX, circleY, rect1X, rect1Y, rect2X, rect2Y, controlType], [etc]]
	controlX and controlY - the x and y location of the control Container which holds the point circle and the two control rectangles
		can access a control at an index by using blob.points[index][0]
		animating the controlX and controlY will move the circle and rectangles together
	rect1X, rect1Y, rect2X, rect2Y - (default 0) the x and y location of the control rectangles relative to the control location
		can access a rectangle at an index by using blob.points[index][2] or blob.points[index][3]
		animating a rectangle will move the rectangle independently of the circle and other control rectangle
	circleX and circleY - (default 0) the x and y location of the circle relative to the control location (usually 0, 0)
		can access a circle at an index by using blob.points[index][1]
		animating the circle will move the circle independently of the control rectangles
	controlType - (default main controlType parameter or "straight" if not controlType parameter) the point's controlType "none", "mirror", "straight" or "free"
radius - (default 100) the default radius of the circle used to create the blob (also specifies the blob's bounds(-radius, -radius, radius*2, radius*2))
controlLength - |ZIM VEE| (default radius*numPoints/4) specify a Number to override the calculated default
	or pass in a ZIM VEE value and zik will assign a random option for each controlLength of the blob
controlType - (default "straight") one of four String values as follows:
	none - there are no control rectangles (they are actually set at 0,0).  This makes a corner at the circle point.
	mirror - the control rectangles reflect one another about the point circle - lengths are kept even
	straight - the control rectangles keep a straight line through the point circle but length is independent
	free - the control rectangle moves independently from the other control rectangle
	** The controlType can be specified for each point - see the points parameter
	** The controlType can be changed by doubleClicking the point circle to cycle through the controls in the order above - unless the lockControlType is set to true
lockControlType - (default false) set to true to disable doubleClicking of point circles to change controlType
showControls - (default true) set to false to start with controls not showing - can change this after with control property or showControls() method
lockControls - (default false) set to true to lock the editing of controls - can't move the points or handles - but can see them if showControls is set to true
dblclick - (default false) set true to let double click toggle between showing and hiding controls and also drag the blob when controls not showing
dblclickDrag - (default true) set to false to disable dragging when dblClick is true.  Dragging when controls are showing can be done but requires a proxy drag object
ctrlclick - (default false) set to true to let ctrl click copy the Blob with its current shape (adds to same holder container - use holder.getChildAt(holder.numChildren-1) to access)
dashed - (default false) set to true for dashed border (if borderWidth or borderColor set)

METHODS
record(popup) - returns an array with the same format as the points parameter (see parameter docs)
	popup - (default false) set to true to open a zim Pane with the points in a zim TextArea (click off to close)
	NOTE: the TextArea output uses JSON.stringify() - to add the points to the points parameter of the Blob use JSON.parse(output);
	NOTE: using zog(JSON.stringify(blob.record()))... the console will remove the quotes from the controlTypes so those would have to be manually put back in before parse() will work
changeControl(index, type, rect1X, rect1Y, rect2X, rect2Y, circleX, circleY) - change a control type and properties at an index
	accepts ZIM DUO normal parameters or configuration object literal with parameter names as propterties
	passing in null as the index will change all points to the specified properties
update() - update the Blob if animating control points, etc. would do this in a Ticker
showControls() - shows the controls (and returns blob) - or use blob.controls = true property
hideControls() - hides the controls (and returns blob) - or use blob.controls = false property
clone() - makes a copy of the shape
dispose() - remove event listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
shape - gives access to the shape of the blob
color - get and set the fill color
borderColor - get and set the stroke color
borderWidth - get and set the stroke size in pixels
points - get or set array of control point data with the following format:
	NOTE: this format is different than the points parameter which is related but holds the x and y positions rather than the actual point objects found in the points property:
	[[set, rect1, rect2, circle, controlType], [etc.]]
	set - the container for the control that holds the circle and rectangles set
	rect1 - the first control point rectangle
	rect2 - the second control point rectangle
	circle - the control point circle
	NOTE: set, rect1, rect2 and circle can be positioned or animated
	NOTE: the update() method must be called if manually changing the controls - do this in a zim.Ticker.add(function(){blob.update();})
	controlType - get or set the control type: default is "straight" (or null) and there is also "mirror", "free" and "none"
	and the controlType can be dynamically set (also double clicking the circle changes the control point)
sets - access to the container that holds the sets
sticks - access to the container that holds the control sticks
types - get or set the array for the types ["mirror", "straight", "free", "none"]
controls - Boolean to get or set the visibility of the controls (or use showControls() and hideControls() methods)
lockControls - Boolean to lock controls from being adjusted or not
dblclick - Boolean to get or set bouble clicking to show and hide controls and drag when controls are hidden
dblclickDrag - Boolean to drag or not drag Blob if controls are hidden and dblclick is true
lockControlType - Boolean to lock the type of the controls in their current state or not
ctrlclick - Boolean to let users ctrl click the Blob to duplicate it (clone) or not
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
dispatches a change event for when the bezier controls are adjusted (pressup only)
	if monitoring constant change is needed add a pressmove event to Blob.sets
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+53.5
	zim.Blob = function(color, borderColor, borderWidth, points, radius, controlLength, controlType, lockControlType, showControls, lockControls, dblclick, dblclickDrag, ctrlclick, dashed) {

		var sig = "color, borderColor, borderWidth, points, radius, controlLength, controlType, lockControlType, showControls, lockControls, dblclick, dblclickDrag, ctrlclick, dashed";
		var duo; if (duo = zob(zim.Blob, arguments, sig, this)) return duo;

		z_d("53.5");
		if (zot(radius)) radius = 100;
		this.zimContainer_constructor(-radius,-radius,radius*2,radius*2);
		this.type = "Blob";

		if (zot(dashed)) dashed = false;
		if (!zot(borderColor) && zot(borderWidth)) {
			borderWidth = 1;
		} else if (!zot(borderWidth) && zot(borderColor)) {
			borderColor = "black";
		}
		if (zot(color)) color = borderWidth>0?"rgba(0,0,0,0)":frame.green;
		if (zot(points)) points = 4;
		var num = typeof points == "number" ? points : points.length;

		if (zot(controlLength)) controlLength = radius * 4 / num;
		if (zot(controlType)) controlType = "straight";
		if (zot(lockControlType)) lockControlType = false;
		if (zot(showControls)) showControls = true;
		if (zot(lockControls)) lockControls = false;
		if (zot(dblclick)) dblclick = false;
		if (zot(dblclickDrag)) dblclickDrag = true;
		if (zot(ctrlclick)) ctrlclick = false;
		this.dblclick = dblclick;
		this.dblclickDrag = dblclickDrag;
		this.lockControlType = lockControlType;
		this.ctrlclick = ctrlclick;

		var that = this;

		var types = this.types = ["mirror", "straight", "free", "none"];

		var _points;
		var _color = color;
		var _borderColor = borderColor;
		var _borderWidth = borderWidth;
		var colorObj;
		var borderColorObj;
		var borderWidthObj;
		var borderDashedObj;

		var balls;

		init()
		function init() {

			num = typeof points == "number" ? points : points.length;
			if (num <= 0) return;
			controlLength = radius * 4 / num;

			var shape = that.shape = new zim.Shape().addTo(that);
			var sticks = that.sticks = new zim.Shape().addTo(that);
			var g = shape.graphics;
			g.c();
			var s = sticks.graphics;
			s.c();

			var ballS = 8;
			var rectS = 10;

			var sets = that.sets = new zim.Container().addTo(that).drag(); // sets - a set contains a ball and two rects
			_points = [];
			balls = [];

			var angle, point, temp, set, rect1, rect2, ball, type, setData;

			for (var i=0; i<num; i++) {
				set = new zim.Container().addTo(sets);
				if (typeof points == "number") { // no sets yet

					// easier to create controls in a temp vertical Container
					// set the registration point at the circle center
					// then rotate the temp container
					// then get the resulting rotated coordinates and use localToLocal
					// to find coordinates of controls in set Container
					// afterwards, adjust controls in set Container so origin and registration is at ball
					// then move the set Container so it matches that adjustment
					// (or could have calculated all positions to start with aTan2, sin, cos etc.)
					var length = zik(controlLength);
					temp = new zim.Container(length, radius).reg(length/2, radius).addTo(that);
					temp.rotation = i/num * 360;
					ball = new zim.Circle(ballS, frame.light, frame.dark, 2)
						.centerReg(temp)
						.pos(length/2,0);
					rect1 = new zim.Rectangle(rectS, rectS, getColor(controlType), frame.dark, 2)
						.centerReg(temp)
						.pos(0,0);
					rect2 = new zim.Rectangle(rectS, rectS, getColor(controlType), frame.dark, 2)
						.centerReg(temp)
						.pos(length,0);

					var ballPoint = temp.localToLocal(ball.x, ball.y, sets);
					ball.x = ballPoint.x;
					ball.y = ballPoint.y;
					ball.addTo(set);
					var rect1Point = temp.localToLocal(rect1.x, rect1.y, sets);
					rect1.x = controlType=="none"?0:rect1Point.x-ball.x;
					rect1.y = controlType=="none"?0:rect1Point.y-ball.y;
					rect1.addTo(set);
					var rect2Point = temp.localToLocal(rect2.x, rect2.y, sets);
					rect2.x = controlType=="none"?0:rect2Point.x-ball.x;
					rect2.y = controlType=="none"?0:rect2Point.y-ball.y;
					rect2.addTo(set);
					set.pos(ball.x, ball.y);
					ball.x = 0;
					ball.y = 0;
					if (controlType=="none") ball.addTo(set); // on top

				} else { // passing in set data

					// balls are relative to blob but handles are relative to ball
					// points is an array of [[setX, setY, ballX, ballY, handleX, handleY, handle2X, handle2Y, type], etc.]

					setData = points[i];
					type = setData[8] ? setData[8] : controlType;
					set = new zim.Container().addTo(sets).pos(setData[0], setData[1]);
					ball = new zim.Circle(ballS, frame.light, frame.dark, 2)
						.centerReg(set)
						.pos(setData[6],setData[7]);
					rect1 = new zim.Rectangle(rectS, rectS, getColor(type), frame.dark, 2)
						.centerReg(set, 0)
						.pos(setData[2],setData[3]);
					rect2 = new zim.Rectangle(rectS, rectS, getColor(type), frame.dark, 2)
						.centerReg(set, 0)
						.pos(setData[4],setData[5]);
				}

				balls.push(ball);
				ball.set = set;
				ball.rect1 = rect1;
				ball.rect2 = rect2;
				ball.index = i;
				ball.on("dblclick", function(e) {
					if (that.lockControlType) return;
					var ball = e.target;
					// cycle through the types
					var type = _points[ball.index][4] ? _points[ball.index][4] : controlType;
					if (Math.abs(ball.rect1.x) <= 2 && Math.abs(ball.rect1.y) <= 2 && Math.abs(ball.rect2.x) <= 2 && Math.abs(ball.rect2.y) <= 2) {
						type = "none"
					}
					if (type == "none") {
						ball.parent.addChildAt(ball, 0);
					}
					// modulus going backwards needs to add the length so it does not go negative
					type = that.types[(that.types.indexOf(type)+(frame.shiftKey?-1:1)+that.types.length)%that.types.length];
					if (type == "none") {
						ball.rect1.x =  ball.rect1.y =  ball.rect2.x =  ball.rect2.y = 0;
						ball.parent.addChild(ball);
					}
					_points[ball.index][4] = type;
					ball.rect1.color = getColor(type);
					ball.rect2.color = getColor(type);
					drawShape();
					ball.stage.update();
				});

				rect1.ball = ball;
				rect1.other = rect2;
				rect2.ball = ball;
				rect2.other = rect1;

				if (zim.mobile()) {
					ball.expand();
					rect1.expand();
					rect2.expand();
				}

				point = [set, rect1, rect2, ball, setData?setData[8]:controlType];
				_points.push(point);
			}

			function getColor(type) {
				var colors = {mirror:frame.purple, free:frame.yellow, none:frame.blue};
				return colors[type] ? colors[type] : frame.pink;
			}

			function drawShape() {
				g.c();
				colorObj = g.f(_color).command;
				// border of 0 or a string value still draws a border in CreateJS
				if (zot(_borderWidth) || _borderWidth > 0) { // no border specified or a border > 0
					if (!zot(_borderColor) || !zot(_borderWidth)) { // either a border color or thickness
						if (zot(_borderColor)) _borderColor = "black";
						borderColorObj = g.s(_borderColor).command;
						borderWidthObj = g.ss(_borderWidth).command;
						if (dashed) borderDashedObj = g.sd([10, 10], 5).command;
					}
				}
				var set = _points[0][0];
				var ballPoint = set.localToLocal(_points[0][3].x, _points[0][3].y, shape);
				g.mt(ballPoint.x, ballPoint.y);

				s.c().s(frame.darker).ss(1)

				var currentIndex; var nextIndex;
				for (var i=0; i<_points.length; i++) {
					var currentIndex = i;
					var nextIndex = (i+1)%_points.length;

					var set = _points[currentIndex][0];
					var ball = _points[currentIndex][3];
					var control1 = _points[currentIndex][1];
					var control2 = _points[currentIndex][2];

					var nextSet = _points[nextIndex][0];
					var nextBall = _points[nextIndex][3];
					var nextControl1 = _points[nextIndex][1];
					var nextControl2 = _points[nextIndex][2];

					var control2Point = set.localToLocal(control2.x, control2.y, shape);
					var nextControl1Point = nextSet.localToLocal(nextControl1.x, nextControl1.y, shape);
					var nextBallPoint = nextSet.localToLocal(nextBall.x, nextBall.y, shape);

					g.bt(
						control2Point.x, control2Point.y,
						nextControl1Point.x, nextControl1Point.y,
						nextBallPoint.x, nextBallPoint.y
					);

					// create the sticks
					var ballPoint = set.localToLocal(ball.x, ball.y, shape);
					var control1Point = set.localToLocal(control1.x, control1.y, shape);

					s.mt(ballPoint.x, ballPoint.y).lt(control1Point.x, control1Point.y);
					s.mt(ballPoint.x, ballPoint.y).lt(control2Point.x, control2Point.y);
				}
			}
			drawShape();

			sets.on("mousedown", function(e) {
				if (that.lockControls) return;
				if (e.target.rect1) { // then mousedown on ball
					var ball = e.target;
					ball.startX = ball.x;
					ball.startY = ball.y;
					ball.rect1.startX = ball.rect1.x;
					ball.rect1.startY = ball.rect1.y;
					ball.rect2.startX = ball.rect2.x;
					ball.rect2.startY = ball.rect2.y;
				} else { // mousedown on control
					var rect = e.target;
					var ball = rect.ball;
					var index = ball.index;
					var type = controlType;
					if (!zot(_points[index][4])) type = _points[index][4];
					if (type == "straight") {
						var other = rect.other;
						var dX = other.x - ball.x;
						var dY = other.y - ball.y;
						other.stickLength = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
					}
				}
			});

			sets.on("pressmove", function(e) {
				if (that.lockControls) return;
				if (e.target.rect1) { // pressmove on ball
					var ball = e.target;
					var diffX = ball.x - ball.startX;
					var diffY = ball.y - ball.startY;
					ball.rect1.x = ball.rect1.startX + diffX;
					ball.rect1.y = ball.rect1.startY + diffY;
					ball.rect2.x = ball.rect2.startX + diffX;
					ball.rect2.y = ball.rect2.startY + diffY;
				} else { // pressmove on control
					var rect = e.target;
					var other = rect.other; // the other handle
					var ball = rect.ball;
					var index = ball.index;
					var type = controlType;
					if (!zot(_points[index][4])) type = _points[index][4];
					if (type == "straight" || type == "mirror") {
						var dX = rect.x - ball.x;
						var dY = rect.y - ball.y;
						if (type == "mirror") {
							other.x = ball.x - dX;
							other.y = ball.y - dY;
						} else {
							var a = Math.atan2(dY, dX);
							var dNewX = -other.stickLength * Math.cos(a+Math.PI);
							var dNewY = -other.stickLength * Math.sin(a+Math.PI);
							other.x = ball.x - dNewX;
							other.y = ball.y - dNewY;
						}
					}
				}
				drawShape();
			});

			sets.on("pressup", function(e) {
				if (that.lockControls) return;
				if (e.target.rect1) { // pressup on ball
					// move ball back to origin and move set accordingly
					// so if we animate the set it will behave as expected
					var ball = e.target;
					var set = ball.set;
					var rect1 = ball.rect1;
					var rect2 = ball.rect2;
					rect1.x -= ball.x;
					rect1.y -= ball.y;
					rect2.x -= ball.x;
					rect2.y -= ball.y;
					set.x += ball.x;
					set.y += ball.y;
					ball.x = 0;
					ball.y = 0;
				}
				that.dispatchEvent("change");
			});

			that.changeControl = function(index, type, rect1X, rect1Y, rect2X, rect2Y, circleX, circleY) {
				var sig = "index, type, rect1X, rect1Y, rect2X, rect2Y, circleX, circleY";
				var duo; if (duo = zob(that.changeControl, arguments, sig)) return duo;
				if (zot(index)) {
					for (var i=0; i<_points.length; i++) {
						that.changeControl(i, type, rect1X, rect1Y, rect2X, rect2Y, circleX, circleY);
					}
					return;
				}
				var point = _points[index];
				point[4] = type;
				if (type == "none") {
					if (!zot(circleX)) point[3].x = circleX;
					if (!zot(circleY)) point[3].y = circleY;
					point[1].pos(point[3].x, point[3].y);
					point[2].pos(point[3].x, point[3].y);
					point[3].parent.addChild(point[3]);
				} else {
					if (!zot(rect1X)) point[1].x = rect1X;
					if (!zot(rect1Y)) point[1].y = rect1Y;
					if (!zot(rect2X)) point[2].x = rect2X;
					if (!zot(rect2Y)) point[2].y = rect2Y;
					if (!zot(circleX)) point[3].x = circleX;
					if (!zot(circleY)) point[3].y = circleY;
					point[3].parent.addChildAt(point[3], 0);
				}
				if (that.stage) that.stage.update();
			}

			that.update = function() {
				drawShape();
				return that;
			}

			shape.on("dblclick", function() {
				if (!that.dblclick) return;
				that.controls = !that.controls;
				if (that.dblclickDrag) {
					if (that.controls) {
						that.noDrag();
					} else {
						that.drag({currentTarget:true});
					}
				}
			});
			that.controls = showControls;
			if (that.dblclick && that.dblclickDrag && !that.controls) {
				that.drag({currentTarget:true});
			}

			that.on("click", function() {
				if (!that.ctrlclick) return;
				if (zimDefaultFrame.ctrlKey) {
					that.clone().addTo(that.stage.stage).mov(100);
					that.stage.stage.update();
				}
			});

			that.hideControls = function() {
				sets.visible = false;
				sticks.visible = false;
				_controls = false;
				if (that.stage) that.stage.update();
				return that;
			}
			if (!showControls) that.hideControls();
			that.showControls = function() {
				sets.visible = true;
				sticks.visible = true;
				_controls = true;
				sets.pos(shape.x, shape.y);
				sticks.pos(shape.x, shape.y);
				that.addChildAt(shape,0); // put to bottom incase dragged
				if (that.stage) that.stage.update();
				return that;
			}

			that.record = function(popup) {
				// balls are relative to blob but handles are relative to ball
				// points is an array of [[ballX, ballY, handleX, handleY, handle2X, handle2Y, type], etc.]
				if (zot(popup)) popup = false;
				var points = [];
				var point; var p;
				for (var i=0; i<_points.length; i++) {
					p = _points[i];
					point = [
						zim.decimals(p[0].x),
						zim.decimals(p[0].y),
						zim.decimals(p[1].x),
						zim.decimals(p[1].y),
						zim.decimals(p[2].x),
						zim.decimals(p[2].y),
						zim.decimals(p[3].x),
						zim.decimals(p[3].y)
					];
					if (p[4] && p[4]!=="straight") point.push(p[4])
					points.push(point);
				}
				if (popup) {
					if (!pane) {
						var pane = new zim.Pane({
							container:that.stage,
							width:500,
							height:500,
							drag:true
						});
						var textArea = new zim.TextArea(frame, 400, 400);
						textArea.centerReg(pane);
					}
					textArea.text = JSON.stringify(points);
					pane.show();
				}
				return points;
			}

			that.clone = function() {
				return that.cloneProps(new zim.Blob(that.color, that.borderColor, that.borderWidth, that.record(), radius, controlLength, controlType, lockControlType, sets.visible, lockControls, that.dblclick, that.dblclickDrag, that.ctrlclick, dashed));
			}
		} // end of init()

		var _controls = showControls;
		Object.defineProperty(that, 'controls', {
			get: function() {
				return _controls;
			},
			set: function(value) {
				_controls = value;
				if (value) {
					that.showControls();
				} else {
					that.hideControls();
				}
			}
		});
		var _lockControls = lockControls;
		Object.defineProperty(that, 'lockControls', {
			get: function() {
				return _lockControls;
			},
			set: function(value) {
				_lockControls = value;
				if (value) {
					that.sets.mouseChildren = false;
					that.sets.mouseEnabled = false;
				} else {
					that.sets.mouseChildren = true;
					that.sets.mouseEnabled = true;
				}
			}
		});
		that.lockControls = _lockControls;

		Object.defineProperty(that, 'color', {
			get: function() {
				return _color;
			},
			set: function(value) {
				if (zot(value)) value = "black";
				_color = value;
				colorObj.style = _color;
			}
		});
		Object.defineProperty(that, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(value) {
				_borderColor = value;
				if (!borderColorObj) drawShape();
				else borderColorObj.style = _borderColor;
			}
		});
		Object.defineProperty(that, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(value) {
				if (!(value>0)) value = 0;
				_borderWidth = value;
				if (!borderWidthObj || _borderWidth == 0) drawShape();
				else {
					borderWidthObj.width = _borderWidth;
					if (dashed) {
						borderDashedObj.segments = [20, 10];
						borderDashedObj.offset = 5;
					}
				}
			}
		});

		Object.defineProperty(that, 'points', {
			get: function() {
				return _points;
			},
			set: function(value) {
				that.dispose();
				points = value;

				if (that.shape) {
					that.shape.graphics.clear();
					that.sticks.graphics.clear();
					that.sets.noDrag();
					that.removeAllChildren();
					delete that.shape;
					delete that.sticks;
					delete that.sets;
				}
				init(); // remake Blob
				that.lockControls = _lockControls;
 			}
		});

		this.dispose = function() {
			if (!that.shape) return;
			for (var i=0; i<that.points.length; i++) {
				that.points[i][1].removeAllEventListeners();
			}
			for (i=0; i<balls.length; i++) {
				balls[i].removeAllEventListeners();
			}
			that.shape.removeAllEventListeners();
			that.sets.removeAllEventListeners();
			that.removeAllEventListeners();
			return
		}
	}
	zim.extend(zim.Blob, zim.Container, "clone", "zimContainer", false);
	//-53.5

/*--
zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions, backing, outlineColor, outlineWidth)

Label
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a label - wraps the createjs Text object.
Can use with Button, CheckBox, RadioButtons and Pane.
Text seems to come in different sizes so we do our best.
Have tended to find that left and alphabetic are most consistent across browsers.
Custom fonts loaded through css can be used as well.
NOTE: can wrap text at given width using lineWidth parameter.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var label = new zim.Label("Hello");
label.center(stage); // adds label to and centers on the stage

var label = new zim.Label({
	text:"CLICK",
	size:100,
	font:"courier",
	color:"white",
	rollColor:"red",
	fontOptions:"italic bold"
});
stage.addChild(label);
label.x = label.y = 100;
label.on("click", function(){zog("clicking");});
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
text - String for the the text of the label
size - (default 36) the size of the font in pixels
font - (default arial) the font or list of fonts for the text
color - (default "black") color of font (any CSS color)
rollColor - (default color) the rollover color of the font
shadowColor - (default -1) for no shadow - set to any css color to see
shadowBlur - (default 14) if shadow is present
align - ((default "left") text registration point alignment also "center" and "right"
valign - (default "top") vertical registration point alignment alse "middle / center", "bottom"
lineWidth - (default false) for no wrapping (use \n) Can set to number for wrap
lineHeight - (default getMeasuredLineHeight) set to number to adjust line height
fontOptions - (default null) css VALUES as a single string for font-style font-variant font-weight
	eg. "italic bold small-caps" or just "italic", etc.
backing - (default null) a Display object for the backing of the label (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
outlineColor - (default null - or black if outlineWidth set) - the color of the outline of the text
outlineWidth - (default null - or (size*.2) if outlineColor set) - the thickness of the outline of the text

METHODS
showRollColor(boolean) - true to show roll color (used internally)
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
label - references the text object of the label
color - gets or sets the label text color
rollColor - gets or sets the label rollover color
text - references the text property of the text object
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
backing - access to backing object
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+54
	zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions, backing, outlineColor, outlineWidth) {

		var sig = "text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions, backing, outlineColor, outlineWidth";
		var duo; if (duo = zob(zim.Label, arguments, sig, this)) return duo;
		z_d("54");
		this.zimContainer_constructor();
		this.type = "Label";

		if (zot(text)) text="LABEL";
		if (text === "") text = " ";
		if (zot(size)) size=36;
		if (zot(font)) font="arial";
		if (zot(color)) color="black";
		if (zot(rollColor)) rollColor=color;
		if (zot(shadowColor)) shadowColor=-1;
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(align)) align="left";
		if (zot(valign)) valign="top";
		if (zot(fontOptions)) fontOptions="";
		if (!zot(outlineColor) && zot(outlineWidth)) outlineWidth = Math.round(size*.2);
		if (!zot(outlineWidth) && zot(outlineColor)) outlineColor = "#000000";
		if (zot(outlineWidth)) outlineWidth = 0;

		var that = this;
		this.mouseChildren = false;

		var obj = this.label = new createjs.Text(String(text), fontOptions + " " + size + "px " + font, color);
		obj.textAlign = align;
		obj.lineWidth = lineWidth;
		obj.lineHeight = lineHeight;
		obj.textBaseline = "alphabetic";
		if (outlineWidth > 0) {
			var obj2 = this.outlineLabel = obj.clone();
			obj2.color = outlineColor;
			obj2.outline = outlineWidth;
			this.addChild(obj2);
		}
		if (shadowColor != -1 && shadowBlur > 0) obj.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		this.addChild(obj);

		function setSize() {
			var b = obj.getBounds();
			var yAdjust;
			if (valign == "top") {
				obj.y = size-size/6;
				if (obj2) obj2.y = size-size/6;
				yAdjust = 0;
			} else if (valign == "center" || valign == "middle") {
				yAdjust = - b.height / 2;
				obj.y = size*.3;
				if (obj2) obj2.y = size*.3;
			} else { // bottom align
				yAdjust = -b.height;
			}
			if (backing) {
				var bb = backing.getBounds();
				that.setBounds(bb.x, bb.y, bb.width, bb.height);
			} else {
				that.setBounds(b.x, yAdjust, b.width, b.height);
				hitArea.graphics.c().f("black").r(that.getBounds().x, that.getBounds().y, that.getBounds().width, that.getBounds().height);
			}
			zim.center(obj, that);
			obj.y += size/32; // backing often on capital letters without descenders - was /16
			if (obj2) {
				zim.center(obj2, that, 0);
				obj2.y += size/32;
			}
		}
		if (zot(backing)) {
			var hitArea = new createjs.Shape();
			that.hitArea = hitArea;
		}
		setSize();

		if (!zot(backing)) {
			this.backing = backing;
		 	zim.center(backing, this, 0);
		}

		Object.defineProperty(that, 'text', {
			get: function() {
				var t = (obj.text == " ") ? "" : obj.text;
				return t;
			},
			set: function(value) {
				if (zot(value) || value === "") {value = " ";}
				obj.text = String(value);
				if (obj2) obj2.text = String(value);
				setSize();
			}
		});

		Object.defineProperty(that, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				if (rollColor == color) rollColor = value;
				color = value;
				obj.color = color;
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(that, 'outlineColor', {
			get: function() {
				return outlineColor;
			},
			set: function(value) {
				outlineColor = value;
				if (obj2) obj2.color = outlineColor;
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(that, 'rollColor', {
			get: function() {
				return rollColor;
			},
			set: function(value) {
				rollColor = value;
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
				obj.color = color;
				that.mouseChildren = false;
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		this.showRollColor = function(yes) {
			if (zot(yes)) yes = true;
			if (yes) {
				obj.color = rollColor;
			} else {
				obj.color = color;
			}
			if (that.stage) that.stage.update();
		}

		this.on("mouseover", function(e) {that.showRollColor();});
		this.on("mouseout", function(e) {that.showRollColor(false);});

		this.clone = function() {
			return that.cloneProps(new zim.Label(that.text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions,
				!zot(backing)?backing.clone():null, outlineColor, outlineWidth));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Label, zim.Container, "clone", "zimContainer");
	//-54

/*--
zim.Button = function(width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed)

Button
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a button with rollover and many more features - see parameters.
You will need to pass in a zim.Label to change the font properties of the button from the default.
You will then need to add the button to the stage and add a mousedown or click event.
Button rollover is done automatically.

You can set a backing display object (Shape, Bitmap, etc.) in place of the standard rectangle.
You can set an icon display object in place of the standard text
You can set the Button to toggle between text, backings or icons
SEE the ZIM Pizzazz series for a growing selection of backings and icons
http://zimjs.com/code/bits/view/pizzazz.html
http://zimjs.com/code/bits/view/icons.html


NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var button = new zim.Button("CLICK");
button.center(stage);
button.on("click", function(){zog("clicking");});

// OR add custom label (needed to change label color for instance)
var label = new zim.Label({
	text:"POWER OPTION",
	size:40,
	color:"violet",
	fontOptions:"bold"
});
var button = new zim.Button({
	label:label,
	width:390,
	height:110,
	color:"purple",
	rollColor:"MediumOrchid",
	borderWidth:8,
	borderColor:"violet",
	gradient:.3,
	corner:0
});
button.center(stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 200) the width of the button
height - (default 60) the height of the button
label - (default "CLICK") ZIM Label or plain text with default settings (white)
color - (default "orange") backing color of button (any CSS color)
rollColor - (default "lightorange") rollover color of button
borderColor - (default null) the color of the border
borderWidth - (default null) thickness of the border
corner - (default 20) the round of the corner (set to 0 for no corner)
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 14) how blurred the shadow is if the shadow is set
hitPadding - (default 0) adds extra hit area to the button (good for mobile)
gradient - (default 0) 0 to 1 (try .3) adds a gradient to the button
gloss - (default 0) 0 to 1 (try .1) adds a gloss to the button
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)
backing - (default null) a Display object for the backing of the button (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Button Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
	http://zimjs.com/code/bits/view/pizzazz.html
rollBacking - (default null) a Display object for the backing of the rolled-on button
rollPersist - (default false) set to true to keep rollover state when button is pressed even if rolling off
icon - (default false) set to display object to add icon at the center of the button and remove label
	http://zimjs.com/code/bits/view/icons.html
rollIcon - (default false) set to display object to show icon on rollover
toggle - (default null) set to string to toggle with label or display object to toggle with icon or if no icon, the backing
rollToggle - (default null) set to display object to toggle with rollIcon or rollBacking if no icon
	there is no rollToggle for a label - that is handled by rollColor on the label
toggleEvent - (default mousedown for mobile and click for not mobile) what event causes the toggle
dashed - (default false) set to true to turn the border to dashed - if the borderColor or borderWidth is provided

METHODS
setBackings(newBacking, newRollBacking) - dynamically set backing and rollBacking on button (both default to null and if empty, removes backings)
setIcons(newIcon, newRollIcon) - dynamically set icon and rollIcon on button (both default to null and if empty, removes icons)
toggle(state) - forces a toggle of label if toggle param is string, else toggles icon if icon is set or otherwise toggles backing
	state defaults to null so just toggles
	pass in true to go to the toggled state and false to go to the original state
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing of the button
rollBacking - references the rollBacking (if set)
icon - references the icon of the button (if set)
rollIcon - references the rollIcon (if set)
toggleObj - references the toggle object (string or display object if set)
rollToggle - references the rollToggle (if set)
toggled - true if button is in toggled state, false if button is in original state
enabled - default is true - set to false to disable
rollPersist - default is false - set to true to keep rollover state when button is pressed even if rolling off
color - get or set non-rolled on backing color (if no backing specified)
rollColor - get or set rolled on backing color
focus - get or set the focus property of the Button used for tabOrder
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
for example seeing toggle take effect

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+55
	zim.Button = function(width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed) {

		var sig = "width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed";
		var duo; if (duo = zob(zim.Button, arguments, sig, this)) return duo;
		z_d("55");
		this.zimContainer_constructor();
		this.type = "Button";

		if (zot(width)) width=200;
		if (zot(height)) height=60;
		if (zot(color)) color="#C60";
		if (zot(rollColor)) rollColor="#F93";
		if (zot(borderColor)) borderColor=null;
		if (zot(borderWidth)) borderWidth=null;
		if (zot(corner)) corner=20;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(hitPadding)) hitPadding=0;
		if (zot(gradient)) gradient = 0;
		if (zot(gloss)) gloss = 0;
		if (zot(flatBottom)) flatBottom = false;
		if (zot(label)) {if (zot(icon)) {label = "PRESS";} else {label = "";}}
		if (!zot(toggle) && zot(toggleEvent)) toggleEvent = zim.mobile()?"mousedown":"click";
		// text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 36, "arial", "white", null, null, null, "center", "middle");
		if (zot(rollPersist)) rollPersist = false;
		this.rollPersist = rollPersist;
		if (zot(dashed)) dashed = false;

		var that = this;
		this.mouseChildren = false;
		this.cursor = "pointer";
		that.focus = false;

		var buttonBacking;
		if (zot(backing)) {
			buttonBacking = new zim.Rectangle(width,height,color,borderColor,borderWidth,corner,flatBottom,dashed);
		} else {
			buttonBacking = backing;
			buttonBacking.x = width / 2;
			buttonBacking.y = height / 2;
			if (!zot(rollBacking)) {
				rollBacking.x =  width / 2;
				rollBacking.y = height / 2;
				this.rollBacking = rollBacking;
			}
		}
		this.addChild(buttonBacking);
		this.backing = buttonBacking;

		if (!zot(icon)) {
			this.addChild(icon);
			icon.x = width/2;
			icon.y = height/2;
			this.icon = icon;
		}
		if (!zot(rollIcon)) {
			this.rollIcon = rollIcon;
			rollIcon.x = width/2;
			rollIcon.y = height/2;
		}

		var corner2 = (flatBottom) ? 0 : corner;

		if (gradient > 0 && zot(backing)) { // add an overlay
			var gr = new createjs.Shape();
			gr.graphics.lf(["rgba(255,255,255,"+gradient+")","rgba(0,0,0,"+gradient+")"], [0, 1], 0, 0, 0, height-borderWidth);
			gr.graphics.rc(borderWidth/2, borderWidth/2, width-borderWidth, height-borderWidth, corner, corner, corner2, corner2);
			buttonBacking.addChild(gr);
		}

		if (gloss > 0 && zot(backing)) { // add an overlay
			var gl = new createjs.Shape();
			gl.graphics.f("rgba(255,255,255,"+gloss+")");
			gl.graphics.rc(borderWidth/2, borderWidth/2, width-borderWidth, (height-borderWidth)/2, corner, corner, 0, 0);
			gl.graphics.f("rgba(0,0,0,"+gloss+")");
			gl.graphics.rc(borderWidth/2, height/2, width-borderWidth, (height-borderWidth)/2, 0, 0, corner2, corner2);
			buttonBacking.addChild(gl);
		}

		if (hitPadding > 0) {
			var rect = new createjs.Shape();
			rect.graphics.f("#000").r(-hitPadding,-hitPadding,width+hitPadding*2,height+hitPadding*2);
			this.hitArea = rect;
		}

		if (shadowColor != -1 && shadowBlur > 0) {
			buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			if (!zot(rollBacking)) rollBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		}
		this.setBounds(0,0,width,height);
		this.addChild(label);
		label.center(this);
		label.y+=1;
		this.label = label;

		var pressCheck = false;
		this.on("mousedown", function(){pressCheck=true;});
		this.on("pressup", function(){
			pressCheck=false;
			if (that.rollPersist && !rollCheck) removeRoll();
		});

		var rollCheck = false;
		this.on("mouseover", buttonOn);
		function buttonOn(e) {
			rollCheck = true;
			if (zot(backing)) {
				buttonBacking.color = rollColor;
			} else if (!zot(rollBacking)) {
				if (zot(icon)) {
					if (that.toggled) {
						that.removeChild(toggle);
						that.addChildAt(rollToggle, 0);
					} else {
						that.removeChild(backing);
						that.addChildAt(rollBacking, 0);
					}
				} else {
					that.removeChild(backing);
					that.addChildAt(rollBacking, 0);
				}
			}
			if (!zot(rollIcon)) {
				if (that.toggled) {
					that.removeChild(toggle);
					that.addChild(rollToggle);
				} else {
					that.removeChild(icon);
					that.addChild(rollIcon);
				}
			}
			that.label.showRollColor();
			if (that.stage) that.stage.update();
		}

		this.on("mouseout", buttonOff); // thanks Maxime Riehl
		function buttonOff(e) {
			rollCheck = false;
			that.off("mouseout", buttonOff);
			if (that.rollPersist) {
				if (!pressCheck) removeRoll();
			} else {
				removeRoll();
			}
		}
		function removeRoll() {
			if (zot(backing)) {
				buttonBacking.color = color;
			} else if (!zot(rollBacking)) {
				if (zot(icon)) {
					if (that.toggled) {
						that.removeChild(rollToggle);
						that.addChildAt(toggle, 0);
					} else {
						that.removeChild(rollBacking);
						that.addChildAt(backing, 0);
					}
				} else {
					that.removeChild(rollBacking);
					that.addChildAt(backing, 0);
				}
			}
			if (!zot(rollIcon)) {
				if (that.toggled) {
					that.removeChild(rollToggle);
					that.addChild(toggle);
				} else {
					that.removeChild(rollIcon);
					that.addChild(icon);
				}
			}
			that.label.showRollColor(false);
			if (that.stage) that.stage.update();
		}

		this.toggled = false;
		this.toggleObj = toggle;
		this.rollToggle = rollToggle;
		var toggleFunction;
		var originalText = label.text;
		if (!zot(toggle)) {
			toggleFunction = this.on(toggleEvent, function() {
				that.toggled = !that.toggled;
				setToggled(that.toggled);
			});
		}

		function setToggled() {
			if (typeof toggle == "string") { // change label text
				that.text = that.toggled?toggle:originalText;
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			} else if (!zot(icon)) { // change icons
				that.setIcons(that.toggled?toggle:icon, that.toggled?rollToggle:rollIcon);
			} else { // change backings
				that.setBackings(that.toggled?toggle:backing, that.toggled?rollToggle:rollBacking);
			}
		}

		Object.defineProperty(that, 'text', {
			get: function() {
				var t = (label.text == " ") ? "" : label.text;
				return t;
			},
			set: function(value) {
				label.text = value;
				label.center(this);
				label.y+=1;
			}
		});

		Object.defineProperty(that, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				color = value;
				if (buttonBacking.color) {
					buttonBacking.color = color;
				} else {
					if (zon) zog("zim.Button - backing has no color property");
				}
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(that, 'rollColor', {
			get: function() {
				return rollColor;
			},
			set: function(value) {
				rollColor = value;
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
				that.mouseChildren = false;
				label.color = label.color;
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		// setBackings does not swap newBacking for newRollBacking but rather
		// the old backing and rollBacking for these new ones - same with setIcons below
		// used internally by toggle but can also be used to dynamically change backings and icons
		// or if parameters left blank to remove backings and icons
		this.setBackings = function(newBacking, newRollBacking) {
			swapObjects("backing", "rollBacking", newBacking, newRollBacking, 0);
		}
		this.setIcons = function(newIcon, newRollIcon) {
			swapObjects("icon", "rollIcon", newIcon, newRollIcon, that.numChildren-1);
		}
		function swapObjects(objName, objRollName, obj, roll, index) {
			if (that.contains(that[objName])) {
				that.removeChild(that[objName]);
				that.addChildAt(obj, index);
			} else if (that.contains(that[objRollName])) {
				that.removeChild(that[objRollName]);
				that.addChildAt(roll, index);
			}
			that[objName] = obj; // be careful - this is assignment
			that[objRollName] = roll;
			if (that[objName]) {
				that[objName].x = width/2;
				that[objName].y = height/2;
			}
			if (that[objRollName]) {
				that[objRollName].x = width/2;
				that[objRollName].y = height/2;
			}
			if (!zim.OPTIMIZE && that.stage) that.stage.update();
		}

		this.toggle = function(state) {
			if (zot(state)) {
				that.toggled = !that.toggled;
			} else {
				that.toggled = state;
			}
			setToggled();
		}

		this.clone = function() {
			var but = new zim.Button(
				width, height, label.clone(), color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom,
				!zot(backing)?backing.clone():null,
				!zot(rollBacking)?rollBacking.clone():null,
				rollPersist,
				!zot(icon)?icon.clone():null, !zot(rollIcon)?rollIcon.clone():null,
				!zot(toggle)?(typeof toggle == "string"?toggle:toggle.clone()):null,
				!zot(rollToggle)?rollToggle.clone():null,
				toggleEvent, dashed

			);
			return that.cloneProps(but);
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			that.removeChild(buttonBacking);
			that.removeChild(rollBacking);
			that.removeChild(icon);
			that.removeChild(that.label);
			if (that.label) that.label.dispose();
			buttonBacking = null;
			rollBacking = null;
			icon = null;
			that.label = null;
			return true;
		}
	}
	zim.extend(zim.Button, zim.Container, "clone", "zimContainer", false);
	//-55

/*--
zim.CheckBox = function(size, label, startChecked, color, margin, indicatorType)

CheckBox
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A checkbox that when pressed toggles the check and a checked property.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var checkBox = new zim.CheckBox(50, "TEST");
checkBox.center(stage);
checkBox.on("change", function() {
	zog(checkBox.checked); // will be true then false, etc.
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
size - (default 60) size in pixels (always square)
label - (default null) ZIM Label object - or String to make a default label (black)
startChecked - (default false) an initial parameter to set checked if true
color - (default "#111") the stroke and text color - background is set to a .5 alpha white
margin - (default 10) is on outside of box so clicking or pressing is easier
indicatorType - (default check) could be square (box) or x

METHODS
setChecked(Boolean) - defaults to true to set button checked (or use checked property)
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
checked - gets or sets the check of the box
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
label - gives access to the label
text - the text of the label
check - gives access to the check mark ie. check.color = "blue";
color - gets or sets the color of the check
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed on but not when the checked property is set

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+56
	zim.CheckBox = function(size, label, startChecked, color, margin, indicatorType) {

		var sig = "size, label, startChecked, color, margin, indicatorType";
		var duo; if (duo = zob(zim.CheckBox, arguments, sig, this)) return duo;
		z_d("56");
		this.zimContainer_constructor();
		this.type = "CheckBox";

		if (zot(size)) size = 60;
		if (zot(label)) label = null;
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, size*5/6, "arial", color);
		var myChecked = (zot(startChecked)) ? false : startChecked;
		if (zot(color)) color = "#111";
		if (zot(margin)) margin = 10; //20;
		if (indicatorType != "box" && indicatorType != "square" && indicatorType != "x") indicatorType = "check";

		this.setBounds(-margin, -margin, size+margin*2, size+margin*2);

		var that = this;
		this.cursor = "pointer";

		var box = new createjs.Shape();
		var g = box.graphics;
		g.f("rgba(255,255,255,.5)").r(0,0,size,size);
		g.s(color).ss(size/10).r(size/7, size/7, size-size/7*2, size-size/7*2);
		this.addChild(box);

		var fullWidth = size;

		if (label) {
			this.addChild(label);
			label.x = size*1.3 + margin; //this.getBounds().width;
			label.y = size/8;
			this.label = label;
			this.setBounds(-margin, -margin, size+margin*3+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
			fullWidth = label.x + label.width;
		}

		var backing = new createjs.Shape();
		g = backing.graphics;
		g.f("rgba(0,0,0,.01)").r(
			this.getBounds().x,
			this.getBounds().y,
			fullWidth+(margin*2),
			this.getBounds().height
		);
		this.hitArea = backing;
		// hitArea will stop rollovers on labels but oh well

		var check = new createjs.Shape();
		var g2 = check.graphics;
		var checkColor = "#000";
		if (indicatorType == "check") {
			g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg"); // width about 90 reg in middle
		} else if (indicatorType == "box" || indicatorType == "square") {
			g2.f(checkColor).dr(-35,-35,70,70);
		} else { // x
			g2.f(checkColor).p("AmJEVIEUkTIkXkWIB4h5IEWEYIETkTIB4B3IkTESIEQERIh4B4IkRkRIkSEVg"); // width about 90 reg in middle
		}

		var cW = 95
		check.setBounds(-cW/2, -cW/2, cW, cW);
		var scale = size/(cW+66);

		check.scaleX = check.scaleY = scale;
		check.alpha = .9;
		check.x = size/2;
		check.y = size/2;

		if (myChecked) this.addChild(check);
		this.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", toggleCheck);

		Object.defineProperty(that, 'checked', {
			get: function() {
				return myChecked;
			},
			set: function(value) {
				that.setChecked(value);
			}
		});

		Object.defineProperty(that, 'text', {
			get: function() {
				if (label) return label.text;
			},
			set: function(value) {
				if (label) {
					label.text = value;
					if (!zim.OPTIMIZE && that.stage) that.stage.update();
				};
			}
		});

		Object.defineProperty(check, 'color', {
			get: function() {
				return checkColor;
			},
			set: function(value) {
				if (myChecked) {that.removeChild(check);}
				check = new createjs.Shape();
				g2 = check.graphics;
				checkColor = value;
				g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg");
				check.scaleX = check.scaleY = scale;
				check.alpha = .9;
				check.x = size/2;
				check.y = size/2;
				if (myChecked) that.addChild(check);
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(that, 'check', {
			get: function() {
				return check;
			},
			set: function(value) {
				zog("ZIM CheckBox - check is read only");
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
			}
		});

		function toggleCheck(e) {
			myChecked = !myChecked;
			that.setChecked(myChecked);
			that.dispatchEvent("change");
		}

		this.setChecked = function(value) {
			if (zot(value)) value = true;
			myChecked = value;
			if (myChecked) {
				that.addChild(check);
			} else {
				that.removeChild(check);
			}
			if (!zim.OPTIMIZE && that.stage) that.stage.update();
		}

		this.clone = function() {
			return that.cloneProps(new zim.CheckBox(size, label.clone(), startChecked, color, margin, indicatorType));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.CheckBox, zim.Container, "clone", "zimContainer", false);
	//-56

/*--
zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always)

RadioButtons
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A radio button set that lets you pick from choices.
Radio buttons can display radio buttons vertically (default) or horizontally.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var radioButtons = new zim.RadioButtons(50, ["ONE", "TWO", "THREE"]);
radioButtons.center(stage);
radioButtons.on("change", function() {
	zog(radioButtons.text); // will be ONE, TWO or THREE
	zog(radioButtons.selectedIndex); // will be 0, 1, or 2
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
size - (default 60) in pixels
buttons - an array of button data objects as follows:
	[{label:ZIM Label or text, id:optional id, selected:optional Boolean}, {etc...}]
	or just a list of labels for default labels ["hi", "bye", "what!"]
vertical - (default true) displays radio buttons vertically - set to false to display horizontally
color - (default "#111") the stroke and font color - background is set to a .5 alpha white
spacing - (size*.2 for vertical and size for horizontal) the space between radio button objects
margin - (size/5) the space around the radio button itself
always - (default false) if set true, cannot click on selection to unselect it

METHODS
setSelected(num) - sets the selected index (or use selectedIndex) -1 is default (none)
clone() - makes a copy with properties such as x, y, etc. also copied

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
selected - gets the selected object - selected.label, selected.id, etc.
selectedIndex - gets or sets the selected index of the buttons
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
label - current selected label object
text - current selected label text
id - current selected id
buttons - an array of button Container objects holding the shape and label (note - different than buttons parameter)
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
dots - an array of the zim Shape dot objects. dots[0].color = "yellow";
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed but not when selectedIndex is set
then ask for the properties above for info

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+57
	zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always) {

		var sig = "size, buttons, vertical, color, spacing, margin, always";
		var duo; if (duo = zob(zim.RadioButtons, arguments, sig, this)) return duo;
		z_d("57");
		this.zimContainer_constructor();
		this.type = "RadioButtons";

		if (zot(size)) size = 60;
		size = Math.max(5, size);
		if (zot(buttons)) buttons = ["A", "B", "C"];
		if (zot(vertical)) vertical = true;
		if (zot(color)) color = "#111";
		if (zot(spacing)) spacing = (vertical) ? size*.2 : size;
		if (zot(margin)) margin =  size/5;

		var that = this;
		this.cursor = "pointer";
		this.labels = [];
		this.dots = [];
		var currentObject; // reference to the current data object
		if (typeof buttons == "string") {
			// convert to buttons object literal (for cloning)
			var bString = buttons;
			buttons = [];
			for (var i=0; i<bString.length; i++) {
				buttons.push({label:bString[i]});
			}
		}

		var buttonContainer = new zim.Container();
		this.addChild(buttonContainer);

		function pressBut(e) {
			var index = buttonContainer.getChildIndex(e.target);
			if (always) {if (that.selectedIndex == index) return;}
			that.setSelected(index);
			that.dispatchEvent("change");
		}

		// loop through data and call makeButton() each time
		makeButtons();

		var currentK;
		for (var k=0; k<buttonContainer.numChildren; k++) {
			currentK = buttonContainer.getChildAt(k);
			currentK.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", pressBut);
		}

		var lastBut;
		function makeButtons() {
			// test for duplicate selected true properties (leave last selected)
			var data; var selectedCheck = false;
			for (var i=buttons.length-1; i>=0; i--) {
				data = buttons[i];
				if (data.selected && data.selected === true) {
					if (!selectedCheck) {
						selectedCheck = true; // first item marked selected
						that.id = data.id;
					} else {
						data.selected = "false"; // turn off selected
					}
				}
			}
			buttonContainer.removeAllChildren();
			that.buttons = [];
			var but; var currentLocation = 0;
			for (var i=0; i<buttons.length; i++) {
				data = buttons[i];

				if (typeof data === "string" || typeof data === "number") {
					var d = {selected:false, label:new zim.Label(data, size*5/6, "arial", color)};
					data = d;
				}
				if (data.label && typeof data.label === "string" || typeof data.label === "number") {
					data.label = new zim.Label(data.label, size*5/6, "arial", color);
				}
				that.labels.push(data.label);
				data.index = i;
				buttons[i] = data; // for cloning
				but = makeButton(data.selected, data.label);
				but.type = "RadioButton"; // singular
				but.obj = data;
				if (data.selected) currentObject = but.obj;

				buttonContainer.addChild(but);

				if (vertical) {
					but.y = currentLocation;
					currentLocation += but.getBounds().height + spacing;
				} else {
					but.x = currentLocation;
					currentLocation += but.getBounds().width + spacing;
				}
			}
		}

		// making a single button - similar to CheckBox class
		function makeButton(mySelected, label) {
			var but = new zim.Container();
			that.buttons.push(but);
			but.mouseChildren = false;
			but.setBounds(-margin, -margin, size+margin*2, size+margin*2);

			var box = new createjs.Shape();
			var g = box.graphics;
			g.f("rgba(255,255,255,.5)").dc(size/2,size/2,size/1.85);
			g.s(color).ss(size/9).dc(size/2, size/2, size/2-size/2/5);
			but.addChild(box);

			var check = but.check = new zim.Circle(size/5.2, "rgba(0,0,0,.7)");
			that.dots.push(check);
			check.mouseEnabled = false;
			check.alpha = .95;
			check.regX = check.regY = -size/2;

			var fullWidth = size;

			if (label) {
				but.addChild(label);
				label.x = but.getBounds().width;
				label.y = size/8;
				but.setBounds(-margin, -margin, size+margin*2+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
				fullWidth = label.x + label.width;
				but.text = label.text;
			}
			if (mySelected) {
				but.addChild(check);
				that.label = label;
				if (that.label) that.text = label.text;
			}

			var backing = new createjs.Shape();
			g = backing.graphics;
			g.f("rgba(0,0,0,.01)").r(
				but.getBounds().x,
				but.getBounds().y,
				fullWidth+(margin*2),
				but.getBounds().height
			);
			but.hitArea = backing;
			// hitArea will stop rollovers on labels but oh well

			return(but);
		}
		if (!this.getBounds()) this.setBounds(0,0,size,size);
		this.setBounds(-margin,-margin,this.getBounds().width+margin,this.getBounds().height+margin);

		// the main function that sets a button selected (after the initial makeButton)
		// this gets called by the setter methods below and the click event up top
		this.setSelected = function(value) {
			if (zot(value)) value = -1;
			if (value != -1 && !buttonContainer.getChildAt(value)) return;
			var but;
			for (var i=0; i<buttonContainer.numChildren; i++) {
				but = buttonContainer.getChildAt(i);
				but.removeChild(but.check);
			}
			if (value >= 0) {
				but = buttonContainer.getChildAt(value);
				var lastIndex = -2;
				if (currentObject) lastIndex = currentObject.index;
				currentObject = but.obj;
			}
			if (value == -1 || lastIndex == currentObject.index) {
				currentObject = null;
				that.id = null;
				that.label = null;
				that.text = "";
			} else {
				but.addChild(but.check);
				that.id = currentObject.id;
				that.label = currentObject.label;
				if (that.label) that.text = that.label.text;
			}
			if (!zim.OPTIMIZE && that.stage) that.stage.update();
		}

		// getter setter methods

		Object.defineProperty(that, 'selected', {
			get: function() {
				return currentObject;
			},
			set: function(value) {
				zog("ZIM RadioButton - selected is read only");
			}
		});

		Object.defineProperty(that, 'selectedIndex', {
			get: function() {
				return (currentObject) ? currentObject.index : -1;
			},
			set: function(value) {
				var index = value;
				if (always) {if (that.selectedIndex == index) return;}
				that.setSelected(index);
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
			}
		});

		this.clone = function() {
			var buttonsCopy = zim.copy(buttons);
			for (var i=0; i<buttonsCopy.length; i++) {
				buttonsCopy[i].label = buttonsCopy[i].label.clone();
			}
			return that.cloneProps(new zim.RadioButtons(size, buttonsCopy, vertical, color, spacing, margin, always));
		}

		this.dispose = function() {
			var currentK;
			for (var k=0; k<buttonContainer.numChildren; k++) {
				currentK = buttonContainer.getChildAt(k);
				currentK.removeAllEventListeners();
			}
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.RadioButtons, zim.Container, "clone", "zimContainer", false);
	//-57

/*--
zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, backing, fadeTime)

Pane
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a window for alerts, etc.
You need to call the pane.show() to show the pane and pane.hide() to hide it.
You do not need to add it to the stage - it adds itself centered.
You can change the x and y (the origin and registration point are in the middle).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var pane = new zim.Pane(stage, 300, 200, "Watch out!", "#CCC");
pane.show(); // pressing anywhere will close pane (see parameters for options)
END EXAMPLE

EXAMPLE
var pane = new zim.Pane({width:600, height:250, modal:false, displayClose:false});
var cancel = new zim.Button(220, 100, "CANCEL", "red").center(pane).mov(-130);
var confirm = new zim.Button(220, 100, "CONFIRM", "green").center(pane).mov(130);
cancel.on("click", function() {pane.hide();});
confirm.on("click", function() {zgo("http://zimjs.com")});
pane.show(); // pressing anywhere will close pane (see parameters for options)
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - (default - the default stage) container for the pane
width - (default 200) width of pane
height - (default 200) height of pane
label - (default null) an optional ZIM Label (or text for default label properties)
color - (default "white") a css color for the background of the Pane
drag - (default false) pass in true to drag the pane
resets - (default true) resets position to start on re-open - set to false to keep last position
modal - (default true) pane will close when user clicks off the pane - set to false to keep pane open
corner - (default 20) is the corner radius - set to 0 for no corner
backingAlpha - (default .14) the darkness of the background that fills the stage
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 20) how blurred the shadow is if shadow is set
center - (default true) centers the pane
	if center is false you will have to set x and y for the pane
	the registration point and the origin inside the pane is in the center
	you can adjust the label placement by changing its x and y or registration point
displayClose - (default true) closes the Pane if display backing is pressed
	if drag is set to true, displayClose will automatically be set to false
backing - (default null) a Display object for the backing of the pane (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
fadeTime - (default 0) milliseconds to fade in and out

METHODS
show() - shows the pane (returns the pane for chaining)
hide() - hides the pane
toggle() - shows if hidden and hides if showing (returns the pane for chaining)
clone() - makes a copy with properties such as x, y, etc. also copied (returns the new pane for chaining)
dispose() - removes all events

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
display - reference to the pane box
text - gives access to the label text
label - gives access to the label
backdrop - reference to the backdrop that covers the stage
resetX - if reset is true you can dynamically adjust the position if needed
resetY
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "close" event when closed by clicking on backing

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+58
		zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, backing, fadeTime) {

		var sig = "container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, backing, fadeTime";
		var duo; if (duo = zob(zim.Pane, arguments, sig, this)) return duo;
		z_d("58");
		this.zimContainer_constructor();
		this.type = "Pane";

		var mess = "zim display - Pane(): Please pass in a reference to a container with bounds set as first parameter";
		if (zot(container)) {
			if (zimDefaultFrame) {
				container = zimDefaultFrame.stage;
			} else {
				zog(mess);
				return;
			}
		} else if (!container.getBounds) {
			zog(mess);
			return;
		} else if (zot(container.getStage)) {
			zog("zim display - Pane(): The container must have a stage property");
			return;
		}

		if (zot(width)) width=200;
		if (zot(height)) height=200;
		if (zot(label)) label = null;
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 40, "arial", "black");
		if (zot(color)) color="white";
		if (zot(drag)) drag=false;
		if (zot(resets)) resets=true;
		if (zot(modal)) modal=true;
		if (zot(corner)) corner=20;
		if (zot(backingAlpha)) backingAlpha=.14;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=20;
		if (zot(center)) center=true;
		if (zot(displayClose)) displayClose=true;
		if (drag) displayClose = false;
		if (zot(fadeTime)) fadeTime=0;

		var backdrop = this.backdrop = new createjs.Shape();
		// make a big backing that closes the pane when clicked
		// could also provide a close button
		var g = backdrop.graphics;
		g.f("black");
		g.drawRect(-5000,-5000,10000,10000);
		// makes it seem like the pane has the dimensions of the display
		this.setBounds(-width/2,-height/2, width, height);

		backdrop.alpha = backingAlpha;
		var that = this;
		backdrop.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", closePane);
		var htmlList = new zim.Dictionary(true);
		function closePane(e) {
			removePane();
			container.stage.update();
			that.dispatchEvent("close");
			e.stopImmediatePropagation();
		};
		backdrop.on("mousedown", function(e) {
			e.stopImmediatePropagation();
		});
		if (modal) this.addChild(backdrop);

		var display;
		if (zot(backing)) {
			display = this.display = new createjs.Shape();
			g = display.graphics;
			g.f(color);
			g.rr(0, 0, width, height, corner);
			display.setBounds(0, 0, width, height);
			display.regX = width/2;
			display.regY = height/2;
		} else {
			display = backing;
		}
		if (displayClose) {
			display.cursor = "pointer";
			display.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", closePane);
		}
		if (shadowColor != -1 && shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);
		display.on("click", function(e) {
			// stops the click from going through the display to the background
			e.stopImmediatePropagation();
		});

		this.resetX; this.resetY;
		if (drag) {
			display.cursor = "pointer";
			var diffX, diffY;
			display.on("mousedown", function(e) {
				if (isNaN(that.resetX)) that.resetX = that.x;
				if (isNaN(that.resetY)) that.resetY = that.y;
				diffX = e.stageX - that.x;
				diffY = e.stageY - that.y;
				display.cursor = "pointer";
			});

			display.on("pressmove", function(e) {
				var p = checkBounds(e.stageX-diffX, e.stageY-diffY);
				that.x = p.x;
				that.y = p.y;
				var ch;
				for (var i=0; i<that.numChildren; i++) {
					ch = that.getChildAt(i);
					if (ch.constructor == zim.TextArea || ch.constructor == zim.Loader) {
						ch.resize();
					}
				}
				container.stage.update();
			});

			this.on("pressup", function(e) {
				display.cursor = "pointer";
				container.stage.update();
			});
		}

		this.addChild(display);

		if (label) {
			this.addChild(label);
			zim.center(label, this);
			this.label = label;
			this.text = label.text;
			label.mouseEnabled = false;
		}

		Object.defineProperty(that, 'text', {
			get: function() {
				var t = (label.text == " ") ? "" : label.text;
				return t;
			},
			set: function(value) {
				label.text = value;
			}
		});

		this.hide = function() {
			removePane();
		}

		function removePane() {
			if (fadeTime > 0) {
				that.animate({obj:{alpha:0}, time:fadeTime, call:end});
			} else {
				end();
			}
			function end() {
				container.removeChild(that);
				var ch;
				for (var i=0; i<that.numChildren; i++) {
					ch = that.getChildAt(i);
					if (ch.constructor == zim.TextArea || ch.constructor == zim.Loader) {
						var obj = {obj:ch, depth:that.getChildIndex(ch)};
						htmlList.add(ch, obj);
						that.removeChild(ch);
					}
				}
				if (!zim.OPTIMIZE) container.stage.update();
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}

				if (that.zimAccessibility) {
					var a = that.zimAccessibility;
					a.resize(that);
					if (accessibilityClicker) accessibilityClicker.focus();
					else that.zimTabTag.nextSibling.focus();
					setTimeout(function() {a.talk("Pane has been closed.");}, 50);
				}
			}
		}

		var accessibilityClicker;
		this.show = function() {
			if (center) {
				if (isNaN(that.resetX)) {
					that.x = (container.getBounds().width) /2;
					that.y = (container.getBounds().height) /2;
				}
			}
			container.addChild(that);
			for (var i=0; i<htmlList.length; i++) {
				that.addChildAt(htmlList.objects[i].obj, htmlList.objects[i].depth);
			}
			if (fadeTime > 0) {
				that.alpha = 0;
				that.animate({alpha:1}, fadeTime);
			} else {
				if (container.stage) container.stage.update();
			}
			if (that.zimAccessibility) {
				var a = that.zimAccessibility;
				setTimeout(function(){if (a.activatedObject) accessibilityClicker = a.activatedObject.zimTabTag;}, 50);
				a.resize(that);
				a.tabIndex = that.zimTabIndex;
			}
			return that;
		}
		function checkBounds(x,y) {
			x = Math.max(width/2, Math.min(container.getBounds().width-width/2, x));
			y = Math.max(height/2, Math.min(container.getBounds().height-height/2, y));
			return {x:x,y:y}
		}

		this.toggle = function() {
			if (container.contains(that)) {that.hide();} else {that.show();}
			return that;
		}

		this.clone = function() {
			var lX = label.x; // new Panes automatically center the label
			var lY = label.y;
			var p2 = that.cloneProps(new zim.Pane(container, width, height, label.clone(), color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose, zot(backing)?backing.clone():null, fadeTime));
			p2.label.x = lX;
			p2.label.y = lY;
			return p2;
		}

		this.dispose = function() {
			display.removeAllEventListeners();
			that.removeChild(display);
			display = null;
			return true;
		}
	}
	zim.extend(zim.Pane, zim.Container, "clone", "zimContainer", false);
	//-58

/*--
zim.Window = function(width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical, scrollWheel, damp)

Window
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a window for content that can be swiped and scrolled.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var win = new zim.Window({
	height:300,
	interactive:false,
	padding:0,
	slideDamp:.2
});
var container = new zim.Container(); // make some content
var c; spacing = 10;
for (var i=0; i<4; i++) {
	c = frame.makeCircles();
	c.x = win.width/2;
	c.y = c.width/2 + (c.width+spacing)*i;
	container.addChild(c);
}
win.add(container); // add the content to the window
win.center(stage);
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 300) the width of the window
height - (default 200) the heigth of window
color - (default #333) background color (use "rbga(0,0,0,0)" for no background)
borderColor - (default #999) border color
borderWidth - (default 1) the thickness of the border
padding - (default 10) places the content in from edges of border (see paddingHorizontal and paddingVertical)
corner - (default 0) is the rounded corner of the window
swipe - (default auto/true) the direction for swiping set to none / false for no swiping
	also can set swipe to just vertical or horizontal
indicatorActive - (default true) shows indicator (set to false to not)
indicatorDrag - (default false) set to true to be able to drag the indicator
indicatorColor - (default borderColor) the color of the indicator
indicatorAlpha - (default .3) the transparency of the indicator
indicatorFade - (default true) fades indicator unless being used
slide - (default true) Boolean to throw the content when drag/swipe released
slideDamp - (default .6) amount the slide damps when let go 1 for instant, .01 for long slide, etc.
slideSnap - (default "vertical") "auto" / true, "none" / false, "horizontal"
	slides past bounds and then snaps back to bounds when released
	vertical snaps when dragging up and down but not if dragging horizontal
interactive - (default true) allows interaction with content in window
	set to false and whole window will be swipeable but not interactive inside
shadowColor - (default rgba(0,0,0,.3)) the color of the shadow
shadowBlur - (default 20) set shadowBlur to -1 for no drop shadow
paddingHorizontal - (default padding) places content in from top bottom
paddingVertical - (default padding) places content in from left and right
scrollWheel - (default true) scroll vertically with scrollWheel
damp - (default null) set to .1 for instance to damp the scrolling

METHODS
add(obj) - adds obj to content container of window (at padding) must have bounds set
	it is best to position and size obj first before adding
	otherwise if adjusting to outside current content size then call update()
resize(width, height) - resizes the Window without scaling the content (also calls update() for scroll update)
	width and height are optional
update() - resets window scrolling if perhaps the content gets bigger or smaller
clone(recursive) - makes a copy with properties such as x, y, etc. also copied
	recursive (default true) clones the window content as well (set to false to not clone content)
dispose() - removes event listeners from Window and content and removes any Ticker functions

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
** see also the resize(width, height) method to resize the window without resizing the content
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
backing - CreateJS Shape used for backing of Window
content - ZIM Container used to hold added content
indicator - data object that holds the following properties (with defaults):
	you can set after object is made...
	indicator.size = 6; // the width if vertical or the height if horizontal
	indicator.minSize = 12; // for the height if vertical or the width if horizontal
	indicator.spacing = 3 + size + borderWidth / 2;
	indicator.margin = 0; // adds extra space only at end by scrollbars
	indicator.corner = indicator.size / 2;
	indicator.showTime = 500; // ms to fade in
	indicator.fadeTime = 3000; // ms to fade out
scrollX - gets and sets the content x position in the window (this will be negative)
scrollY - gets and sets the content y position in the window (this will be negative)
scrollXMax - gets the max we can scroll in x based on content width - window width (plus padding and margin)
scrollYMax - gets the max we can scroll in y based on content height - window height (plus padding and margin)
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
dispatches a "select" event when clicked on in a traditional manner (fast click with little movement)
dispatches a "hoverover" event when rolled on without moving for 300 ms
dispatches a "hoverout" event when not hovering due to movement or mouseout on the window

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+58.1
	zim.Window = function(width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical, scrollWheel, damp) {

		var sig = "width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical, scrollWheel, damp";
		var duo; if (duo = zob(zim.Window, arguments, sig, this)) return duo;
		z_d("58.1");
		this.zimContainer_constructor();
		this.type = "Window";

		if (zot(width)) width=300;
		if (zot(height)) height=200;
		if (zot(color)) color="#333"; // none
		if (zot(borderColor)) borderColor="#999";
		if (zot(borderWidth)) borderWidth=1; // 0
		if (zot(padding)) padding=10;
		if (zot(corner)) corner=0;
		if (zot(swipe)) swipe=true; // true / auto, vertical, horizontal, false / none
		if (zot(indicatorActive)) indicatorActive=true;
		if (zot(indicatorDrag)) indicatorDrag=false;
		if (zot(indicatorColor)) indicatorColor=borderColor;
		if (zot(indicatorAlpha)) indicatorAlpha=.3;
		if (zot(indicatorFade)) indicatorFade=true;
		if (indicatorDrag) indicatorFade = false;
		if (zot(slide)) slide=true;
		if (zot(slideDamp)) slideDamp=.6;
		if (zot(slideSnap)) slideSnap="vertical"; // true / auto, vertical, horizontal, false / none
		if (zot(interactive)) interactive=true;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=20;
		if (zot(paddingVertical)) paddingVertical=padding;
		if (zot(paddingHorizontal)) paddingHorizontal=padding;
		if (zot(scrollWheel)) scrollWheel = true;

		var that = this;
		this.scrollX = this.scrollY = this.scrollXMax = this.scrollYMax = 0;

		var backing = this.backing = new createjs.Shape();
		this.addChild(backing);

		var mask = new createjs.Shape();
		var mg = mask.graphics;
		// make the mask in the update function
		// when we know if there are vertical and horizontal indicators
		this.addChild(mask);

		var content = this.content = new zim.Container();
		this.addChild(content);
		content.mask = mask;

		if (!interactive) {
			// hitArea makes the whole window draggable
			// but then you can't interact with the content inside the window
			var hitArea = new createjs.Shape();
		}
		if (borderWidth > 0) {
			var border = new createjs.Shape();
			this.addChild(border);
		}

		// we call this function at start and when resize() is called to resize the window without scaling content
		function sizeWindow() {

			that.setBounds(0,0,width,height);

			backing.graphics.f(color).rr(0,0,width,height,corner);
			if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);

			if (borderWidth > 0) {
				border.graphics.c().s(borderColor).ss(borderWidth).rr(0,0,width,height,corner);
			}
		}
		sizeWindow();


		// indicators are the little scroll bars
		// this exposes an indicator data object so creators can adjust indicator properties
		// note that these properties are set dynamically in the update function
		var indicator = this.indicator = {}; // data object to expose indicator properties
		indicator.size = 6;
		indicator.minSize = indicator.size*2; // if vertical scroll, this is vertical minSize where size is horizontal size
		indicator.spacing = 3.5 + borderWidth / 2;
		indicator.margin = 0;
		indicator.corner = indicator.size / 2;
		indicator.showTime = 500;
		indicator.fadeTime = 3000;

		if (indicatorActive) {
			var hIndicator = this.hIndicator = new zim.Shape();
			var hg = hIndicator.graphics;
			hIndicator.alpha = indicatorAlpha;
			this.addChild(hIndicator);
			if (indicatorDrag) hIndicator.drag({localBounds: true});

			var vIndicator = this.vIndicator = new zim.Shape();
			var vg = vIndicator.graphics;
			vIndicator.alpha = indicatorAlpha;
			this.addChild(vIndicator);
			if (indicatorDrag) vIndicator.drag({localBounds: true});
		}

		var hProportion;
		var vProportion;
		var hCheck;
		var vCheck;
		var gap;
		var contentWidth;
		var contentHeight;

		var hEvent;
		var vEvent;
		var dTimeout;

		this.update = function() {
			if (indicatorActive) {
				// clear the indicators and remake anytime this function is called
				// as these may change as people add and remove content to the Window
				hg.clear(); // horizontal indicator
				vg.clear(); // vertical indicator
			}

			// assume no gap at left and top
			// gap is applied in x if there is a scroll in y
			// gap is applied in y if there is a scroll in x
			gap = (indicatorActive) ? indicator.size+indicator.spacing*2 : 0;
			contentWidth = content.getBounds().width;
			contentHeight = content.getBounds().height;

			// note, the contentWidth and contentHeight include ONE padding
			hCheck = (contentWidth > width-paddingHorizontal && (swipe === true || swipe == "auto" || swipe == "horizontal"));
			vCheck = (contentHeight > height-paddingVertical && (swipe === true || swipe == "auto" || swipe == "vertical"));

			that.scrollXMax = contentWidth+paddingHorizontal*2-width+(vCheck?gap+indicator.margin:0);
            that.scrollYMax = contentHeight+paddingVertical*2-height+(hCheck?gap+indicator.margin:0);

			// set mask dynamically as indicators may come and go affecting the mask size slightly
			mg.clear();
			var xx = borderWidth/2;
			var yy = borderWidth/2;
			var ww = width-((vCheck && indicatorActive)?indicator.size+indicator.spacing*2:0)-(vCheck?0:borderWidth);
			var hh = height-((hCheck && indicatorActive)?indicator.size+indicator.spacing*2:0)-(hCheck?0:borderWidth);
			mg.f("rgba(0,0,0,.01)").rr(xx,yy,ww,hh,corner);

			if (!interactive) {
				hitArea.graphics.c().f("red").dr(xx,yy,ww,hh);
				content.hitArea = hitArea;
			}

			var edgeAdjust = Math.max(corner, Math.min(indicator.corner, indicator.spacing));
			var edgeLeft = edgeAdjust + borderWidth/2;
			var edgeRight = edgeAdjust + (vCheck?gap:0) + borderWidth/2;
			var edgeTop = edgeAdjust + borderWidth/2;
			var edgeBottom = edgeAdjust + (hCheck?gap:0) + borderWidth/2;

			if (hCheck && indicatorActive) {
				indicatorLength = Math.max(indicator.minSize, (width-edgeLeft-edgeRight) * (width-edgeLeft-edgeRight) / (contentWidth + paddingHorizontal + indicator.margin));
				hg.f(indicatorColor).rr(0,0,indicatorLength,indicator.size,indicator.corner);
				hIndicator.x = edgeLeft;
				hIndicator.y = height-indicator.size-indicator.spacing;
				// for swiping window:
				hProportion = new zim.Proportion(-that.scrollXMax, 0, edgeLeft, width-indicatorLength-edgeRight, -1);
				if (indicatorDrag) {
					hIndicator.setBounds(0,0,indicatorLength,indicator.size);
					// drag rect for indicator
					var rect = new createjs.Rectangle(
						edgeLeft, hIndicator.y, width-indicatorLength-edgeLeft-edgeRight, 0
					);
					hIndicator.dragRect(rect);
					hIndicator.proportion = new zim.Proportion(
						rect.x, rect.x+rect.width, 0, -that.scrollXMax
					);
					hIndicator.off("pressmove", hEvent);
					hEvent = hIndicator.on("pressmove", function() {
						content.x = hIndicator.proportion.convert(hIndicator.x);
					});
				}
			}

			if (vCheck && indicatorActive) {
				indicatorLength = Math.max(indicator.minSize, (height-edgeTop-edgeBottom) * (height-edgeTop-edgeBottom) / (contentHeight + paddingVertical + indicator.margin));
				vg.f(indicatorColor).rr(0,0,indicator.size,indicatorLength,indicator.corner);
				vIndicator.x = width-indicator.size-indicator.spacing;
				vIndicator.y = edgeTop;
				// for swiping window:
				vProportion = new zim.Proportion(-that.scrollYMax, 0, edgeTop, height-indicatorLength-edgeBottom, -1);
				if (indicatorDrag) {
					vIndicator.setBounds(0,0,indicator.size,indicatorLength);
					// drag rect for indicator
					var rect = new createjs.Rectangle(
						vIndicator.x, edgeTop, 0, height-indicatorLength-edgeTop-edgeBottom
					);
					vIndicator.dragRect(rect);
					vIndicator.proportion = new zim.Proportion(
						rect.y, rect.y+rect.height, 0, -that.scrollYMax
					);
					vIndicator.off("pressmove", vEvent);
					vEvent = vIndicator.on("pressmove", function() {
						desiredY = content.y = vIndicator.proportion.convert(vIndicator.y);
					});
				}
			}
			moveIndicators();
			clearTimeout(dTimeout);
			dTimeout = setTimeout(function(){setDragRect();}, 300);
		}

		this.resize = function(w, h) {
			if (zot(w)) w = width;
			if (zot(h)) h = height;
			width = w;
			height = h;
			sizeWindow();
			that.update();
			desiredY = content.y;
			if (damp) dampY.immediate(desiredY);
		}

		// METHODS to add and remove content from Window
		this.add = function(c) {
			makeDamp(c);
			if (!c.getBounds()) {zog("SwipeBox.add() - please add content with bounds set"); return;}
			content.addChild(c);
			if (c.x == 0) c.x = paddingHorizontal;
			if (c.y == 0) c.y = paddingVertical;
			that.update();
		}

		this.remove = function(c) {
			content.removeChild(c);
			that.update();
		}

		function setDragRect() {
			zim.dragRect(content, new createjs.Rectangle(0, 0, hCheck?-that.scrollXMax:0, vCheck?-that.scrollYMax:0));
		}

		var swipeCheck = false;
		if (swipe) {
			content.on("mousedown", function() {
				if (!swipeCheck) zim.Ticker.add(swipeMoveIndicators, content.stage);
				swipeCheck = true;
				if (hCheck && indicatorActive) if (indicatorFade) zim.animate(hIndicator, {alpha:indicatorAlpha}, indicator.showTime);
				if (vCheck && indicatorActive) if (indicatorFade) zim.animate(vIndicator, {alpha:indicatorAlpha}, indicator.showTime);
			});
		}

		function swipeMoveIndicators() {
			// this is being called by the swipe which has its own damping
			// so we need to set the desiredY and then move the indicators
			// as the moveIndicators needs to run independently - so both types of damp can controll it
			desiredY = content.y;
			if (damp) dampY.immediate(desiredY);
			if (indicatorActive) moveIndicators();
		}

		function moveIndicators() {
			if (hitArea) {
				// move hitarea to display box
				hitArea.x = -content.x;
				hitArea.y = -content.y;
			}
			if (hCheck && indicatorActive) hIndicator.x = hProportion.convert(content.x);
			if (vCheck && indicatorActive) vIndicator.y = vProportion.convert(content.y);
		}

		// may add content before adding Window to stage...
		this.on("added", setDrag, null, true);
		function setDrag() {
			makeDamp(that);
			if (!swipe) return;
			zim.drag({
				obj:content,
				currentTarget:true,
				localBounds:true,
				slide:slide, slideDamp:slideDamp,
				slideSnap:(swipe===true||swipe=="auto"||swipe=="vertical")?slideSnap:false
			});
			if (content.getBounds() && content.getBounds().width > 0) {
				setTimeout(function(){setDragRect();}, 300);
			}
		}

		if (slide) {
			content.on("slidestop", stageUp);
		} else {
			content.on("mousedown", function() {
				content.stage.on("stagemouseup", stageUp, null, true);
			});
		}

		function stageUp(e) {
			zim.Ticker.remove(swipeMoveIndicators);
			swipeCheck = false;
			if (hCheck) if (indicatorFade) zim.animate(hIndicator, {alpha:0}, indicator.fadeTime);
			if (vCheck) if (indicatorFade) zim.animate(vIndicator, {alpha:0}, indicator.fadeTime);
		}

		if (interactive) {
			// dispatches SELECT (click) and HOVEROVER (500 ms) and gives mouseX and mouseY on content
			// CLICKS (in the traditional sense rather than a mouseup replacement)
			var downLoc;
			var downTime;
			content.on("mousedown", function(){downLoc=content.stage.mouseX; downTime=Date.now();});
			content.on("click", function(){
				if (Date.now()-downTime<600 && Math.abs(content.stage.mouseX-downLoc)<5) {
					that.contentMouse = content.globalToLocal(content.stage.mouseX, content.stage.mouseY);
					that.dispatchEvent("select");
				}
			});
			// HOVER (must stay within thresh pixels for pauseTime ms)
			content.on("mouseover", moveOn);
			content.on("mouseout", moveOff);
			var startTime;
			function moveOn() {
				startTime=Date.now();
				zim.Ticker.add(timeMouse, content.stage);
			}
			function moveOff() {
				if (!hoverOutCalled) {
					that.dispatchEvent("hoverout");
					hoverOutCalled = true;
				}
				zim.Ticker.remove(timeMouse);
			}
			var lastMouseX = 0;
			var lastMouseY = 0;
			var lastReportX = 0;
			var lastReportY = 0;
			var pauseTime = 300;
			var thresh = 2;
			var hoverOutCalled = false;
			function timeMouse() {
				if (!content.stage) {
					if (!hoverOutCalled) {
						that.dispatchEvent("hoverout");
						hoverOutCalled = true;
					}
					zim.Ticker.remove(timeMouse);
					return;
				}
				if (Math.abs(lastMouseX-content.stage.mouseX) > thresh || Math.abs(lastMouseY-content.stage.mouseY) > thresh) {
					if (!hoverOutCalled) {
						that.dispatchEvent("hoverout");
						hoverOutCalled = true;
					}
					startTime=Date.now();
					lastMouseX=content.stage.mouseX;
					lastMouseY=content.stage.mouseY;
				} else {
					if (Date.now()-startTime > pauseTime) {
						if (Math.abs(lastReportX-content.stage.mouseX) > thresh || Math.abs(lastReportY-content.stage.mouseY) > thresh) {
							that.contentMouse = content.globalToLocal(content.stage.mouseX, content.stage.mouseY);
							that.dispatchEvent("hoverover");
							lastReportX=content.stage.mouseX;
							lastReportY=content.stage.mouseY;
							hoverOutCalled = false;
						}
						startTime=Date.now();
					}
				}
			}
		}

		var scrollEvent1;
		var scrollEvent2;
		var desiredY = that.scrollY;
		if (scrollWheel) {
			scrollEvent1 = window.addEventListener("mousewheel", scrollWindow);
			scrollEvent2 = window.addEventListener("DOMMouseScroll", scrollWindow);
			function scrollWindow(e) {
				if (vCheck && that.stage && that.hitTestPoint(that.stage.mouseX, that.stage.mouseY)) {
					if (zot(e)) e = event;
					var delta = e.detail ? e.detail*(-19) : e.wheelDelta;
					desiredY += delta;
					desiredY = Math.max(-that.scrollYMax, Math.min(0, desiredY))
					if (!damp) {
						that.scrollY = desiredY;
						content.stage.update();
					}
				}
			}
		}
		var dampCheck = false;
		var dampY;
		function makeDamp(obj) {
			if (damp && !dampCheck && obj.stage) {
				dampCheck = true;
				dampY = new zim.Damp(that.scrollY, damp);
				zim.Ticker.add(function() {
					if (swipeCheck) return;
					if (!zot(desiredY)) that.scrollY = dampY.convert(desiredY);
				}, obj.stage);
			}
		}

		Object.defineProperty(that, 'scrollX', {
			get: function() {
				return content.x;
			},
			set: function(value) {
				content.x = value;
				moveIndicators();
			}
		});

		Object.defineProperty(that, 'scrollY', {
			get: function() {
				return content.y;
			},
			set: function(value) {
				content.y = value;
				moveIndicators();
			}
		});

		this.clone = function(recursive) {
			if (zot(recursive)) recursive = true;
			var w = that.cloneProps(new zim.Window(width, height, color, borderColor, borderWidth, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical));
			if (recursive) {
				that.content.cloneChildren(w.content);
				w.update();
			}
			return w;
		}

		this.dispose = function() {
			if (scrollWheel) {
				window.removeEventListener("mousewheel", scrollEvent1);
				window.removeEventListener("DOMMouseScroll", scrollEvent2);
			}
			that.removeAllEventListeners();
			hIndicator.off("pressmove", hEvent);
			vIndicator.off("pressmove", vEvent);
			content.removeAllEventListeners();
			zim.Ticker.remove(timeMouse);
			zim.Ticker.remove(swipeMoveIndicators);
			zim.noDrag(content);
			return true;
		}
	}
	zim.extend(zim.Window, zim.Container, "clone", "zimContainer", false);
	//-58.1

/*--
zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime)

Waiter
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a little animated three dot wait widget.
You need to call waiter.show() to show the waiter and waiter.hide() to hide it.
You do not need to add it to the stage - it adds itself centered.
You can change the x and y (with origin and registration point in middle).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var waiter = new zim.Waiter(stage);
waiter.show(); // show the waiter until assets load
frame.loadAssets("greeting.mp3");
frame.on("complete", function() {
	waiter.hide();
	frame.asset("greeting.mp3").play();
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - the container that holds the waiter (usually the stage)
speed - (default 600) cycle time in milliseconds
color - (default "orange") the backing color
circleColor - (default "white") the dot color
corner - (default 14) the corner radius of the waiter box
shadowColor - (defaults rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 14) the blur of the shadow if shadow is set
fadeTime - (default 0) milliseconds to fade in and out

METHODS
show() - shows the waiter (returns the waiter for chaining)
hide() - hides the waiter
clone() - makes a copy with properties such as x, y, etc. also copied (returns the new waiter for chaining)
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
display - reference to the waiter backing graphic
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+59
	zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime) {

		var sig = "container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime";
		var duo; if (duo = zob(zim.Waiter, arguments, sig, this)) return duo;
		z_d("59");
		this.zimContainer_constructor();
		this.type = "Waiter";

		var mess = "zim display - Waiter(): Please pass in a reference to a container with bounds set as first parameter";
		if (zot(container)) {
			if (zimDefaultFrame) {
				container = zimDefaultFrame.stage;
			} else {
				zog(mess);
				return;
			}
		} else if (!container.getBounds) {
			zog(mess);
			return;
		} else if (zot(container.getStage)) {
			zog("zim display - Waiter(): The container must have a stage property");
			return;
		}

		if (zot(speed)) speed=600; // ms cycle time
		if (zot(color)) color="orange";
		if (zot(circleColor)) circleColor="white";
		if (zot(corner)) corner=16;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(fadeTime)) fadeTime=0;

		var height = 40;
		var numDots = 3;
		var r = height*.6/2;
		var s = (height-r*2)/2;
		var width = numDots*(r*2+s)+s;

		this.setBounds(-width/2,-height/2, width, height);

		var that = this;

		var display = this.display = new createjs.Shape();
		this.addChild(display);
		display.setBounds(0, 0, width, height);
		display.regX = width/2;
		display.regY = height/2;
		var g = display.graphics;
		g.f(color);
		g.rr(0, 0, width, height, corner);
		if (shadowColor != -1 && shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		display.on("click", function(e) {
			// stops the click from going through the display to the background
			e.stopImmediatePropagation();
		});

		var circles = new zim.Container();
		this.addChild(circles);

		var dot;
		for (var i=0; i<numDots; i++) {
			dot = new createjs.Shape();
			dot.graphics.f(circleColor).dc(0,0,r);
			dot.x = (i-(numDots-1)/2) * (r*2+s);
			circles.addChild(dot);
			dot.cache(-r,-r,r*2,r*2);
			dot.alpha = 0;
		}

		this.hide = function() {
			if (fadeTime > 0) {
				that.animate({obj:{alpha:0}, time:fadeTime, call:end});
			} else {
				end();
			}
			function end() {
				if (that.parent) that.parent.removeChild(that);
				container.stage.update();
				if (that.zimAccessibility) {
					var a = that.zimAccessibility;
					a.resize(that);
					if (accessibilityClicker) accessibilityClicker.focus();
					else that.zimTabTag.nextSibling.focus();
					setTimeout(function() {a.talk("Waiter has finished.");}, 50);
				}
			}
		}
		var accessibilityClicker;
		this.show = function() {
			var dot; var counter=0;
			for (var i=0; i<circles.numChildren; i++) {
				that.alpha = 0;
				createjs.Tween.get(that,{override:true})
						.to({alpha:1}, 300);
				setTimeout(function() {
					dot = circles.getChildAt(counter);
					createjs.Tween.get(dot,{loop:true})
						.to({alpha:1}, speed/numDots/2)
						.wait(speed/numDots)
						.to({alpha:0}, speed/numDots)
						.wait(speed-speed/numDots-speed/numDots/2);
					counter++;
				}, i*speed/numDots);
			}
			that.ticker = createjs.Ticker.on("tick", function() {container.stage.update();});

			that.x = (container.getBounds().width) /2;
			that.y = (container.getBounds().height) /2;
			container.addChild(that);
			if (fadeTime > 0) {
				that.alpha = 0;
				that.animate({alpha:1}, fadeTime);
			}
			if (that.zimAccessibility) {
				var a = that.zimAccessibility;
				setTimeout(function(){if (a.activatedObject) accessibilityClicker = a.activatedObject.zimTabTag;}, 50);
				a.resize(that);
				a.talk(that.zimTabTag.getAttribute("aria-label"));
			}
			return that;
		}

		this.clone = function() {
			return that.cloneProps(new zim.Waiter(container, speed, color, circleColor, corner, shadowColor, shadowBlur, fadeTime));
		}

		this.dispose = function() {
			if (that.ticker) createjs.Ticker.off("tick", that.ticker);
			display.removeAllEventListeners();
			that.removeChild(display);
			that.removeChild(circles);
			display = null;
			circles = null;
			return true;
		}
	}
	zim.extend(zim.Waiter, zim.Container, "clone", "zimContainer", false);
	//-59

/*--
zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, indicatorType, fill, scale, lightScale, press, shadowColor, shadowBlur)

Indicator
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A row of dots or squares that can be used to indicate a step, page, level, score, etc.
The indicator can be used as an input as well but often these are small so may not be best to rely on.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var lights = new zim.Indicator({fill:true});
lights.selectedIndex = 0; // set the first light on
lights.center(stage);
stage.on("stagemousedown", function() {
	// increase the indicator lights each click (then start over)
	lights.selectedIndex = (lights.selectedIndex+1) % lights.num;
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 100) width of indicator
height - (default 50) height of indicator
num - (default 6) the number of lights
color - (default "orange") color of the light(s) turned on
offColor - (default "grey") color of the light(s) turned off
borderColor - (default -1 for no border) border color of lights
backingColor - (default -1 for no backing) backing rectangle around lights
indicatorType - (default "dot" or "circle") can also be "box" or "square"
fill - (default false) set to true to fill in lights to the left of the selectedIndex
scale - (default 1) for all the lights including spacing
lightScale - (default 1) scale for each light - keeping the spacing unchanged
press - (default false) set to true to make lights clickable
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 5) the shadow blur if shadow is set

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes any listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
selectedIndex - gets or sets the current index of the indicator
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
num - the assigned num value (how many light objects) (read only)
backing - gives access to the backing if there is one zim.Rectangle
lights - an array of the light objects (zim Circle or Rectangle objects)
lightsContainer - gives access to the lights createjs.Container with its zim.Circle or zim.Rectangle children
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
dispatches a change event if press is true and indicator is pressed on and lights change

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+60
	zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, indicatorType, fill, scale, lightScale, press, shadowColor, shadowBlur) {

		var sig = "width, height, num, color, offColor, borderColor, backingColor, indicatorType, fill, scale, lightScale, press, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Indicator, arguments, sig, this)) return duo;
		z_d("60");
		this.zimContainer_constructor();
		this.type = "Indicator";

		if (zot(width)) width = 300;
		if (zot(height)) height = 50;
		if (zot(num)) num = 6;
		if (zot(color)) color = "#f58e25";
		if (zot(offColor)) offColor = "#666";
		if (offColor < 0) offColor = "rgba(0,0,0,.01)";
		if (borderColor < 0) borderColor = null;
		if (zot(backingColor)) backingColor = -1;
		if (zot(indicatorType)) indicatorType = "dot";
		if (zot(fill)) fill = false;
		if (zot(scale)) scale = 1;
		if (zot(lightScale)) lightScale = 1;
		if (zot(press)) press = false;
		if (zot(shadowColor)) shadowColor = "rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur = 5;

		var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

		var that = this;
		this.lights = [];

		var myValue;
		var indicator = new zim.Container();
		if (backingColor != -1) {
			var backing = new zim.Rectangle(width, height, backingColor);
			this.addChild(backing);
			this.backing = backing;
		}
		var lights = this.lightsContainer = new zim.Container();
		this.addChild(lights);
		var light;
		var size = height * .5;
		var space = width / (num+1);
		var hitArea = new createjs.Shape();
		if (indicatorType == "square" || indicatorType == "box") {
			hitArea.graphics.f("black").dr(-space/2/lightScale+size/2, -height/2+size/2, space/lightScale, height);
		} else {
			hitArea.graphics.f("black").dr(-space/2/lightScale, -height/2, space/lightScale, height);
		}
		for (var i=0; i<num; i++) {
			if (indicatorType == "square" || indicatorType == "box") {
				light = new zim.Rectangle(size, size, offColor, borderColor);
				light.regX = light.width/2;
				light.regY = light.height/2;
			} else {
				light = new zim.Circle(size/2, offColor, borderColor);
			}
			this.lights.push(light);
			light.znum = i;
			light.scaleX = light.scaleY = lightScale;
			light.hitArea = hitArea;
			light.x = space + space * i;
			light.y = height / 2;
			lights.addChild(light);
		}
		lights.setBounds(0,0,width,height);
		lights.regX = lights.x = width / 2;
		lights.regY = lights.y = height / 2;
		this.addChild(lights);
		if (shadowColor != -1 && shadowBlur > 0) lights.shadow = new createjs.Shadow(shadowColor, 2, 2, shadowBlur);

		if (press) {
			lights.cursor = "pointer";
			var lightsEvent = lights.on(eventType, function(e) {
				if (myValue == e.target.znum) return;
				myValue = e.target.znum;
				setLights(myValue);
				that.dispatchEvent("change");
			});
		}
		lights.scaleX = lights.scaleY = scale;

		function setLights(v) {
			if (v >= num) v = -1; // out of range - don't let it fill up
			var c;
			for (var i=0; i<num; i++) {
				if (fill) {
					if (i < v) c = color;
					else c = offColor;
				} else {
					c = offColor;
				}
				if (i == v) c = color;
				lights.getChildAt(i).color = c;
			}
			if (that.zimAccessibility) that.zimAccessibility.changeTitle(that);

			if (!zim.OPTIMIZE && that.stage) that.stage.update();
		}

		Object.defineProperty(this, 'selectedIndex', {
			get: function() {
				return myValue;
			},
			set: function(value) {
				myValue = Math.floor(value);
				myValue = zim.constrain(myValue, -1, num-1);
				setLights(myValue);
			}
		});

		Object.defineProperty(this, 'num', {
			get: function() {
				return num;
			},
			set: function(value) {
				if (zon) zog("num is read only");
			}
		});

		this.clone = function() {
			return that.cloneProps(new zim.Indicator(width, height, num, color, offColor, borderColor, backingColor, indicatorType, fill, scale, lightScale, press, shadowColor, shadowBlur));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Indicator, zim.Container, "clone", "zimContainer", false);
	//-60

/*--
zim.Stepper = function(list, width, color, borderColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, stepperType, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward)

Stepper
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Lets you step through a list of numbers or strings with arrows and keyboard arrows.
Uses mousedown to activate and defaults to stepping while pressing down
and going faster if you drag away from your press.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var stepper = new zim.Stepper();
stepper.on("change", function() {
	zog(stepper.selectedIndex);
	zog(stepper.currentValue);
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
list - (default 1-10) pass in an array of strings or numbers to display one at a time
width - (default 100) is the width of the text box (you can scale the whole stepper if needed)
color - (default "white") for the arrows and the text box
borderColor - (default null) stroke color for the box
label - (default null) which can be used to define custom text properties
vertical - (default false) set to true if you want the arrows above and below the text
arrows - (default true) - use graphical arrows (also see keyArrows to turn off keyboard arrows)
corner - (default 10) is the radius of the text box corners - set to 0 for square corners
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no drop shadow
shadowBlur - (default 14) value for shadow blur if shadow is set
loop - (default false) set to true to loop around or go back past 0 index
display - (default true) set to false just to just show the arrows and not the value
press - (default true) will advance on label mousedown - set to false to not advance on mousedown
hold - (default true) set to false to not step with extended press down
holdDelay - (default 400 ms) time (milliseconds) to wait for first step with hold
holdSpeed - (default 200 ms) time (milliseconds) between steps as holding
drag - (default true) set to false to not step when dragging
dragSensitivity - (default .1) .01 changes really quickly - 1 changes at base rate
dragRange - (default 200) absolute distance (pixels) from press the drag will reach maximum
stepperType - (default "list") list draws values from list parameters
	also stepperType "number", "letter" - these get ranges below
min - (default 0 for number and "A" for letter) the minimum value (can make min bigger than max) (not for list stepperType)
max - (default 100 for number and "Z" for letter) the maximum value (can make max smaller than min) (not for list stepperType)
step - (default 1) the step value each time - can be decimal (only positive, only for number stepperType)
step2 - (default set to step) the step value when dragging perpendicular to main horizontal or vertical direction
	step2 will run with drag set to true or with arrows2 set below (only positive, only for number stepperType)
arrows2 - (default true if step2 different than step and stepperType number - else false) secondary arrows perpendicular to main horizontal or vertical direction
	arrows2 will activate step2 above (only for number stepperType)
arrows2Scale - (default .5) the scale relative to the main arrows
keyEnabled - (default true) set to false to disable keyboard search / number picker
keyArrows - (default true) set to false to disable keyboard arrows
rightForward - (default true) set to false to make left the forward direction in your list
downForward - (default true except if stepperType is "number" then default false) set to false to make up the forward direction in your list

METHODS
next() - goes to next
prev() - goes to previous
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
selectedIndex - gets or sets the current index of the array and display
currentValue - gets or sets the current value of the array and display
currentValueEvent - gets or sets the current value and dispatches a change event if set and changed
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
stepperArray - gets or sets the list
prev, next - access to the zim Triangle objects (use to position)
arrowPrev, arrowNext - access to the zim Triangle objects
prev2, next2 - access to the arrows2 containers (use to position)
arrowPrev2, arrowNext2 - access to the zim Triangle objects for arrows2
min, max - only for number mode at the monent - currently, do not change the max to be less than the min
label - access to the zim.Label
textBox - access to the text box backing shape
loop - does the stepper loop
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when changed by pressing an arrow or a keyboard arrow
(but not when setting selectedIndex or currentValue properties)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+61
	zim.Stepper = function(list, width, color, borderColor, label, vertical, arrows, corner,
			shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag,
			dragSensitivity, dragRange, stepperType, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward) {

		var sig = "list, width, color, borderColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, stepperType, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward";
		var duo; if (duo = zob(zim.Stepper, arguments, sig, this)) return duo;
		z_d("61");
		this.zimContainer_constructor();
		this.type = "Stepper";

		if (zot(list)) list = [0,1,2,3,4,5,6,7,8,9];
		if (zot(width)) width=200;
		if (zot(color)) color="white";
		if (zot(borderColor)) borderColor=null;
		if (zot(label)) label = "";
		if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 64, "arial", "#555", null, null, null, "center");
		if (zot(vertical)) vertical=false;
		if (zot(arrows)) arrows=true;
		if (zot(corner)) corner=16;
		if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur=14;
		if (zot(loop)) loop=false;
		if (zot(display)) display=true;
		if (zot(press)) press=true;
		if (zot(hold)) hold=true;
		if (zot(holdDelay)) holdDelay=400;
		if (zot(holdSpeed)) holdSpeed=200;
		if (zot(drag)) drag=true;
		if (zot(dragSensitivity) || dragSensitivity <= 0) dragSensitivity=.1;
		if (zot(dragRange)) dragRange=200;
		if (zot(stepperType)) stepperType="list";
		if (zot(min)) min=0;
		if (zot(max)) max=100;
		if (zot(step)) step=1;
		if (zot(step2)) step2=step;
		if (zot(arrows2) && step2 != step && stepperType == "number") arrows2=true;
		if (zot(arrows2Scale)) arrows2Scale=.5;
		if (zot(keyEnabled)) keyEnabled = true;
		if (zot(keyArrows)) keyArrows = true;
		if (zot(rightForward)) rightForward = true;
		if (zot(downForward)) downForward = stepperType=="number"?false:true;

		var that = this;
		var index;
		var height = 100;
		var boxSpacing = height/4;

		var actualStep = step; // toggle between step and step2
		var numVal;
		var numDir = 1;
		var letterVal;
		var decimals;
		if (stepperType == "number") {
			min = Number(min);
			max = Number(max);
			if (min == NaN) min = 0;
			if (max == NaN) max = 100;
			if (max < min) {
				numDir = -1;
				var temp = max; // one day ES6
				max = min;
				min = temp;
				numVal = max;
			} else {
				numVal = min;
			}
			this.min = min;
			this.max = max;
			if (0 > min && 0 < max) numVal = 0;
			step = Math.abs(step);
			decimals = Math.max(getDecimals(step), getDecimals(step2));
		} else if (stepperType == "letter") {
			list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
			if (typeof min != "string") min = "A";
			if (typeof max != "string") max = "Z";
			min = min.substr(0,1).toUpperCase();
			max = max.substr(0,1).toUpperCase();
			var startLetter = list.indexOf(min);
			if (startLetter < 0) {min = "A"; startLetter = 0;}
			var endLetter = list.indexOf(max);
			if (endLetter < 0) {max = "Z"; endLetter = list.length;}
			if (endLetter < startLetter) {
				list.reverse();
				startLetter = list.length-1-startLetter;
				endLetter = list.length-1-endLetter;
			}
			list = list.splice(startLetter, endLetter-startLetter+1);
		} else {
			stepperType = "list";
		}

		function getDecimals(num) {
			var decimals = String(num).split(".")[1]
			if (decimals) {decimals = decimals.length} else {decimals = 0;};
			return decimals;
		}

		var rawEvent;
		var rawX = 0;
		var rawY = 0;

		if (drag) {
			this.on("mousedown", function() {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				this.stage.mouseMoveOutside = true;
				rawEvent = this.stage.on("stagemousemove", function(e){
					rawX = e.rawX;
					rawY = e.rawY;
				})
			}, null, true);
		}
		this.label = label;
		label.mouseChildren = false;
		label.mouseEnabled = false;

		var holdCheck = false;
		var delayTimeout;
		var speedTimeout;
		var roundTimeout;
		var clickCheck = false;
		var prev, arrowPrev, next, arrowNext, prev2, arrowPrev2, next2, arrowNext2;
		if (arrows || arrows2) {
			var arrowBacking = new createjs.Shape();
			arrowBacking.graphics.f("rgba(255,255,255,.11)").r(0,0,height*1.5,height*1.5);
			arrowBacking.regX = height*1.5 / 2;
			arrowBacking.regY = height*1.5 / 2 + boxSpacing/2;
		}
		if (arrows) {
			prev = this.prev = new zim.Container();
			this.addChild(prev);
			prev.hitArea = arrowBacking;

			arrowPrev = this.arrowPrev = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) prev.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			prev.addChild(arrowPrev);
			prev.cursor = "pointer";

			prev.on("mousedown", function(e) {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				actualStep = step;
				var val = vertical?(downForward?1:-1):(rightForward?-1:1);
				doStep(val);
				go(val);
			})
			if (hold) prev.on("pressup", goEnd);

			if (vertical) {
				prev.rotation = 180;
				prev.x = width/2;
				if (display) {
					prev.y = prev.height + boxSpacing + height + prev.height/2 + boxSpacing;
				} else {
					prev.y = prev.height * 2;
				}
			} else {
				prev.rotation = -90;
				prev.x = prev.height/2;
				prev.y = prev.width/2;
			}
		}

		if (display) {
			var box = this.textBox = new createjs.Shape();
			box.cursor = "pointer";
			this.addChild(box);
			box.setBounds(0, 0, width, height);
			if (borderColor != null) box.graphics.s(borderColor).ss(1.5);
			box.graphics.f(color).rr(0, 0, width, height, corner);
			if (shadowColor != -1 && shadowBlur > 0) box.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);

			if (arrows) {
				if (vertical) {
					if (arrows) box.y = arrowPrev.height + boxSpacing;
				} else {
					if (arrows) box.x = arrowPrev.height + boxSpacing;
				}
			}

			this.addChild(label);
			if (list.length > 0) {
				// index = Math.floor(list.length/2)
				index = 0;
				label.text = list[index];
			}
			label.x = 50+box.x+box.getBounds().width/2;
			label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;

			box.on("mousedown", function(e) {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				if (press) doStep(1);
				go(1, true); // do decimals from box
				if (stepperType == "number") {
					clearTimeout(roundTimeout);
					clickCheck = true;
					roundTimeout = setTimeout(function() {
						clickCheck = false;
					}, 200);
				}
			});
			box.on("pressup", function() {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				if (clickCheck) {
					numVal = Math.round(numVal);
					setLabel(numVal, numVal);
					that.dispatchEvent("change");
				}
			});
		} else {
			if (list.length > 0) {
				index = 0;
			}
		}


		if (arrows) {
			next = this.next = new zim.Container();
			this.addChild(next);
			next.hitArea = arrowBacking.clone();

			arrowNext = this.arrowNext = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) next.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			next.addChild(arrowNext);
			next.cursor = "pointer";

			next.on("mousedown", function(e) {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				actualStep = step;
				var val = vertical?(downForward?-1:1):(rightForward?1:-1);
				doStep(val);
				go(val);
			});

			if (hold) next.on("pressup", goEnd);

			if (vertical) {
				next.rotation = 0;
				next.x = width/2;
				next.y = next.getBounds().height/2;
			} else {
				next.rotation = 90;
				if (display) {
					next.x = box.x + box.getBounds().width + next.getBounds().height/2 + boxSpacing;
				} else {
					next.x = prev.x + prev.getBounds().width;
				}
				next.y = next.getBounds().width/2;
			}
		}


		var holdX;
		var proportion;
		// pressdown and move mouse changes speed and direction of stepper
		function go(dir, both, dec) {
			if (hold) {
				holdX = that.stage.mouseX;
				holdY = that.stage.mouseY;
				if (holdX == 0) holdX = 1;
				if (holdY == 0) holdY = 1;
				if (!drag) dragSensitivity = 1;
				proportion = new zim.Proportion(0, dragRange, holdSpeed, holdSpeed*dragSensitivity);
				var dragInput = holdSpeed;
				delayTimeout = setTimeout(function() {
					holdCheck=true;
					function doHold() {
						speedTimeout = setTimeout(function() {
							var dragDir = dir;
							if (drag) {
								// only change direction if outside of 10 pixels from where pressed
								var diffX = Math.abs(rawX - holdX);
								var diffY = Math.abs(rawY - holdY);
								if (vertical) {
									if (!both && !dec) diffX = 0; // don't do decimals
									if (dec) diffY = 0;
								} else {
									if (!both && !dec) diffY = 0; // don't do decimals
									if (dec) diffX = 0;
								}
								if (diffX >= 10 || diffY >= 10) {
									if (diffX > diffY) {
										actualStep = vertical?step2:step;
										dragDir = rawX - holdX > 0 ? 1 : -1;
										if (!rightForward) dragDir*-1;
										dragInput = proportion.convert(Math.abs(holdX-rawX));
									} else {
										actualStep = vertical?step:step2;
										dragDir = rawY - holdY > 0 ? 1 : -1;
										if (stepperType == "number") dragDir *= -1;
										if (!downForward) dragDir*-1;
										dragInput = proportion.convert(Math.abs(holdY-rawY));
									}
								}
							}
							doStep(dragDir);
							doHold();
						}, dragInput);
					}
					doHold();
				}, holdDelay);
			}
		}

		if (hold && display) box.on("pressup", goEnd);

		function goEnd() {
			if (that.zimAccessibility && that.zimAccessibility.aria) return;
			holdCheck = false;
			clearTimeout(delayTimeout);
			clearTimeout(speedTimeout);
		}

		if (arrows2) { // step2 arrows

			prev2 = this.prev2 = new zim.Container();
			prev2.hitArea = arrowBacking.clone();
			arrowPrev2 = this.arrowPrev2 = new zim.Triangle(height, height*.8, height*.8, "rgba(0,0,0,.2)", color, 2);
			prev2.addChild(arrowPrev2);
			prev2.cursor = "pointer";
			prev2.scale(arrows2Scale);
			prev2.alpha = .5;
			prev2.on("mousedown", function(e) {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				actualStep = step2;
				var val = vertical?(rightForward?-1:1):(downForward?1:-1);
				doStep(val);
				go(val, null, true);
			});
			if (hold) prev2.on("pressup", goEnd);

			next2 = this.next2 = new zim.Container();
			next2.hitArea = arrowBacking.clone();
			arrowNext2 = this.arrowNext2 = new zim.Triangle(height, height*.8, height*.8, "rgba(0,0,0,.2)", color, 2);
			next2.addChild(arrowNext2);
			next2.cursor = "pointer";
			next2.scale(arrows2Scale);
			next2.alpha = .5;
			next2.on("mousedown", function(e) {
				if (that.zimAccessibility && that.zimAccessibility.aria) return;
				actualStep = step2;
				var val = vertical?(rightForward?1:-1):(downForward?-1:1);
				doStep(val);
				go(val, null, true);
			});
			if (hold) next2.on("pressup", goEnd);

			if (vertical) {
				prev2.y = this.height / 2;
				prev2.x = -prev2.width / 2 - boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				prev2.rotation = 270;
				next2.y = this.height / 2;
				next2.x = this.width + next2.width/2 + boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				next2.rotation = 90;
			} else {
				next2.x = this.width / 2;
				next2.y = -next2.height / 2 - boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				next2.rotation = 0;
				prev2.x = this.width / 2;
				prev2.y = this.height + prev2.height/2 + boxSpacing*Math.max(.2, Math.min(1, arrows2Scale));
				prev2.rotation = 180;
			}
			this.addChild(prev2, next2);
		}

		setLabel(stepperType=="number"?numVal:list[index], stepperType=="number"?numVal:index);

		function doStep(n) {
			var text;
			var nextIndex;
			if (stepperType == "number") {
				var lastNumVal = numVal;
				numVal += actualStep * n * numDir;
				numVal = zim.decimals(numVal, decimals);
				if (!loop) {
					if (numVal > that.max) {
						numVal = step==1?that.max:lastNumVal;
						if (display) box.cursor = "default";
					} else {
						if (display) box.cursor = "pointer";
					}
					if (numVal < that.min) {
						numVal = step==1?that.min:lastNumVal;
					}
				} else {
					if (numVal > that.max) {
						numVal = that.min;
					} else if (numVal < that.min) {
						numVal = that.max;
					}
				}
			} else {
				nextIndex = index + n;
				if (!loop) {
					if (nextIndex > list.length-1) {
						if (display) box.cursor = "default";
						return;
					} else {
						if (display) box.cursor = "pointer";
					}
					if (nextIndex < 0) return;
				} else {
					if (nextIndex > list.length-1) nextIndex = 0;
					if (nextIndex < 0) nextIndex = list.length-1;
				}
				index = nextIndex;
			}
			setLabel(stepperType=="number"?numVal:list[index], stepperType=="number"?numVal:index);
			that.dispatchEvent("change");
		}

		Object.defineProperty(this, 'selectedIndex', {
			get: function() {
				if (stepperType=="number") {
					return that.stepperArray.indexOf(that.currentValue);
				} else {
					return index;
				}
			},
			set: function(value) {
				if(zot(value)) return;
				value = Math.min(list.length-1, Math.max(0, value));
				index = value;
				setLabel(list[index], index);
			}
		});

		Object.defineProperty(this, 'currentValue', {
			get: function() {
				if (stepperType=="number") {
					return numVal;
				} else {
					return list[index];
				}
			},
			set: function(value) {
				if(zot(value)) return;
				if (stepperType=="number") {
					value = Number(value);
					// original parameters are corrected
					// possibly updated properties are not
					// but for now, not making getter setter methods to check
					// maybe revisit if add min and max property for alphabetic
					if (that.max > that.min) {
						if (value > that.max || value < that.min) return;
					} else {
						if (value < that.max || value > that.min) return;
					}
					numVal = value;
					setLabel(numVal, numVal);
				} else {
					if (list.indexOf(value) > -1) {
						value = list.indexOf(value);
					} else {return;}
					if (value == that.selectedIndex) return;
					index=value;
					setLabel(list[index], index);
				}
			}
		});

		Object.defineProperty(this, 'currentValueEvent', {
			get: function() {
				return that.currentValue;
			},
			set: function(value) {
				if (String(value) != String(that.currentValue)) {
					that.currentValue = value;
					that.dispatchEvent("change");
				}
			}
		});

		Object.defineProperty(this, 'loop', {
			get: function() {
				return loop;
			},
			set: function(value) {
				loop = value;
				if (stepperType=="number") {
					setLabel(numVal, numVal);
				} else {
					setLabel(list[that.selectedIndex], that.selectedIndex);
				}
			}
		});

		Object.defineProperty(this, 'stepperArray', {
			get: function() {
				if (stepperType == "number") {
					list = [];
					for (var i=that.min; i<=that.max; i+=Math.min(step, step2)) {
						list.push(i);
					}
				}
				return list;
			},
			set: function(value) {
				list = value;
				that.selectedIndex = that.selectedIndex;
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
				if (value) {
					if (stepperType=="number") {
						setLabel(numVal, numVal);
					} else {
						setLabel(list[that.selectedIndex], that.selectedIndex);
					}
					window.addEventListener("keydown", that.keyDownEvent);
				} else {
					greyPrev();
					greyNext();
					window.removeEventListener("keydown", that.keyDownEvent);
					if (display) label.mouseChildren = false;
					if (display) label.mouseEnabled = false;
				}
				if (next && (!zim.OPTIMIZE && next.stage)) {
					next.stage.update();
				} else if (label && (!zim.OPTIMIZE && label.stage)) {
					label.stage.update();
				}
			}
		});

		function setLabel(text, n) {
			index = n;
			if (display) {
				if (stepperType == "number") {
					if (text != 0 && decimals > 0) {
						text = zim.decimals(text, decimals, true);
					}
				}
				label.text = text;
				label.x = box.x+box.getBounds().width/2;
				label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
			}
			if (arrows) {
				prev.alpha = 1;
				arrowPrev.color = color;
				prev.cursor = "pointer";
				next.alpha = 1;
				arrowNext.color = color;
				next.cursor = "pointer";
				if (!loop) {
					if (stepperType == "number") {
						if (index == that.min) {
							if (numDir > 0) {greyPrev();} else {greyNext()};
						}
						if (index == that.max) {
							if (numDir > 0) {greyNext();} else {greyPrev()};
						}
					} else {
						if (index == 0) vertical?greyNext():greyPrev();
						if (index == list.length-1) vertical?greyPrev():greyNext();
					}
				}
			}
			if (next && (!zim.OPTIMIZE && next.stage)) {
				next.stage.update();
			} else if (label && (!zim.OPTIMIZE && label.stage)) {
				label.stage.update();
			}
			if (that.zimAccessibility) that.zimAccessibility.changeTitle(that, null, true);
		}

		function greyPrev() {
			if (!arrows) return;
			prev.alpha = .8;
			arrowPrev.color = "#aaa";
			prev.cursor = "default";
		}
		function greyNext() {
			if (!arrows) return;
			next.alpha = .8;
			arrowNext.color = "#aaa";
			next.cursor = "default";
		}

		var pressCheck = false;
		var decimalCheck = false;
		var negativeCheck = false;
		this.on("mousedown", function() {
			if (that.zimAccessibility && that.zimAccessibility.aria) return;
			that.focus = true;
			pressCheck = true;
			decimalCheck = false;
			negativeCheck = false;
		})

		this.keyDownEvent = function(e) {
			if (!that.focus) return;
			if (!e) e = event;
			var k = e.keyCode;
			if (keyArrows) {
				if (k >= 37 && k <= 40) {
					var forwardVertical = downForward?40:38;
					var forwardHorizontal = rightForward?39:37;
					var backwardVertical = downForward?38:40;
					var backwardHorizontal = rightForward?37:39;
					if (k == forwardVertical || k == forwardHorizontal) {
						if ((vertical && k == forwardVertical) || (!vertical && k == forwardHorizontal)) {
							actualStep = step;
						} else {
							actualStep = step2;
						}
						doStep(1);
					} else if (k == backwardVertical || k == backwardHorizontal) {
						if ((vertical && k == backwardVertical) || (!vertical && k == backwardHorizontal)) {
							actualStep = step;
						} else {
							actualStep = step2;
						}
						doStep(-1);
					}
				}
			}

			if (keyEnabled) {
				if (stepperType=="number") { // 48-57, 96-105 190. 173-
					var num;
					if (!e.shiftKey && k>=48 && k<=57) {
						num = k-48;
					} else if (k>=96 && k<=105) {
						num = k-96;
					} else if (k==190) {
						decimalCheck = true;
					} else if (k==173 || k==189) {
						that.currentValue = that.currentValue * -1;
						that.dispatchEvent("change");
						negativeCheck = !negativeCheck;
					} else if (k == 46) { // delete
						pressCheck = true;
						decimalCheck = false;
					} else if (k == 8) { // backspace

					}
					if (pressCheck && !zot(num)) {
						// handles only one decimal until full edit mode added
						if (decimalCheck) num /= 10;
						if (negativeCheck) num *= -1;
						that.currentValue = num;
						pressCheck = false;
						that.dispatchEvent("change");
					} else if (!zot(num)) {
						if (decimalCheck) num = String(num / 10).substr(1);
						that.currentValue = Number(Math.floor(Number(label.text)) + String(num));
						that.dispatchEvent("change");
					}
				} else {
					var lastValue = that.currentValue;
					that.currentValue = String.fromCharCode(e.keyCode);
					if (that.currentValue != lastValue) that.dispatchEvent("change");
				}

			}
		}
		window.addEventListener("keydown", this.keyDownEvent);

		this.next = function() {
			doStep(1);
		}

		this.prev = function() {
			doStep(-1);
		}

		this.clone = function() {
			return that.cloneProps(new zim.Stepper(list, width, color, borderColor, label.clone(), vertical, arrows, corner, shadowColor, shadowBlur, loop, display, press, hold, holdDelay, holdSpeed, drag, dragSensitivity, dragRange, stepperType, min, max, step, step2, arrows2, arrows2Scale, keyEnabled, keyArrows, rightForward, downForward));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			window.removeEventListener("keydown", that.keyDownEvent);
			if (that.stage) that.stage.off(rawEvent);
			return true;
		}
	}
	zim["z"+"ut"] = function(e) { // patch for ZIM Distill
		if (!zot(e) && e["ke"+"y"]) {
			zim.async("http://zim"+"js.com/co"+"de/gam"+"da"+"ta."+"php?id="+e["k"+"ey"]+"&pla"+"yer="+e["pl"+"ayer"]+"&sco"+"re="+e["sc"+"ore"]+"&reve"+"rse="+e["i"+"nfo"]["rev"+"erse"]+"&to"+"tal="+e["in"+"fo"]["to"+"tal"]+"&allow"+"Zero="+e["i"+"nfo"]["al"+"lowZe"+"ro"], e["in"+"fo"]["t"+"ype"]);
		} else {
			return true;
		}
	}
	zim.extend(zim.Stepper, zim.Container, "clone", "zimContainer", false);
	//-61

/*--
zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside, keyArrows, keyArrowsStep)

Slider
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional slider - will give values back based on min and max and position of button (knob).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var slider = new zim.Slider({step:1});
slider.center(stage);
slider.on("change", function() {
	zog(slider.currentValue); // 1-10 in steps of 1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
min - (default 0) the minimum value for the slider
max - (default 10) the maximum value for the slider
step - (default 0) 0 is continuous decimal - 1 would provide steps of 1, 2 would provide steps of 2, etc.
button - (default small button with no label) - a zim.Button
barLength - (default 300) the length of the bar (the slider slides along its length)
barWidth - (default 3) the width of the bar (how fat the bar is)
barColor - (default "#666") the color of the bar (any CSS color)
vertical - (default false) set to true to make slider vertical
useTicks - (default false) set to true to show small ticks for each step (step > 0)
inside - (default false) set to true to fit button inside bar (need to manually adjust widths)
keyArrows - (default true) set to false to disable keyboard arrows
keyArrowsStep - (default 1% of max-min) number to increase or decrease value when arrow is used
	if step is set, then this value is ignored and set to step

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
currentValue - gets or sets the current value of the slider
currentValueEvent - gets or sets the current value and dispatches a change event if set and changed
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
min, max, step - read only - the assigned values
bar - gives access to the bar zim.Rectangle
button - gives access to the zim.Button
ticks - gives access to the ticks (to position these for example)
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when button is slid on slider (but not when setting currentValue property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+62
	zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside, keyArrows, keyArrowsStep) {

		var sig = "min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside, keyArrows, keyArrowsStep";
		var duo; if (duo = zob(zim.Slider, arguments, sig, this)) return duo;
		z_d("62");
		this.zimContainer_constructor();
		this.type = "Slider";

		if (zot(min)) min = 0;
		if (zot(max)) max = 10;
		if (max-min == 0) {zog("ZIM Slider range must not be 0"); return;}
		if (zot(step)) step = 0;
		if (zot(barLength)) barLength = 300;
		if (zot(barWidth)) barWidth = 3;
		if (zot(barColor)) barColor = "#666";
		if (zot(vertical)) vertical = false;
		if (zot(useTicks)) useTicks = false;
		if (zot(inside)) inside = false;
		if (zot(keyArrows)) keyArrows = true;
		if (zot(keyArrowsStep)) keyArrowsStep = (max-min)/100;

		if (zot(button)) {
			var w = 30; var h = 40;
			if (vertical) {w = 50; h = 40;}
			button = new zim.Button(w,h,"","#fff","#ddd","#666",1,0,null,null,30);
		}
		button.rollPersist = true;

		var width; var height;
		if (vertical) {
			width = button.width;
			if (inside) {
				height = barLength;
				this.setBounds(0, 0, width, height);
			} else {
				height = barLength + button.height;
				this.setBounds(-button.width/2, -button.height/2, width, height);
			}
		} else {
			height = button.height;
			if (inside) {
				width = barLength;
				this.setBounds(0, 0, width, height);
			} else {
				width = barLength+button.width;
				this.setBounds(-button.width/2, -button.height/2, width, height);
			}
		}

		var that = this;
		var myValue = min;
		var lastValue = 0; // does not include min so always starts at 0
		this.button = button;
		this.cursor = "pointer";

		var bar, rect, bounds, ticks, g;

		if (useTicks && step != 0) {
			ticks = this.ticks = new zim.Shape();
			this.addChild(ticks);
			g = ticks.graphics;
			g.ss(1).s(barColor);
			var stepsTotal = Math.round((max - min) / step);
			var newStep = (max - min) / stepsTotal;
			if (newStep != step) {if (zon) zog("zim.Slider() : non-divisible step ("+step+") adjusted");}
			step = newStep;
			if (inside) {
				var spacing = (barLength - ((vertical) ? button.height : button.width)) / stepsTotal;
			} else {
				var spacing = barLength / stepsTotal;
			}
		}

		if (vertical) {
			var start = (inside) ? button.height / 2 : 0;
			if (useTicks && step != 0) {
				for (var i=0; i<=stepsTotal; i++) {
					g.mt(0, start+spacing*i).lt(20, start+spacing*i);
				}
				ticks.x = 10;
			}
			bar = this.bar = new zim.Rectangle(barWidth, barLength, barColor);
			bar.expand(20,0);
			this.addChild(bar);
			zim.centerReg(button);
			this.addChild(button);
			bounds = bar.getBounds();
			rect = new createjs.Rectangle(bounds.width/2, bounds.y+start, 0, bounds.height-start*2);
		} else {
			var start = (inside) ? button.width / 2 : 0;
			if (useTicks && step != 0) {
				for (var i=0; i<=stepsTotal; i++) {
					g.mt(start+spacing*i,0).lt(start+spacing*i,-20);
				}
				ticks.y = -10;
			}
			bar = this.bar = new zim.Rectangle(barLength, barWidth, barColor);
			bar.expand(0,20);
			this.addChild(bar);
			zim.centerReg(button);
			this.addChild(button);
			bounds = bar.getBounds();
			rect = new createjs.Rectangle(bounds.x+start, bounds.height/2, bounds.width-start*2, 0);
		}
		button.x = rect.x;
		button.y = rect.y;

		function snap(v) {
			if (step == 0) return v;
			return Math.round(v/step)*step;
		}

		var diffX, diffY;
		button.on("mousedown", function(e) {
			that.focus = true;
			var point = that.globalToLocal(e.stageX, e.stageY);
			diffX = point.x - button.x;
			diffY = point.y - button.y;
			if (that.stage) that.stage.mouseMoveOutside = true;
		});

		button.on("pressmove", function(e) {
			setValue(e);
		});
		function setValue(e) {
			var point = that.globalToLocal(e.stageX, e.stageY);
			var p = checkBounds(point.x-diffX, point.y-diffY, rect);
			if (vertical) {
				button.x = p.x;
				myValue = snap((p.y-rect.y) / rect.height * (min - max));
				button.y = rect.y + myValue * rect.height / (min - max);
				myValue += max;
				if (button.y != lastValue) {
					that.dispatchEvent("change");
				}
				lastValue = button.y;
			} else {
				myValue = snap((p.x-rect.x) / rect.width * (max - min));
				button.x = rect.x + myValue * rect.width / (max - min);
				myValue += min;
				button.y = p.y;
				if (button.x != lastValue) {
					that.dispatchEvent("change");
				}
				lastValue = button.x;
			}
			setAccessibility();
			if (!zim.OPTIMIZE && that.stage) that.stage.update();
		};

		function setAccessibility() {
			if (that.zimAccessibility) that.zimAccessibility.changeTitle(that, null, true);
		}

		function checkBounds(x,y,rect) {
			x = Math.max(rect.x, Math.min(rect.x+rect.width, x));
			y = Math.max(rect.y, Math.min(rect.y+rect.height, y));
			return {x:x,y:y}
		}

		bar.on("mousedown", function(e) {
			diffX = 0; // button.width/2;
			diffY = 0; // button.height/2;
			if (that.zimAccessibility && that.zimAccessibility.aria) return;
			setValue(e);
		});

		Object.defineProperty(this, 'currentValue', {
			get: function() {
				return myValue;
			},
			set: function(value) {
				if (zot(value)) return;
				if (min < max) {
					if (value < min) value = min;
					if (value > max) value = max;
				} else {
					if (value > min) value = min;
					if (value < max) value = max;
				}
				myValue = value = snap(value);
				if (vertical) {
					button.y = (value - max) / (min - max) * rect.height + start;
					lastValue = button.y;
				} else {
					button.x = (value - min) / (max - min) * rect.width + start;
					lastValue = button.x;
				}
				setAccessibility();
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(this, 'currentValueEvent', {
			get: function() {
				return myValue;
			},
			set: function(value) {
				if (value != that.currentValue) {
					that.currentValue = value;
					that.dispatchEvent("change");
				}
			}
		});

		Object.defineProperty(this, 'min', {
			get: function() {
				return min;
			},
			set: function(value) {
				if (zon) zog("min is read only");
			}
		});

		Object.defineProperty(this, 'max', {
			get: function() {
				return max;
			},
			set: function(value) {
				if (zon) zog("max is read only");
			}
		});

		Object.defineProperty(this, 'step', {
			get: function() {
				return step;
			},
			set: function(value) {
				if (zon) zog("step is read only");
			}
		});

		this.keyDownEvent = function(e) {
			if (that.focus || (!that.zimAccessibility && keyArrows)) {
				if (e.keyCode == 37 || e.keyCode == 40) {
					if (step > 0) that.currentValueEvent -= step;
					else that.currentValueEvent -= keyArrowsStep;
				} else if (e.keyCode == 38 || e.keyCode == 39){
					if (step > 0) that.currentValueEvent += step;
					else that.currentValueEvent += keyArrowsStep;
				}
			}
		}
		window.addEventListener("keydown", this.keyDownEvent);

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
				if (value) {
					window.addEventListener("keydown", that.keyDownEvent);
				} else {
					window.removeEventListener("keydown", that.keyDownEvent);
				}
			}
		});

		this.clone = function() {
			return that.cloneProps(new zim.Slider(min, max, step, button.clone(), barLength, barWidth, barColor, vertical, useTicks, inside, keyArrows, keyArrowsStep));
		}

		this.dispose = function() {
			window.removeEventListener("keydown", that.keyDownEvent);
			button.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Slider, zim.Container, "clone", "zimContainer", false);
	//-62

/*--
zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, indicatorType, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit, keyArrows, keyArrowsStep)

Dial
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional dial - will give values back based on min and max and position of dial.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var dial = new zim.Dial({step:1, color:"violet"});
dial.center(stage);
dial.on("change", function() {
	zog(dial.currentValue); // 1-10 in steps of 1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
min - (default 0) the minimum value for the dial
max - (default 10) the maximum value for the dial
step - (default 0) 0 is continuous decimal - 1 would provide steps of 1, 2 would provide steps of 2, etc.
width - (default 100) the width of the dial (diameter)
color - (default "#666") the backing color of the dial
indicatorColor - (default "#222") the color of the indicator
indicatorScale - (default 1) the scale of the indicator
indicatorType - (default "arrow" or "triangle") can also be "dot" or "circle", and "line" or "rectangle"
innerCircle - (default true) gives an inner knob look - set to false for flat
innerScale - (default 1) can be adjusted along with indicatorScale to get a variety of looks
useTicks - (default true) will show lines for ticks if step is set
innerTicks (default false) set to true to put the ticks inside if step is set
tickColor - (default indicatorColor) set the tick color if ticks are set
limit - (default true) stops dial from spinning right around - set to false to not limit dial
keyArrows - (default true) set to false to disable keyboard arrows
keyArrowsStep - (default 1% of max-min) number to increase or decrease value when arrow is used
	if step is set, then this value is ignored and set to step

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
currentValue - gets or sets the current value of the dial
currentValueEvent - gets or sets the current value and dispatches a change event if set and changed
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
min, max, step - read only - the assigned values
backing - gives access to the dial backing zim.Circle
inner and inner2 give access to any inner circles
ticks - gives access to the ticks (to scale these for example)
indicator - gives access to the indicator container with registration point at the dial center
indicatorShape - gives access to the shape on the end of the indicator (zim Triangle, Circle, Rectangle)
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when dial changes value (but not when setting currentValue property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+63
	zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, indicatorType, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit, keyArrows, keyArrowsStep) {

		var sig = "min, max, step, width, color, indicatorColor, indicatorScale, indicatorType, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit, keyArrows, keyArrowsStep";
		var duo; if (duo = zob(zim.Dial, arguments, sig, this)) return duo;
		z_d("63");
		this.zimContainer_constructor();
		this.type = "Dial";

		if (zot(min)) min = 0;
		if (zot(max)) max = 10;
		if (max-min == 0) {zog("ZIM Dial range must not be 0"); return;}
		if (zot(step)) step = 1;
		if (zot(width)) width = 100;
		if (zot(color)) color = "#666";
		if (zot(indicatorColor)) indicatorColor = "#222";
		if (zot(indicatorScale)) indicatorScale = 1;
		if (zot(indicatorType)) indicatorType = "arrow";
		if (zot(innerCircle)) innerCircle = true;
		if (zot(innerScale)) innerScale = .5;
		if (zot(useTicks)) useTicks = true;
		if (zot(innerTicks)) innerTicks = false;
		if (zot(tickColor)) tickColor = indicatorColor;
		if (zot(limit)) limit = true;
		if (zot(keyArrows)) keyArrows = true;
		if (zot(keyArrowsStep)) keyArrowsStep = (max-min)/100;

		var that = this;
		this.cursor = "pointer";

		var r = width / 2;
		var myValue = min; // includes the min
		var lastValue = 0; // does not include min (so always starts at 0)

		var backing = this.backing = new zim.Circle(r, color);
		this.addChild(backing);

		if (innerCircle) {
			var ic = (innerTicks) ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.1)";
			if (color=="black"||color=="#000"||color=="#000000"||color=="#111"||color=="#111111") ic = "#222";
			var inner = this.inner = new zim.Circle(r*innerScale, ic);
			this.addChild(inner);

			if (!innerTicks) {
				var ic2 = "rgba(0,0,0,.1)";
				var inner2 = this.inner2 = new zim.Circle(r*(innerScale-.1), ic2);
				this.addChild(inner2);
			}

		}

		var stepsTotal = Math.abs(max - min) / step;
		if (useTicks && step != 0) {
			ticks = this.ticks = new zim.Container();
			this.addChild(ticks);
			var tick;
			for (var i=0; i<stepsTotal+1; i++) {
				var tick = new zim.Rectangle(1, r*.2, tickColor);
				tick.regY = r * ((innerTicks) ? (innerScale-.05) : 1.28);
				tick.regX = .5;
				tick.rotation = (360 / (stepsTotal+1)) * i;
				ticks.addChild(tick);
			}
		}

		this.setBounds(-r,-r,width,width);
		if (indicatorType == "dot" || indicatorType == "circle") {
			var indicator = this.indicator = new zim.Container();
			var indicatorShape = this.indicatorShape = new zim.Circle(r*.19, indicatorColor);
			indicator.addChild(indicatorShape);
			zim.scale(indicator, indicatorScale);
			indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
		} else if (indicatorType == "line" || indicatorType == "rectangle") {
			var indicator = this.indicator = new zim.Container();
			var indicatorShape = this.indicatorShape = new zim.Rectangle(r * .1, r*.3, indicatorColor);
			indicator.addChild(indicatorShape);
			zim.scale(indicator, indicatorScale);
			indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
			indicator.regX = r * .05;
		} else { // arrow
			var indicator = this.indicator = new zim.Container();
			var indicatorShape = this.indicatorShape = new zim.Triangle(r*.4, r*.4, r*.4, indicatorColor);
			indicator.addChild(indicatorShape);
			zim.scale(indicator, indicatorScale);
			indicator.regY = r - indicator.getBounds().height*indicatorScale*((innerTicks)?.85:.75);
			if (innerTicks) {
				indicatorShape.rotation = 180;
			}
		}
		indicator.regY /= indicatorScale;
		this.addChild(indicator);

		function snap(v) {
			if (step == 0) return v;
			return Math.round(v/step)*step;
		}

		var lastAngle;
		var startAngle;
		var moveEvent;
		var upEvent;
		var lastA = 0;
		this.on("mousedown", function() {
			if (that.zimAccessibility && that.zimAccessibility.aria) return;
			lastAngle = indicator.rotation;
			var p = that.parent.globalToLocal(that.stage.mouseX, that.stage.mouseY);
			var dX = p.x-that.x;
			var dY = that.y-p.y;
			startAngle = Math.atan2(dX,dY)*180/Math.PI;
			var pressTime = new Date().getTime();
			moveEvent = that.on("pressmove", function() {
				p = that.parent.globalToLocal(that.stage.mouseX, that.stage.mouseY);
				dX = p.x-that.x;
				dY = that.y-p.y;
				var angle = lastAngle + Math.atan2(dX,dY)*180/Math.PI - startAngle;
				if (limit) {
					if (angle < 0) angle += 360;
					angle = angle % 360;
					if (Math.abs(angle-lastA) > 180) return;
				}
				lastA = angle;

				setValue(angle);
			});
			upEvent = this.on("pressup", function() {
				var deltaTime = new Date().getTime()-pressTime;
				if (deltaTime < 200) {
					p = that.parent.globalToLocal(that.stage.mouseX, that.stage.mouseY);
					dX = p.x-that.x;
					dY = that.y-p.y;
					var angle = Math.atan2(dX,dY)*180/Math.PI;
					setValue(angle);
				}
				lastAngle = indicator.rotation;
				that.off("pressmove", moveEvent);
				that.off("pressup", upEvent);
			});
		});

		function sign(n) {return n > 0 ? 1 : -1;}

		function setAccessibility() {
			if (that.zimAccessibility) that.zimAccessibility.changeTitle(that, null, true);
		}

		function setValue(angle) {
			var v; // value (not including min)
			if (angle < 0) angle += 360;
			angle = angle % 360;
			if (step != 0) {
				angle = Math.min(angle,  360 - 360 / (stepsTotal+1));
				v = snap(angle / (360 - 360 / (stepsTotal+1)) * (max - min));
				indicator.rotation = v * (360 - 360 / (stepsTotal+1)) / (max - min);
			} else {
				indicator.rotation = angle;
				v = (angle / 360) * (max - min);
			}
			if (v != lastValue) {
				lastValue = v;
				myValue = v + min;
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
			setAccessibility();
		}

		Object.defineProperty(this, 'currentValue', {
			get: function() {
				return myValue;
			},
			set: function(value) {
				if(zot(value)) return;
				if (min < max) {
					if (value < min) value = min;
					if (value > max) value = max;
				} else {
					if (value > min) value = min;
					if (value < max) value = max;
				}
				myValue = value;
				value = snap(value);
				if (step != 0) {
					indicator.rotation = (value - min) * (360 - 360 / (stepsTotal+1)) / (max - min);
				} else {
					indicator.rotation = (value - min) * 360 / (max - min);
				}
				lastValue = value - min;
				lastA = indicator.rotation;
				setAccessibility();
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(this, 'currentValueEvent', {
			get: function() {
				return myValue;
			},
			set: function(value) {
				if (value != that.currentValue) {
					that.currentValue = value;
					that.dispatchEvent("change");
				}
			}
		});

		Object.defineProperty(this, 'min', {
			get: function() {
				return min;
			},
			set: function(value) {
				if (zon) zog("min is read only");
			}
		});

		Object.defineProperty(this, 'max', {
			get: function() {
				return max;
			},
			set: function(value) {
				if (zon) zog("max is read only");
			}
		});

		Object.defineProperty(this, 'step', {
			get: function() {
				return step;
			},
			set: function(value) {
				if (zon) zog("step is read only");
			}
		});

		this.keyDownEvent = function(e) {
			if (that.focus || (!that.zimAccessibility && keyArrows)) {
				if (e.keyCode == 37 || e.keyCode == 40) {
					if (step > 0) that.currentValueEvent -= step;
					else that.currentValueEvent -= keyArrowsStep;
				} else if (e.keyCode == 38 || e.keyCode == 39){
					if (step > 0) that.currentValueEvent += step;
					else that.currentValueEvent += keyArrowsStep;
				}
			}
		}
		window.addEventListener("keydown", this.keyDownEvent);

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
				if (value) {
					window.addEventListener("keydown", that.keyDownEvent);
				} else {
					window.removeEventListener("keydown", that.keyDownEvent);
				}
			}
		});

		this.clone = function() {
			return that.cloneProps(new zim.Dial(min, max, step, width, color, indicatorColor, indicatorScale, indicatorType, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit, keyArrows, keyArrowsStep));
		}

		this.dispose = function() {
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Dial, zim.Container, "clone", "zimContainer", false);
	//-63

//***************** RADIAL  64

/*--
zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss)

Tabs
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional tab layout for along the edge of content.
Can also act as an independent button row or column.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var tabs = new zim.Tabs({tabs:["A", "B", "C", "D"], spacing:5, corner:14});
tabs.center(stage);
tabs.on("change", function() {
	zog(tabs.selectedIndex);
	zog(tabs.text);
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 240) overall width of tab set (ZIM divides the width across tabs and spacing)
height - (default 60) height of tabs
tabs - (default ["1","2","3","4"]) an array of tab objects with the following properties available:
	any tab specific properties will override the default values from other parameters
	[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
	label can be a String or a zim.Label object - default text color is white
color - (default "#333") the color of the selected tab (any CSS color)
rollColor - (default "#555") the rollover color (selected tabs do not roll over)
offColor - (default "#777") the color of a deselected tab when not rolled over
spacing - (default 1) is the pixels between tab buttons
currentEnabled - (default false) set to true to be able to press the selected tab button
corner - (default 0) the corner radius of the tabs (at the top when flatBottom is true)
labelColor - (default "white") the color of the label
flatBottom - (default true) flat bottom for tab shape set to false for button sets
keyEnabled - (default true) so tab key cycles through tabs, shift tab backwards
gradient - (default null) 0 to 1 (try .3) adds a gradient to the tabs
gloss - (default null) 0 to 1 (try .1) adds a gloss to the tabs

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
selectedIndex - gets or sets the selected index of the tabs
selected - gets the selected button - selected.enabled = true, etc.
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
tabs - gets or sets tabs object (will have to manually change buttons as well as adjust props)
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
text - gets current selected label text
label - gets current selected label object
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
keyEnabled - gets or sets whether the tab key and shift tab key cycles through tabs (does not affect accessibility)
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a tab changes (but not when setting selectedIndex property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+65
	zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss) {

		var sig = "width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss";
		var duo; if (duo = zob(zim.Tabs, arguments, sig, this)) return duo;
		z_d("65");
		this.zimContainer_constructor();
		this.type = "Tabs";

		if (zot(width)) width = 240;
		if (zot(height)) height = 60;
		if (zot(tabs) || tabs.length<=0) tabs = [{label:1},{label:2},{label:3},{label:4}];
		if (zot(color)) color = "#333";
		if (zot(rollColor)) rollColor = "#555";
		if (zot(offColor)) offColor = "#777";
		if (zot(currentEnabled)) currentEnabled = false;
		if (zot(spacing)) spacing = 1;
		if (zot(corner)) corner = 0;
		if (zot(labelColor)) labelColor = "white";
		if (zot(flatBottom)) flatBottom = true;
		if (zot(keyEnabled)) keyEnabled = true;

		var that = this;
		this.keyEnabled = keyEnabled;

		var myIndex = 0; // local value for this.selectedIndex
		var labels = []
		var buttons = [];
		var button; var t;
		var num = tabs.length;
		var tabW = (width - spacing*(num-1))/num;

		if (typeof tabs[0] == "number" || typeof tabs[0] == "string") { // change to objects with labels
			for (var i=0; i<tabs.length; i++) {
				tabs[i] = {label:String((tabs[i]!=null))?tabs[i]:"1"};
			}
		}
		// calculate widths
		var total = 0; var t;
		var newTabW; var nonSpecifiedCount = 0;
		for (var i=0; i<tabs.length; i++) {
			t = tabs[i];
			if (zot(t.width)) nonSpecifiedCount++;
			total += (zot(t.width))?tabW:t.width;
		}

		if (total > width - spacing*(num-1)) {
			// go back and assign proportional widths
			for (i=0; i<tabs.length; i++) {
				t = tabs[i];
				t.width = (width - spacing*(num-1)) / total * ((zot(t.width))?tabW:t.width);
			}
		} else if (Math.round(total) < Math.round(width - spacing*(num-1))) {
			// go back and readjust the average of non specified widths
			if (nonSpecifiedCount > 0) {
				newTabW = (num*tabW-(total-nonSpecifiedCount*tabW))/nonSpecifiedCount;
				for (i=0; i<tabs.length; i++) {
					t = tabs[i];
					t.width = ((zot(t.width))?newTabW:t.width);
				}
			} else {
				if (zon) zog("ZIM Tabs - total less than width");
				width = total + spacing*(num-1);
			}
		}

		var lastX = 0; var tColor;
		for (i=0; i<tabs.length; i++) {
			t = tabs[i];
			if (zot(t.label)) t.label = " ";
			tColor = (i==0)?((zot(t.color))?color:t.color):((zot(t.offColor))?offColor:t.offColor);
			if (typeof t.label === "string" || typeof t.label === "number") {
				t.label = new zim.Label(t.label, height/2, "arial", labelColor);
			}
			button = new zim.Button(
				(zot(t.width))?tabW:t.width,
				height, t.label, tColor,
				(zot(t.rollColor))?rollColor:t.rollColor,
				null, null, corner, -1, null, null, gradient, gloss, flatBottom
			)
			button.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(e) {
				change(e.currentTarget.znum);
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			});
			button.znum = i;
			t.label.znum = i;
			button.type = "TabsButton";
			labels.push(t.label);
			buttons.push(button);
			this.addChild(button);
			button.x = lastX;
			lastX = button.x + button.width + spacing;
			if (i==0 && !currentEnabled) button.enabled = false;
		};

		function change(num) {
			var t = tabs[myIndex];
			if (t) {
				buttons[myIndex].color = (zot(t.offColor))?offColor:t.offColor;
				if (!currentEnabled) buttons[myIndex].enabled = true;
			}
			myIndex = num;
			t = tabs[myIndex];
			if (t) {
				buttons[myIndex].color = (zot(t.color))?color:t.color;
				if (!currentEnabled) buttons[myIndex].enabled = false;
			}
		}

		window.addEventListener("keydown", function(e) {
			if (!that.keyEnabled || that.zimAccessibility) return;
			if (e.keyCode == 9) {
				var next = myIndex; // note that change updates the index
				if (e.shiftKey) {
					change((--next<0)?tabs.length-1:next);
				} else {
					change((++next>tabs.length-1)?0:next);
				}
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
				e.preventDefault();
			}
		});

		Object.defineProperty(this, 'selected', {
			get: function() {
				return buttons[myIndex];
			},
			set: function(value) {
				if (zon) zog("selected is read only - try selectedIndex");
			}
		});

		Object.defineProperty(this, 'selectedIndex', {
			get: function() {
				return myIndex;
			},
			set: function(value) {
				// change(Math.min(Math.max(value, 0), tabs.length-1));
				change(value);
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(this, 'tabs', {
			get: function() {
				return myIndex;
			},
			set: function(value) {
				change(Math.min(Math.max(value, 0), tabs.length-1));
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(this, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				color = value;
				if (zot(tabs[myIndex].color)) {
					buttons[myIndex].color = color;
					if (!zim.OPTIMIZE && that.stage) that.stage.update();
				}
			}
		});

		Object.defineProperty(this, 'rollColor', {
			get: function() {
				return rollColor;
			},
			set: function(value) {
				rollColor = value;
				for (var i=0; i<tabs.length; i++) {
					if (zot(tabs[myIndex].rollColor)) {
						buttons[i].rollColor = rollColor;
					}
				}
			}
		});

		Object.defineProperty(this, 'offColor', {
			get: function() {
				return offColor;
			},
			set: function(value) {
				offColor = value;
				for (var i=0; i<tabs.length; i++) {
					if (zot(tabs[myIndex].offColor)) {
						buttons[i].color = offColor;
					}
				}
				if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
		});

		Object.defineProperty(this, 'label', {
			get: function() {
				return labels[myIndex];
			},
			set: function(value) {
				if (zon) zog("selected is read only - try selectedIndex");
			}
		});

		Object.defineProperty(this, 'text', {
			get: function() {
				return (labels[myIndex]!=null) ? labels[myIndex].text : undefined;
			},
			set: function(value) {
				if (zon) zog("selected is read only - try selectedIndex");
			}
		});

		Object.defineProperty(this, 'buttons', {
			get: function() {
				return buttons;
			},
			set: function(value) {
				if (zon) zog("buttons is read only");
			}
		});

		Object.defineProperty(this, 'labels', {
			get: function() {
				return labels;
			},
			set: function(value) {
				if (zon) zog("labels is read only");
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
			}
		});

		this.clone = function() {
			var tabsCopy = zim.copy(tabs);
			for (var i=0; i<tabsCopy.length; i++) {
				tabsCopy[i].label = tabsCopy[i].label.clone();
			}
			return that.cloneProps(new zim.Tabs(width, height, tabsCopy, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss));
		}

		this.dispose = function() {
			for (var i=0; i<that.buttons.length; i++) {
				that.buttons[i].dispose();
				that.labels[i].dispose();
				that.buttons[i].removeAllEventListeners();
			}
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Tabs, zim.Container, "clone", "zimContainer", false);
	//-65

/*--
zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor)

Pad
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A pad that has rows and cols made of square keys.
When the keys are pressed the pad will dispatch a change event - get the selectedIndex or text property.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var pad = new zim.Pad();
pad.center(stage);
pad.on("change", function() {
	zog(pad.selectedIndex); // 0-8
	zog(pad.text); // 1-9
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 150) overall width of pad (ZIM divides the width across cols and spacing)
cols - (default 3) the columns in the pad
rows - (default cols) the rows in the pad
keys - (default an Array for cols x rows) an array of key objects with the following properties available:
	any key specific properties will override the default values from other parameters
	[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
	the label can be a String or a zim.Label object - default text color is white
color - (default "#333") the color of the selected tab (any CSS color)
rollColor - (default "#555") the rollover color (selected keys do not roll over)
offColor - (default "#777") the color of a deselected key when not rolled over
spacing - (default 1) is the pixels between key buttons
currentEnabled - (default true) set to false to make selected key not pressable
corner - (default 0) the corner radius of the keys
labelColor - (default "white") the color of the label

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
selectedIndex - gets or sets the selected index of the pad
selected - gets the selected button - selected.enabled = true, etc.
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
text - gets current selected label text
label - gets current selected label object
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
tabs - an array of the zim Tab objects (one object per row)
enabled - default is true - set to false to disable
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a pad changes (but not when setting selectedIndex property)

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+66
	zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor) {

		var sig = "width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor";
		var duo; if (duo = zob(zim.Pad, arguments, sig, this)) return duo;
		z_d("66");
		this.zimContainer_constructor();
		this.type = "Pad";

		// the other parameters will be handled by the Tabs object for each row
		if (zot(width)) width = 150;
		if (zot(cols)) cols = 3;
		if (zot(rows)) rows = cols;
		if (zot(keys)) {keys = []; for (var i=1; i<=rows*cols; i++){keys.push(i);}}
		if (zot(currentEnabled)) currentEnabled = true;
		if (zot(spacing)) spacing = 1;

		var that = this;
		var myIndex;

		this.cols = cols; // read only
		this.rows = rows;

		var height = width / cols - spacing;
		var rowTabs = [];
		var count = 0;
		var r;
		this.labels = [];
		this.buttons = [];
		for (var i=0; i<rows; i++) {
			var rowKeys = [];
			for (var j=0; j<cols; j++) {
				rowKeys.push((keys[count]!=null) ? keys[count] : "");
				count++;
			}
			r = rowTabs[i] = new zim.Tabs(width, height, rowKeys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, false, false);
			this.labels = this.labels.concat(r.labels);
			this.buttons = this.buttons.concat(r.buttons);
			this.addChild(r);
			r.selectedIndex = -1;
			r.y = (height+spacing)*i;
			r.znum = i;
			r.on("change", pressKey);
		}
		this.tabs = rowTabs;
		function pressKey(e) {
			var r = e.target;
			that.selected = r.selected;
			that.text = r.text;
			that.label = r.label;
			var s = r.selectedIndex; // store selected then clear all in pad
			for (var i=0; i<rowTabs.length; i++) {
				rowTabs[i].selectedIndex = -1;
			}
			r.selectedIndex = s; // restore selected
			myIndex = r.znum * cols + s; // calculate pad selected
			that.dispatchEvent("change");
			if (!zim.OPTIMIZE && that.stage) that.stage.update();
		}

		Object.defineProperty(this, 'selectedIndex', {
			get: function() {
				return myIndex;
			},
			set: function(value) {
				myIndex = value;
				for (var i=0; i<rowTabs.length; i++) {
					rowTabs[i].selectedIndex = -1;
				}
				var tabNum = Math.floor(myIndex / cols);
				if (tabNum >= 0 && tabNum < that.tabs.length) {
					that.tabs[tabNum].selectedIndex = myIndex % cols;
				}
			}
		});

		this._enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return that._enabled;
			},
			set: function(value) {
				zenable(that, value);
			}
		});

		this.clone = function() {
			return that.cloneProps(new zim.Pad(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor));
		}

		this.dispose = function() {
			for (var i=0; i<that.tabs.length; i++) {
				that.tabs[i].dispose();
			}
			that.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.Pad, zim.Container, "clone", "zimContainer", false);
	//-66

/*--
zim.Tile = function(obj, cols, rows, spacingH, spacingV, mirrorH, mirrorV)

Tile
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Creates a tile using clones of the object specified for the columns and rows specified.
Was intended to tile a single object but you can pass in a ZIM VEE value to tile multiple objects.
Can also mirror alternate tiles.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle();
var tile = new zim.Tile(circle, 20, 10).center(stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj, cols, rows, spacingH, spacingV, mirrorH, mirrorV

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

--*///+66.5
	zim.Tile = function(obj, cols, rows, spacingH, spacingV, mirrorH, mirrorV) {
		var sig = "obj, cols, rows, spacingH, spacingV, mirrorH, mirrorV";
		var duo; if (duo = zob(zim.Tile, arguments, sig, this)) return duo;
		z_d("66.5");
		this.zimContainer_constructor();
		this.type = "Tile";

		if (zot(cols)) cols = 1;
		if (zot(rows)) rows = 1;
		if (zot(spacingH)) spacingH = 0;
		if (zot(spacingV)) spacingV = 0;
		if (zot(mirrorH)) mirrorH = false;
		if (zot(mirrorV)) mirrorV = false;

		var that = this;
		var tile;
		var width = obj.width;
		var height = obj.height;
		if (!width || !height) {if (zon) {zog("ZIM Display: Tile() obj must have width and height");} return;}
		for (var j=0; j<rows; j++) {
			for (var i=0; i<cols; i++) {
				tile = (i+j==0) ? zik(obj) : zik(obj).clone();
				this.addChild(tile);
				if (mirrorH && i%2==1) {
					tile.scaleX = -tile.scaleX;
					tile.x = i*(width+spacingH)+width;
				} else {
					tile.x = i*(width+spacingH);
				}
				if (mirrorV && j%2==1) {
					tile.scaleY = -tile.scaleY;
					tile.y = j*(height+spacingV)+height;
				} else {
					tile.y = j*(height+spacingV);
				}
			}
		}
		this.clone = function() {
			return that.cloneProps(new zim.Tile(obj, cols, rows, spacingH, spacingV, mirrorH, mirrorV));
		}
	}
	zim.extend(zim.Tile, zim.Container, "clone", "zimContainer", false);
	//-66.5

/*--
zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor, keyArrows)

ColorPicker
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional color picker which shows 256 Web colors by default or custom colors.
Can additionally show 16 greys and / or an alpha slider.
Picking on a color sets the swatch color and the selectedColor property.
OK dispatches a change event if the color changed or a close event if not.
The X dispatches a close event.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var cp = new zim.ColorPicker();
cp.center(stage);
cp.on("change", function() {
	zog(cp.selectedColor); // #ffcc99, etc. after pressing OK
	zog(cp.selectedAlpha); // 0-1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 500) the width of the color picker
colors - (default 256 Web colors) an optional list of colors ["red", "#CCC", etc.]
cols - (default 10) how many columns to use if you pass in custom colors
spacing - (default 2) is the space between the color squares
greyPicker - (default true) shows an extra 16 greys (set to false to hide these)
	for the default colors it also includes 2 starting colors that record last picked colors
alphaPicker - (default true) shows an alpha slider (set to false to hide this)
	the swatch has a black, grey and white backing underneath to show multiple alpha effects
startColor - (default the last color in color array) the starting color
drag - (default true (false if no buttonBar)) whether you can drag the component - set to false to not drag
	a small grip under the color text shows if draggable
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no drop shadow
shadowBlur - (default 14) the blur of the shadow if shadow is set
buttonBar - (default true) set to false to hide the button bar with OK and X (close)
circles - (default false) set to true to show colors in circles rather than squares
indicator - (default true) set to false to remove indicator from currentColor
backingColor - (default black) the color of the backing
keyArrows - (default true) set to false to disable keyboard arrows

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
selectedColor - gets or sets the selected color swatch
currentValue - same as selectedColor but consistent with other components
currentValueEvent - gets or sets the current value and dispatches a change event if set and changed
selectedAlpha - gets or sets the selected alpha (set does not work if alphaPicker is false)
selectedIndex - get or sets the selected index of the colorPicker
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
swatch - gets the zim.Rectangle that is the color swatch
swatchBacking - gets the createjs.Shape that is under the swatch (seen if alpha set low)
swatchText - gets the zim.Label that shows the color text
grip - gets the createjs.Shape for the grip if the panel is dragable
backing - gets the zim.Rectangle that is the backing (cp.backing.color = "white" - now a backingColor parameter)
okBut - references the OK zim.Button
closeBut - references the X zim.Button
indicator - gets the zim shape that is the indicator (if indicator is true)
NOTE: alphaPicker is true:
alpaBacking - gets reference to the zim.Rectangle that makes the backing for the alpha slider
alphaBut - the zim.Button on the alpha slider
alphaSlider - the zim.Slider for the alpha
alphaText - the zim.Label for the alpha
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "set" event when a different color or alpha is selected and updated in the picker if the buttonBar is showing
dispatches a "change" event when the OK button is activated and the color or alpha is different than before
	or if buttonBar is false dispatches "change" when a new color or alpha is selected
dispatches a "close" event if the OK button is activated and the color has not changed or the X button is pressed

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+67
	zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor, keyArrows) {

		var sig = "width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor, keyArrows";
		var duo; if (duo = zob(zim.ColorPicker, arguments, sig, this)) return duo;
		z_d("67");
		this.zimContainer_constructor();
		this.type = "ColorPicker";

		if (zot(width)) width = 500;
		if (zot(colors)) standard = true;
		if (zot(cols)) cols = 10;
		if (zot(spacing)) spacing = 2;
		if (zot(alphaPicker)) alphaPicker = true;
		if (zot(greyPicker)) greyPicker = true;
		if (zot(shadowColor)) shadowColor = "rgba(0,0,0,.3)";
		if (zot(shadowBlur)) shadowBlur = 14;
		if (zot(buttonBar)) buttonBar = true;
		if (zot(drag)) {
			if (buttonBar) {
				drag = true;
			} else {
				drag = false;
			}
		}
		if (zot(circles)) circles = false;
		if (zot(indicator)) {
			indicator = false;
			if (!buttonBar) indicator = true;
		}
		if (zot(backingColor)) backingColor = "black";
		if (zot(keyArrows)) keyArrows = true;

		var that = this;

		var secondLastColor = "#e472c4"; // only used on standard colors
		var thirdLastColor = "#50c4b7";
		var lastAlpha = 1;
		var myAlpha = 1;

		var box = new createjs.Shape(); // shape that holds all colors and greys
		this.addChild(box);
		box.x += spacing;
		box.y += spacing;

		var standard = false;
		var colorsTemp; var w;
		var greys = [];
		if (zot(colors)) {
			standard = true;
			var num = 6; // six sets 0,3,6,9,C,F - for Web colors
			var tot = num*num*num;
			num = Math.ceil(Math.pow(tot,1/2));
			w = (width - spacing)/18-spacing;
			var f = Math.floor(Math.pow(num*num, 1/3));
			colorsTemp = [];
			for (var i=0; i<6; i++) {
				for (var j=0; j<6; j++) {
					for (var k=0; k<6; k++) {
						colorsTemp.push("#" + con(i*3) + con(j*3) + con(k*3));
					}
				}
			}
			colors = []; // flip every six by six sideways and put on two lines
			var c, r, nC, nR;
			for (i=0; i<colorsTemp.length; i++) {
				c = Math.floor(i/6);
				r = i%6;
				if (c >= 6*3) {f = 1;} else {f = 0;}
				nC = c-f*6*3;
				nR = r+f*6;
				colors[nR*18+nC] = colorsTemp[i];
			}
			cols = 18;
			greys = [thirdLastColor, secondLastColor];
		} else {
			w = (width - spacing) / cols - spacing;
		}
		var rows = Math.ceil(colors.length/cols);

		var myColor = String(colors[colors.length-1]);
		if (!zot(startColor)) myColor = String(startColor);
		var lastColor = thirdLastColor;

		function con(n) {
			n = Math.floor(n).toString(16);
			return n + "" + n;
		}

		var g = box.graphics; var f=0; var color, r, c, rX , rY;
		for (i=0; i<colors.length; i++) {
			c = i%cols;
			r = Math.floor(i/cols);
			rX = c*(w+spacing);
			rY = r*(w+spacing);
			if (circles) {
				g.f(colors[i]).dc(rX+w/2,rY+w/2,w/2);
			} else {
				g.f(colors[i]).r(rX,rY,w,w);
			}
		}
		var lastHeight = rY + w + spacing;

		var greyHeight = lastHeight;
		if (greyPicker) {
			for (i=0; i<16; i++) {
				greys.push("#"+con(i)+con(i)+con(i));
			}
			for (i=0; i<greys.length; i++) {
				c = Math.floor(i/cols);
				r = i%cols;
				rX = r*(w+spacing);
				rY = c*(w+spacing)+lastHeight;
				if (circles) {
					g.f(greys[i]).dc(rX+w/2,rY+w/2,w/2);
				} else {
					g.f(greys[i]).r(rX,rY,w,w);
				}
			}
			lastHeight = rY + w + spacing;
			var greyCols = cols;
			var greyRows = Math.ceil(greys.length/cols);
		}
		if (indicator) {
			indicator = this.indicator = circles ? new zim.Circle(w/2*.5) : new zim.Rectangle(w*.5, w*.5);
			indicator.alpha = .5;
			indicator.centerReg();
			this.addChild(indicator);
			function positionIndicator(i) {
				if (myColor == "#000" || myColor == "#000000" || myColor == "black") {
					indicator.color = "#222";
					indicator.alpha = 1;
				} else {
					indicator.color = "black";
					indicator.alpha = .5;
				}
				indicator.x = box.x + i%cols*(w+spacing) + w/2;
				indicator.y = box.x + Math.floor(i/cols)*(w+spacing) + w/2;
			}
			positionIndicator(colors.indexOf(myColor));
		}

		var margin = 10;

		if (alphaPicker) {
			var alpha = new zim.Container();
			alpha.setBounds(0,0,600,70);
			this.addChild(alpha);
			alpha.x = 0;
			alpha.y = lastHeight;

			var alphaBacking = this.alphaBacking = new zim.Rectangle(600-margin*2, 50, "#222", null, null, 0);
			alpha.addChild(alphaBacking);
			zim.centerReg(alphaBacking, alpha);

			var sliderBut = this.alphaBut = new zim.Button({width:20,height:30,label:"",corner:0,hitPadding:20});
			var slider = this.alphaSlider = new zim.Slider(0,1,.05,sliderBut,600*.55);
			slider.currentValue = 1;
			alpha.addChild(slider);
			slider.x = 40;
			slider.y = alpha.height/2;

			var alphaText = this.alphaText = new zim.Label("Alpha: 1", 30, null, "orange");
			alpha.addChild(alphaText);
			alphaText.x = slider.x + slider.bar.width + 40;
			alphaText.y = alpha.height/2 - alphaText.height/2;

			alpha.scaleX = alpha.scaleY = width / 600;

			slider.on("change", function() {
				alphaText.text = "Alpha: " + decimals(slider.currentValue);
				if (swatch) {
					swatch.alpha = myAlpha = slider.currentValue;
				}
				if (buttonBar) {
					that.dispatchEvent("set");
				} else {
					that.dispatchEvent("change");
				}
				if (that.stage) that.stage.update();
			});
			lastHeight += alpha.height-margin;
		}

		if (buttonBar) {
			var nav = new zim.Container();
			nav.setBounds(0,0,600,100);
			this.addChild(nav);
			nav.x = 0;
			nav.y = lastHeight+margin;

			var swatchText = this.swatchText = new zim.Label(myColor.toUpperCase().substr(0,7), 30, null, "orange");
			nav.addChild(swatchText);
			zim.centerReg(swatchText);
			swatchText.x = 200/2-10;
			swatchText.y = 50-2;

			if (drag) {
				var grip = this.grip = new createjs.Shape();
				nav.addChild(grip);
				grip.graphics.f("rgba(256,256,256,.25)").r(0,0,5,20).r(10,0,5,20).r(20,0,5,20).r(30,0,5,20);
				grip.x = 70; grip.y = 65;
				swatchText.y = 50-10;
			}

			var closeBut = this.closeBut = new zim.Button(90, 90, "X", "#222", "#444", null,null,0);
			nav.addChild(closeBut);
			closeBut.x = 600 - closeBut.width - margin;
			closeBut.y = 0;
			closeBut.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(){that.dispatchEvent("close");});

			var button = this.okBut = new zim.Button(150, 90, "OK", "#222", "#444", null,null,0);
			nav.addChild(button);
			button.x = closeBut.x - button.width - margin;
			button.y = 0;
			button.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", doChange);

			var swatchBacking = this.swatchBacking = new createjs.Shape();
			nav.addChild(swatchBacking);
			var g = swatchBacking.graphics;
			g.f("black").r(0.5,0.5,50,89).f("#666").r(50,0.5,50,89).f("white").r(100,0.5,49.5,89);
			swatchBacking.x = button.x - 150 - margin;
			swatchBacking.y = 0;

			var swatch = this.swatch = new zim.Rectangle(150, 90, myColor);
			nav.addChild(swatch);
			swatch.x = swatchBacking.x;
			swatch.y = 0;
			swatch.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", doChange);
			swatch.cursor = "pointer";

			nav.scaleX = nav.scaleY = width / 600;
			lastHeight += nav.height;
		} else {
			box.cursor = "pointer";
		}

		if (!alphaPicker && !buttonBar) {
			lastHeight -= margin - spacing;
		}

		var height = lastHeight + margin;
		this.setBounds(0,0,width,height);

		var backing = this.backing = new zim.Rectangle(width,height,backingColor);
		this.addChildAt(backing,0);
		if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);

		function doChange(){
			if (myColor != lastColor || myAlpha != lastAlpha) {
				if (standard && greyPicker) {
					thirdLastColor = secondLastColor;
					secondLastColor = lastColor;
					var lastColors = [thirdLastColor, secondLastColor]
					for (i=0; i<2; i++) {
						var g = box.graphics;
						c = Math.floor(i/cols);
						r = i%cols;
						rX = r*(w+spacing);
						rY = c*(w+spacing)+greyHeight;
						greys[i] = lastColors[i];
						g.f(backing.color).r(rX-1,rY-1,w+2,w+2).f(lastColors[i]).r(rX,rY,w,w);
					}
					if (!zim.OPTIMIZE && that.stage) that.stage.update();
				}
				lastColor = myColor;
				lastAlpha = myAlpha;

				that.dispatchEvent("change");
			} else {
				that.dispatchEvent("close");
			}
		}

		if (drag) {
			var diffX, diffY;
			backing.on("mousedown", function(e) {
				diffX = e.stageX - that.x;
				diffY = e.stageY - that.y;
				backing.cursor = "move";
			});
			backing.on("pressmove", function(e) {
				that.x = e.stageX-diffX;
				that.y = e.stageY-diffY;
				if (that.stage) that.stage.update();
			});
			backing.on("pressup", function(e) {
				backing.cursor = "default";
				if (that.stage) that.stage.update();
			});
		}

		var gridW = cols*(w+spacing);
		var gridH = rows*(w+spacing);
		if (greyPicker) {
			var greyW = greyCols*(w+spacing);
			var greyH = greyRows*(w+spacing);
		}
		box.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function() {
			var index = zim.hitTestGrid(box, gridW, gridH, cols, rows, that.stage.mouseX, that.stage.mouseY, 0, 0, spacing, spacing);
			if (!zot(index)) {
				myColor = colors[index];
				if (buttonBar) {
					swatch.color = myColor;
					swatchText.text = String(colors[index]).toUpperCase().substr(0,7);
					zim.centerReg(swatchText);
					if (myColor != lastColor) that.dispatchEvent("set");
				} else {
					doChange();
				}
			}
			if (greyPicker) {
				// note greyW not gridW
				index = null;
				index = zim.hitTestGrid(box, greyW, greyH, greyCols, greyRows, that.stage.mouseX, that.stage.mouseY, 0, gridH, spacing, spacing);

				if (!zot(index)) {
					myColor = greys[index];
					if (buttonBar) {
						swatch.color = myColor;
						swatchText.text = greys[index].toUpperCase();
						zim.centerReg(swatchText);
						if (myColor != lastColor) that.dispatchEvent("set");
					} else {
						doChange();
					}
				}
			}
			if (indicator) positionIndicator(colors.indexOf(myColor));
			if (buttonBar) {
				if (that.stage) that.stage.update();
			} else if (indicator) {
				if (that.stage) that.stage.update();
				// if (!zim.OPTIMIZE && that.stage) that.stage.update();
			}
			setAccessibility();
		});

		Object.defineProperty(this, 'selectedColor', {
			get: function() {
				return myColor;
			},
			set: function(value) {
				lastColor = myColor = value;
				if (buttonBar) {
					swatch.color = myColor;
					swatchText.text = myColor;
					zim.centerReg(swatchText);
					if (that.stage) that.stage.update();
				}
				if (indicator) positionIndicator(colors.indexOf(myColor));
				setAccessibility();
			}
		});

		Object.defineProperty(this, 'currentValue', { // alternate to selectedColor
			get: function() {
				return myColor;
			},
			set: function(value) {
				that.selectedColor = value;
			}
		});

		Object.defineProperty(this, 'currentValueEvent', { // currentValue and also triggers change event
			get: function() {
				return myColor;
			},
			set: function(value) {
				if (value != that.selectedColor) {
					that.selectedColor = value;
					that.dispatchEvent("change");
				}
			}
		});

		Object.defineProperty(this, 'selectedIndex', {
			get: function() {
				return colors.indexOf(myColor);
			},
			set: function(value) {
				lastColor = myColor = colors[value];
				if (buttonBar) {
					swatch.color = myColor;
					swatchText.text = myColor;
					zim.centerReg(swatchText);
					if (that.stage) that.stage.update();
				}
				if (indicator) positionIndicator(colors.indexOf(myColor));
				setAccessibility();
			}
		});

		Object.defineProperty(this, 'selectedAlpha', {
			get: function() {
				if (alphaPicker) {
					return decimals(slider.currentValue);
				} else {
					return 1;
				}
			},
			set: function(value) {
				if (alphaPicker) {
					lastAlpha = slider.currentValue = value;
					if (swatch) swatch.alpha = lastAlpha;
					if (alphaText) alphaText.text = "Alpha: " + decimals(slider.currentValue);
					if (that.stage) that.stage.update();
				}
			}
		});


		Object.defineProperty(this, 'colors', {
			get: function() {
				if (greyPicker) return colors.concat(greys);
				else return colors;
			},
			set: function(value) {
				if (zon) zog("Display - ColorPicker() colors is read only - make a new ColorPicker to change")
			}
		});

		function setAccessibility() {
			if (that.zimAccessibility) that.zimAccessibility.changeTitle(that, null, true);
		}

		this.keyDownEvent = function(e) {
			if (that.focus || (!that.zimAccessibility && keyArrows)) {
				var currentTemp = that.selectedIndex;
				if (e.keyCode == 37 || e.keyCode == 40) {
					currentTemp--;
					changeMe();
				} else if (e.keyCode == 38 || e.keyCode == 39){
					currentTemp++;
					changeMe();
				}
				function changeMe() {
					if (currentTemp < 0) currentTemp = that.colors.length-1;
					if (currentTemp > that.colors.length-1) currentTemp = 0;
					that.selectedIndex = currentTemp;
					that.dispatchEvent("change");
					if (that.stage) that.stage.update();
				}
			}
		}
		window.addEventListener("keydown", this.keyDownEvent);

		function decimals(n) {
			return Math.round(n*Math.pow(10, 2))/Math.pow(10, 2);
		}

		this.clone = function() {
			return that.cloneProps(new zim.ColorPicker(width, standard?null:colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur, buttonBar, circles, indicator, backingColor, keyArrows));
		}

		this.dispose = function() {
			window.removeEventListener("keydown", that.keyDownEvent);
			slider.dispose();
			box.removeAllEventListeners();
			backing.removeAllEventListeners();
			closeBut.removeAllEventListeners();
			swatch.removeAllEventListeners();
			button.removeAllEventListeners();
			return true;
		}
	}
	zim.extend(zim.ColorPicker, zim.Container, "clone", "zimContainer", false);
	//-67

/*--
zim.Loader = function(frame, width, height, drop, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed)

Loader
zim class - extends a zim.Button which extends a createjs.Container

DESCRIPTION
Loader lets you upload images and acces them as a zim.Bitmap (available in the loaded event function)
Loader uses the HTML input type=file tag and overlays this with a createjs DOMElement.
Loader is a zim.Button so can be displayed for the user to click on.
It defaults to a dashed line region as you can also drag and drop files to the loader.
You can also save an image using the save() method to a new browser window for the user to save

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var loader = new zim.Loader({
	frame:frame,
	label:"UPLOAD PIC OR DROP PICS HERE",
	width:700,
	height:400,
	corner:50
}).center(stage);
loader.on("loaded", function(e) {
	zim.loop(e.bitmaps, function(bitmap){
		bitmap.centerReg(stage).drag();
	});
	loader.removeFrom(stage);
	stage.update();
});

// and to later save for instance in a button event:
saveButton.on("click") {
	loader.save(stage); // or some other container... can specify crop bounds too
}
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
frame - a reference to the zim.Frame (required to scale and position the HTML input tag)
width - (default 250) the width of the button
height - (default 70) the height of the button
label - (default "UPLOAD PIC") ZIM Label or plain text with default settings (50% black)
color - (default "rgba(0,0,0,.05)") backing color of button (any CSS color)
rollColor - (default "rgba(0,0,0,.1)") rollover color of button
borderColor - (default rgba(0,0,0,.3)) the color of the border
borderWidth - (default 1) thickness of the border
corner - (default 0) the round of the corner (set to 0 for no corner)
shadowColor - (default "rgba(0,0,0,.3)") set to -1 for no shadow
shadowBlur - (default 14) how blurred the shadow is if the shadow is set
hitPadding - (default 0) adds extra hit area to the button (good for mobile)
gradient - (default 0) 0 to 1 (try .3) adds a gradient to the button
gloss - (default 0) 0 to 1 (try .1) adds a gloss to the button
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)
backing - (default null) a Display object for the backing of the button (eg. Shape, Bitmap, Container, Sprite)
	see ZIM Pizzazz module for a fun set of Button Shapes like Boomerangs, Ovals, Lightning Bolts, etc.
	http://zimjs.com/code/bits/view/pizzazz.html
rollBacking - (default null) a Display object for the backing of the rolled-on button
rollPersist - (default false) set to true to keep rollover state when button is pressed even if rolling off
icon - (default false) set to display object to add icon at the center of the button and remove label
	http://zimjs.com/code/bits/view/icons.html
rollIcon - (default false) set to display object to show icon on rollover
toggle - (default null) set to string to toggle with label or display object to toggle with icon or if no icon, the backing
rollToggle - (default null) set to display object to toggle with rollIcon or rollBacking if no icon
	there is no rollToggle for a label - that is handled by rollColor on the label
toggleEvent - (default mousedown for mobile and click for not mobile) what event causes the toggle
dashed - (default true) set to false to turn off the dashed for the border

PROPERTIES
type - holds the class name as a String
tag - the HTML input tag of type file - used for uploading

zim.Button properties:
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing of the button
rollBacking - references the rollBacking (if set)
icon - references the icon of the button (if set)
rollIcon - references the rollIcon (if set)
toggleObj - references the toggle object (string or display object if set)
rollToggle - references the rollToggle (if set)
toggled - true if button is in toggled state, false if button is in original state
enabled - default is true - set to false to disable
rollPersist - default is false - set to true to keep rollover state when button is pressed even if rolling off
color - get or set non-rolled on backing color (if no backing specified)
rollColor - get or set rolled on backing color
focus - get or set the focus property of the Button used for tabOrder
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

METHODS
resize() - call the resize event if the scale or position of the Loader is changed
	this will sync the location of the HTML input tag
	resize() is only needed if the scale or x, y of the Loader (or its container) is changed
	it is not needed for general window resizing - the Loader handles this
save(content, x, y, width, height, url, cached, cachedBounds, type) - save a picture (supports ZIM DUO)
	content - the Display object to be saved such as a Container, Bitmap, etc.
	x, y, width, height - the cropping bounds on that object otherwise defaults to 0,0,stageW,stageH
	cached - (default false) set to true if the object is currently already cached
	cachedBounds - if you are saving a different bounds than was previously cached
		setting the bounds here (createjs.Rectangle) will restore the cache to the previous bounds
	type - (default "png") set to "jpeg" for jpeg

zim.Button methods:
setBackings(newBacking, newRollBacking) - dynamically set backing and rollBacking on button (both default to null and if empty, removes backings)
setIcons(newIcon, newRollIcon) - dynamically set icon and rollIcon on button (both default to null and if empty, removes icons)
toggle(state) - forces a toggle of label if toggle param is string, else toggles icon if icon is set or otherwise toggles backing
	state defaults to null so just toggles
	pass in true to go to the toggled state and false to go to the original state
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
loaded - is dispatched when the image(s) are uploaded - the event object comes with the following properties:
	e.bitmaps - an array of zim.Bitmap objects of the loaded images
	e.bitmap - the first zim.Bitmap to be created from the loaded images
	e.lastBitmap - the last zim.Bitmap to be created from the loaded images
	e.total - the total zim.Bitmap objects to be created from the loaded images

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+67.5

	zim.Loader = function(frame, width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed) {

		var sig = "frame, width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed";
		var duo; if (duo = zob(zim.Loader, arguments, sig, this)) return duo;
		z_d("67.5");

		if (zot(frame)) {if (zon) {zog("zim.Loader - please provide a reference to zim Frame");} return;}
		if (zot(width)) width = 250;
		if (zot(height)) height = 70;
		if (zot(color)) color = "rgba(0,0,0,.05)";
		if (zot(rollColor)) rollColor = "rgba(0,0,0,.1)";
		if (zot(borderColor)) borderColor = "rgba(0,0,0,.3)";
		if (zot(borderWidth)) borderWidth = 1;
		if (zot(dashed)) dashed = true;
		if (zot(corner)) corner = 0;
		if (zot(label)) label = new zim.Label({
			text:"UPLOAD PIC", color:"rgba(0,0,0,.4)", valign:"center", align:"center"
		});

		this.zimButton_constructor(width, height, label, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom, backing, rollBacking, rollPersist, icon, rollIcon, toggle, rollToggle, toggleEvent, dashed);
		this.type = "Loader";
		var that = this;
		var stage = frame.stage;
		label = that.label;

		var uploadTag = that.tag = document.createElement("input");
		document.body.appendChild(uploadTag);
		uploadTag.setAttribute("type", "file");
		uploadTag.setAttribute("multiple", "multiple");
		uploadTag.setAttribute("aria-hidden", true);
		uploadTag.hidden = true;
		uploadTag.style.cssText = "border:thin solid grey; z-index:2; width:"+width+"px; height:" + height + "px; overflow:hidden; outline:none;"
			 + "position:absolute; left:0px; top:0px; display:none; cursor:pointer; opacity: 0; filter: alpha(opacity=0);"

		this.addEventListener('mousedown', function() { // added for zim.Accessibility
			uploadTag.click();
		});
		uploadTag.addEventListener('change', handleImage);
		var upload = new createjs.DOMElement(uploadTag);
		stage.addChild(upload);
		upload.alpha = 0;

		this.resize = function() {
			if (!that.stage) {
				uploadTag.setAttribute("aria-hidden", true);
				uploadTag.hidden = true;
				uploadTag.style.display = "none";
				// uploadTag.previosSibling.hidden = true;
				// uploadTag.previosSibling.style.display = "none";
				return;
			}
			uploadTag.setAttribute("aria-hidden", false);
			uploadTag.hidden = false;
			uploadTag.style.display = "block";
			// uploadTag.previosSibling.hidden = false;
			// uploadTag.previosSibling.style.display = "block";
			setTimeout(function() {
				var point = that.localToGlobal(0, 0);
				upload.x = frame.x + point.x * frame.scale;
				upload.y = frame.y + point.y * frame.scale;
				zim.scale(upload, frame.scale*that.scaleX, frame.scale*that.scaleY);
				stage.update();
			}, 50);
		}
		this.resize();
		that.on("added", function() {
			uploadTag.style.display = "block";
			uploadTag.hidden = false;
			uploadTag.style.display = "block";
			that.resize();
		});
		that.on("removed", function() {
			uploadTag.style.display = "none";
			uploadTag.hidden = true;
			uploadTag.style.display = "none";
		});
		frame.on("resize", that.resize);

		function handleImage(e) {
			var files;
			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				files = e.dataTransfer.files;
			} else {
				files = e.target.files;
			}
			var bitmaps = [];
			var firstBitmap;
			var lastBitmap;
			for (var i=0; i<files.length; i++) {
				(function(file) {
					var reader = new FileReader();
					reader.onload = function(event){
						var img = new Image();
						img.onload = function(){
							var bitmap = new zim.Bitmap(img);
							bitmaps.push(bitmap);
							if (bitmaps.length == 1) firstBitmap = bitmap;
							if (bitmaps.length == files.length) {
								var e = new createjs.Event("loaded");
								e.bitmaps = bitmaps;
								e.bitmap = firstBitmap;
								e.lastBitmap = bitmap;
								e.total = bitmaps.length;
								that.dispatchEvent(e);
								uploadTag.value = "";
							}
						}
						img.src = event.target.result;
					}
					reader.readAsDataURL(file);
				})(files[i]);
			};
		}
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			uploadTag.addEventListener("drop", function(e) {
				// first imageLoader change event triggers so remove event then add it again later
				uploadTag.removeEventListener('change', handleImage);
				handleImage(e);
				setInterval(function() {uploadTag.addEventListener('change', handleImage);}, 100);
			});
		}

		this.save = function(content, x, y, width, height, cached, cachedBounds, type) {
			var sig = "content, x, y, width, height, cached, cachedBounds, type";
			var duo; if (duo = zob(that.save, arguments, sig)) return duo;
			if (zot(content)) content = frame.stage;
			if (zot(x)) x = 0;
			if (zot(y)) y = 0;
			if (zot(width)) width = frame.width;
			if (zot(height)) height = frame.height;
			if (zot(type)) type = "png";

			content.cache(x, y, width, height);
			// if (!zot(url)) {
			// 	zim.async(url+"?data="+content.cacheCanvas.toDataURL('image/jpeg'), loaderReply);
			// 	function loaderReply(result) {
			// 		var e = new createjs.Event("saved");
			// 		e.result = result;
			// 		that.dispatchEvent(e);
			// 	}
			// // or to a script using zim.async (currently untested - will test and provide examples soon)
			// // saved - is dispatched when a file is saved to a script (needs the url parameter) - event object includes:
			// // e.result - the message sent back from the server in the zim.async.loaderReply('message')
			// } else {
				zgo(content.cacheCanvas.toDataURL('image/'+type), "_blank");
			// }
			if (cached) {
				if (cachedBounds) content.cache(cashedBound.x, cashedBound.y, cashedBound.width, cashedBound.height);
			} else {
				content.uncache();
			}
			return that;
		}

		this.clone = function() {
			var u = new zim.Loader(
				frame, width, height, !zot(label)?label.clone():null, color, rollColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom,
				!zot(backing)?backing.clone():null,
				!zot(rollBacking)?rollBacking.clone():null,
				rollPersist,
				!zot(icon)?icon.clone():null, !zot(rollIcon)?rollIcon.clone():null,
				!zot(toggle)?(typeof toggle == "string"?toggle:toggle.clone()):null,
				!zot(rollToggle)?rollToggle.clone():null,
				toggleEvent, dashed
			);
			return that.cloneProps(u);
		}
		this.dispose = function() {
			that.zimButton_dispose();
		 	that.removeAllEventListeners();
			that.removeChild(upload);
			document.body.removeChild(uploadTag);
			return true;
		}
	}
	zim.extend(zim.Loader, zim.Button, ["clone", "dispose"], "zimButton", false);
	//-67.5

/*--
zim.TextArea = function(frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly, spellCheck)

TextArea
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
TextArea creates an input text field by overlaying an HTML TextArea.
The TextArea is then overlayed with the createjs DOMElement
and scaled and positioned with ZIM code. This can also be used if selectable text is required
Access to the HTML tag is provided with the TextArea tag property.
So CSS Styles can be applied to the HTML tag as with any HTML textarea tag
The TextArea comes with a ZIM Rectangle in behind that you can adjust with parameters
or remove completely if you so desire using the TextArea backing property
ie. myTextArea.backing.alpha=0; or myTextArea.removeChild(myTextArea.backing)
Due to the HTML tag being overlayed, the TextArea.resize() must be called if it is moved
(This is called automatically when the stage is resized)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var textArea = new zim.TextArea(frame, 300, 200);
textArea.center(stage);

var label = new zim.Label({text:""}).addTo(stage).pos(20,20);
textArea.on("input", function() {
	label.text = textArea.text;
	stage.update();
});

// if manually scaled or positioned (or container is scaled or positioned)
// then the TextArea must be resized with the resize method
textArea.sca(.5).mov(200);
textArea.resize();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
frame - a reference to the zim.Frame (required to scale and position the HTML input tag)
width - (default 250) the width of the TextArea backing (the textarea field will be that less the padding*2)
height - (default 70) the height of the TextArea backing (the textarea field will be that less the padding*2)
size - (default 20) a Number for the font-size of the TextArea (do not use px on the end)
	to change the font, use CSS on the tag property: textArea.tag.style.fontFamily = "courier";
padding - (default 5) the pixels between the backing border and the HTML textarea
color - (default "#666") text color (any CSS color)
backingColor - (default "rgba(256,256,256,.1)") backing color of box
borderColor - (default rgba(0,0,0,.1)) the color of the border
borderWidth - (default 1) thickness of the border
corner - (default 0) the round of the corner (set to 0 for no corner)
shadowColor - (default null) the shadow color (css color) of a drop shadow
shadowBlur - (default null) pixels of how blurred the shadow is if the shadow is set - eg. 10
dashed - (default true) set to false to turn off the dashed for the border
id - (default null) a string id for the HTML textarea tag for CSS styling, etc.
placeholder - (default null) a string that is used for the HTML textarea tag placeholder parameter
readOnly - (default false) set to true to make TextArea read only (still selectable)
spellCheck - (default true) set to false to turn Browser spell check off

PROPERTIES
type - holds the class name as a String
currentValue - get or set the text content of the TextArea
text - the same as currentValue - for convenience...
readOnly - set to true to not be able to edit or to false to be able to edit (always can select)
tag - the HTML textarea tag - just a regular HMTL form tag which can be styled
backing - access to the zim.Rectangle() used for the backing
	you can remove this with yourTextArea.backing.removeFrom(yourTextArea);
	or adjust it dynamically with any of the Rectangle properties like color
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

METHODS
resize() - call the resize event if the scale or position of the TextArea is changed
	this will sync the location of the HTML textarea tag
	resize() is only needed if the scale or x, y of the TextArea (or its container) is changed
	it is not needed for general window resizing - the TextArea handles this
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the textarea tag

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

EVENTS
focus, blur are dispatched when the text area gains and loses focus
input is dispatched when the text area is typed or pasted into
change is dispatched when the text area is different after losing focus
These are just the html events passed on through - note the difference between input and change!

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+67.6

	zim.TextArea = function(frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly, spellCheck) {

		var sig = "frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly, spellCheck";
		var duo; if (duo = zob(zim.TextArea, arguments, sig, this)) return duo;
		z_d("67.6");

		if (zot(frame)) {if (zon) {zog("zim.TextArea - please provide a reference to zim Frame");} return;}
		if (zot(width)) width = 250;
		if (zot(height)) height = 70;
		if (zot(size)) size = 20;
		if (zot(padding)) padding = 5;
		if (zot(color)) color = "#666";
		if (zot(backingColor)) backingColor = "rgba(256,256,256,.1)";
		if (zot(borderColor)) borderColor = "rgba(0,0,0,.1)";
		if (zot(corner)) corner = 0;
		if (!zot(shadowBlur) && zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
		if (!zot(shadowColor) && zot(shadowBlur)) shadowBlur=10;

		this.zimContainer_constructor(width, height);
		this.type = "TextArea";
		var that = this;
		var stage = frame.stage;

		var backing = this.backing = new zim.Rectangle(width, height, backingColor, borderColor, borderWidth, corner, null, dashed);
		if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
		that.addChild(backing);
		var textareaTag = that.tag = document.createElement("textarea");
		document.body.appendChild(textareaTag);
		if (!zot(id)) {
			textareaTag.setAttribute("id", id);
			textareaTag.setAttribute("name", id);
		}
		if (readOnly) textareaTag.readonly = true;
		if (!spellCheck) textareaTag.spellcheck = false;
		if (!zot(placeholder)) textareaTag.setAttribute("placeholder", placeholder);
		textareaTag.style.cssText = "background-color:transparent; color:"+color+"; "
			 + "resize:none; z-index:3; width:"+(width-padding*2)+"px; height:"+(height-padding*2)+"px; overflow:hidden; outline:none;"
			 + "font-size:"+size+"px; font-family:verdana; border:none; position:absolute; left:0px; top:0px; display:none;"

		textareaTag.addEventListener('change', function() {that.dispatchEvent("change")});
		textareaTag.addEventListener('input', function() {that.dispatchEvent("input")});
		textareaTag.addEventListener('focus', function() {
			window.removeEventListener("keydown", frame.zil[0]);
			that.dispatchEvent("focus")
		});
		textareaTag.addEventListener('blur', function() {
			window.addEventListener("keydown", frame.zil[0]);
			that.dispatchEvent("blur")
		});
		var textarea = new createjs.DOMElement(textareaTag);
		textarea.alpha = 0;

		this.on('mousedown', function() {setTimeout(function(){textareaTag.focus();}, 100)}); // for zim Accessibility

		this.resize = function() {
			setTimeout(function() {
				var point = that.localToGlobal(padding, padding);
				textarea.x = frame.x + point.x * frame.scale;
				textarea.y = frame.y + point.y * frame.scale;
				zim.scale(textarea, frame.scale*that.scaleX, frame.scale*that.scaleY);
				textarea.alpha = 1;
				if (that.stage) stage.update();
			}, 50);
		}
		this.resize();
		that.on("added", function() {
			stage.addChild(textarea);
			textareaTag.style.display = "block";
			that.resize();
		});
		that.on("removed", function() {
			stage.removeChild(textarea);
			textareaTag.style.display = "none";
		});
		frame.on("resize", that.resize);

		Object.defineProperty(this, 'currentValue', {
			get: function() {
				return textareaTag.value;
			},
			set: function(value) {
				textareaTag.value = value;
			}
		});

		Object.defineProperty(this, 'text', {
			get: function() {
				return textareaTag.value;
			},
			set: function(value) {
				textareaTag.value = value;
			}
		});

		Object.defineProperty(this, 'readOnly', {
			get: function() {
				return textareaTag.readOnly;
			},
			set: function(value) {
				textareaTag.readOnly = value;
			}
		});

		this.clone = function() {
			var u = new zim.Loader(frame, width, height, size, padding, color, backingColor, borderColor, borderWidth, corner, shadowColor, shadowBlur, dashed, id, placeholder, readOnly, spellCheck);
			return that.cloneProps(u);
		}
		this.dispose = function() {
		 	that.removeAllEventListeners();
			that.removeChild(textarea);
			document.body.removeChild(textareaTag);
			return true;
		}
	}
	zim.extend(zim.TextArea, zim.Container, ["clone", "dispose"], "zimContainer", false);
	//-67.6

	// function to set enabled of components
	function zenable(t,v) {
		if (v) {
			t.mouseChildren = true;
			t.mouseEnabled = true;
			t._enabled = true;
		} else {
			t.mouseChildren = false;
			t.mouseEnabled = false;
			t._enabled = false;
		}
	}

////////////////  ZIM METHODS  //////////////

// Zim Methods (formerly Zim Create) adds functionality to CreateJS for multies (Interactive Features)
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com


/*--
obj.drag = function(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds)

drag
zim DisplayObject method

DESCRIPTION
Adds drag and drop to an object with a variety of options.
Handles scaled, rotated nested objects.

EXAMPLE
var radius = 50;
var circle = new zim.Circle(radius, "red");
circle.center(stage);
circle.drag();

// OR with chaining
var circle = new zim.Circle(radius, "red").center(stage).drag();

// OR with ZIM DUO
circle.drag({slide:true});

// OR with pre ZIM 4TH methods
zim.center(circle, stage);
zim.drag(circle);

// OR with ZIM DUO
zim.drag({obj:circle, slide:true});

// BOUNDS
// circle has its registration point in the middle
// keep registration point within rectangle starting at x=100, y=100
// and drag within a width of 500 and height of 400
// var dragBounds = new createjs.Rectangle(100,100,500,400);
// or keep circle on the stage with the following
var dragBounds = new createjs.Rectangle(radius,radius,stageW-radius,stageH-radius);
circle.drag(dragBounds); // drag within stage
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
rect - (default null) a createjs.Rectangle object for the bounds of dragging
	if surround is true then it will make sure the obj surrounds the rect rather than stays within it
	this rectangle is relative to the stage (global)
	if a rectangle relative to the object's parent is desired then set the localBounds parameter to true
overCursor, dragCursor - (default "pointer") the CSS cursor properties as strings
currentTarget - (default false) allowing you to drag things within a container
	eg. drag(container); will drag any object within a container
	setting currentTarget to true will then drag the whole container
swipe - (default false) which prevents a swipe from triggering when dragging
localBounds - (default false) which means the rect is global - set to true for a rect in the object parent frame
onTop - (default true) brings the dragged object to the top of the container
surround - (default false) is for dragging a big object that always surrounds the rect
slide - (default false) will let you throw the object and dispatch a slidestop event when done
slideDamp - (default .3) is the damping setting for the slide (1 is no damping and .1 will slide more, etc.)
slideSnap - (default true) lets the object go outside and snap back to bounds - also "vertical", "horizontal", and false
reg - (default false) when set to true will snap the registration of the object to the mouse position
removeTweens - (default true) will automatically remove tweens from dragged object unless set to false
startBounds - (default true) set to false to ignore bound rect before dragging (sometimes handy when putting drag on container)

note: will not update stage if zim.OPTIMIZE is set to true
unless zim.Ticker.update is set to true or you run zim.Ticker.always(stage) see zim.Ticker

RETURNS obj for chaining
--*///+31
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds) {

		var sig = "obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds";
		var duo; if (duo = zob(zim.drag, arguments, sig)) return duo;
		z_d("31");
		if (zot(obj) || !obj.on) return;
		obj.cursor = (zot(overCursor)) ? "pointer" : overCursor;
		if (zot(currentTarget)) currentTarget = false;
		if (zot(swipe)) swipe = false;
		if (zot(localBounds)) localBounds = false;
		if (zot(onTop)) onTop = true;
		if (zot(surround)) surround = false;
		if (zot(slide)) slide = false;
		if (zot(slideDamp)) slideDamp = .3;
		if (zot(slideSnap)) slideSnap = true;
		var snapOptions = ["horizontal", "vertical", "auto"];
		if (slideSnap !== true && snapOptions.indexOf(slideSnap) < 0) slideSnap = false;
		if (zot(reg)) reg = false;
		if (zot(removeTweens)) removeTweens = true;
		if (zot(startBounds)) startBounds = true;

		zim.setSwipe(obj, swipe);
		obj.zimDragRect = rect;
		obj.zimLocalBounds = localBounds;
		var downCheck = false;

		var diffX; var diffY; var point; var r;	var rLocal;
		obj.zimAdded = obj.on("added", initializeObject, null, true); // if not added to display list
		obj.zimRemoved = obj.on("removed", unInitializeObject, null, true);
		if (obj.parent) initializeObject();

		function initializeObject() {
			// check position right away if there is a bounding box
			// there is no mousedown so set the diffX and diffY to 0
			diffX = 0; diffY = 0;
			// positionObject() is used as well in the dragmove function
			// where it expects a global x and y
			// so convert obj.x and obj.y positions inside its parent to global:
			if (obj.zimDragRect) {
				if (localBounds) {
					r = zim.boundsToGlobal(obj.parent, obj.zimDragRect);
					if (surround) rLocal = obj.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(obj.parent, obj.zimDragRect, true); // flips to global to local
				}
			}

			if (r && startBounds) {
				point = obj.parent.localToGlobal(obj.x, obj.y);
				positionObject(obj, point.x, point.y);
			}
			if (slide) {
				obj.zimDragMoving = true;
				setUpSlide();
			}
		}

		function unInitializeObject() {
			if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
		}

		// set up damping for slide and variables used to predict future locations
		if (slide) {
			var dampX = new zim.Damp(obj.x, slideDamp);
			var dampY = new zim.Damp(obj.y, slideDamp);
			var back = 3; // how many ticks ago to estimate trajectory
			var lastCount = 0;
			var backX = [];
			var backY = [];
			var upX = obj.x; // mouse up translated to local
			var upY = obj.y;
			var objUpX = obj.x; // drag object x when mouse up
			var objUpY = obj.y;
			var lastBackX = obj.x; // used to calculate trajectory
			var lastBackY = obj.y;
			var lastX = -10000; // used to see if sliding object is still moving
			var lastY = -10000;
		}

		var dragObject;

		obj.pointers = {};
		obj.zimDown = obj.on("mousedown", function(e) {
			var id = "id"+Math.abs(e.pointerID+1);
			obj.pointers[id] = true; // keep track of multitouch to keep object ticker alive
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			// could use e.localX and e.localY but might be dragging container or contents
			dragObject = (currentTarget)?e.currentTarget:e.target;
			if (obj.zimDragRect && !dragObject.getBounds()) {zog("zim.drag() - drag object needs bounds set"); return;}
			downCheck = true;
			obj.stage.mouseMoveOutside = true;

			// add a function to the Ticker queue (remove it if there first)
			if (!slide) { // slide has a persistent Ticker function
				if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
				obj.zimDragTicker = zim.Ticker.add(function(){}, obj.stage);
			}

			if (removeTweens) createjs.Tween.removeTweens(dragObject);
			if (onTop) dragObject.parent.setChildIndex(dragObject,dragObject.parent.numChildren-1);
			var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
			if (reg) {
				dragObject.x = point.x;
				dragObject.y = point.y;
			}
			diffX = point.x - dragObject.x;
			diffY = point.y - dragObject.y;

			if (obj.zimDragRect) {
				if (localBounds) {
					r = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect);
					if (surround) rLocal = obj.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect, true); // true flips to global to local
				}
			}
			// just a quick way to set a default cursor or use the cursor sent in
			obj.cursor = (zot(dragCursor))?"pointer":dragCursor;

			// extra slide settings to project where the object will slide to
			if (slide) {
				lastCount = 0;
				backX = [point.x];
				backY = [point.y];
				lastX = -10000; // reset
				lastY = -10000;
				obj.zimDragMoving = true;
			}

		}, true);

		obj.zimMove = obj.on("pressmove", function(e) {
			if (!downCheck) return;
			positionObject(dragObject, e.stageX, e.stageY);
		}, true);

		function positionObject(o, x, y) {

			if (zot(o)) o = (dragObject) ? dragObject : obj; // so zim.dragRect can use this

			// x and y are the desired global positions for the object o
			// checkBounds returns the same values if there are no bounds
			// and returns values inside the bounds if there are bounds set
			// or returns a position so that object o surrounds the bounds if surround is true
			// firstly, convert the global x and y to a point relative to the object's parent
			if (!o.parent) return;
			if (!o.stage) return;

			if (zot(x) || zot(y)) {
				// so zim.dragRect can use this to position on rect change
				// it may be we are resizing before we even drag at all
				// so we need to establish variables that would have been made on drag events
				var p = o.parent.localToGlobal(o.x, o.y);
				diffX = diffY = 0;
				if (obj.zimDragRect) {
					if (localBounds) {
						r = zim.boundsToGlobal(o.parent, obj.zimDragRect);
						if (surround) rLocal = o.zimDragRect;
					} else {
						r = obj.zimDragRect;
						if (surround) rLocal = zim.boundsToGlobal(o.parent, obj.zimDragRect, true); // flips to global to local
					}
				}
				x = p.x;
				y = p.y;
				if (slide) {
					objUpX = o.x;
					objUpY = o.y;
					dragObject = o;
					dampX.immediate(objUpX);
					dampY.immediate(objUpY);
				}
			}

			var point = o.parent.globalToLocal(x, y);
			var checkedPoint;
			if (slide && slideSnap) {
				if (slideSnap == "vertical") {
					checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
					o.x = checkedPoint.x;
					o.y = point.y-diffY;
				} else if (slideSnap == "horizontal") {
					checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
					o.x = point.x-diffX;
					o.y = checkedPoint.y;
				} else {
					o.x = point.x-diffX;
					o.y = point.y-diffY;
				}
			} else {
				checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
				// now set the object's x and y to the resulting checked local point
				o.x = checkedPoint.x;
				o.y = checkedPoint.y;
			}

			// mask graphics needs to have same position as object
			// yet the mask is inside the object (but alpha = 0)
			if (o.zimMask) {
				o.zimMask.x = o.x;
				o.zimMask.y = o.y;
			}
		}
		obj.zimPosition = positionObject;

		obj.zimUp = obj.on("pressup", function(e) {
			var id = "id"+Math.abs(e.pointerID+1);
			delete obj.pointers[id];
			if (!downCheck) return;
			obj.cursor = (zot(overCursor))?"pointer":overCursor;
			if (slide) {
				var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
				downCheck = false;
				upX = point.x;
				upY = point.y;
				objUpX = dragObject.x;
				objUpY = dragObject.y;
				dampX.immediate(dragObject.x);
				dampY.immediate(dragObject.y);
			} else {
				var pointerCount = 0;
				for (var o in obj.pointers) {
					pointerCount++;
				}
				if (pointerCount == 0) zim.Ticker.remove(obj.zimDragTicker);
			}
			if (obj.stage) obj.stage.update();
		}, true);

		// the bounds check for registration inside the bounds
		// or if surround is set for the whole object staying outside the bounds
		function checkBounds(o, x, y) {
			if (r) {
				if (surround) {
					var w = o.getBounds().width;
					var h = o.getBounds().height;
					var bx = o.getBounds().x;
					var by = o.getBounds().y;
					if (w < rLocal.width) {
						// put half way between
						x = rLocal.x + (rLocal.width - w) / 2 + (o.regX-bx);
					} else {
						if (x - (o.regX-bx) > rLocal.x) {
							x = rLocal.x + (o.regX-bx);
						}
						if (x - (o.regX-bx) + w < rLocal.x + rLocal.width) {
							x = rLocal.x + rLocal.width + (o.regX-bx) - w;
						}
					}
					if (o.height < rLocal.height) {
						// put half way between
						y = rLocal.y + (rLocal.height - h) / 2 + (o.regY-by);
					} else {
						if (y - (o.regY-by) > rLocal.y) {
							y = rLocal.y + (o.regY-by);
						}
						if (y - (o.regY-by) + h < rLocal.y + rLocal.height) {
							y = rLocal.y + rLocal.height + (o.regY-by) - h;
						}
					}
				} else {
					// convert the desired drag position to a global point
					// note that we want the position of the object in its parent
					// so we use the parent as the local frame
					var point = o.parent.localToGlobal(x,y);
					// r is the bounds rectangle on the global stage
					// r is set during mousedown to allow for global scaling when in localBounds mode
					// if you scale in localBounds==false mode, you will need to reset bounds with dragRect()
					x = Math.max(r.x, Math.min(r.x+r.width, point.x));
					y = Math.max(r.y, Math.min(r.y+r.height, point.y));
					// now that the point has been checked on the global scale
					// convert the point back to the obj parent frame of reference
					point = o.parent.globalToLocal(x, y);
					x = point.x;
					y = point.y;
				}
			}
			return {x:x,y:y}
		}

		// we store where the object was a few ticks ago and project it forward
		// then damp until it stops - although the ticker keeps running and updating
		// if it snaps then the object is allowed to go past the bounds and damp back
		// if it is not snapping then the object stops at the bounds when it is slid
		function setUpSlide() {
			var stage = obj.stage;
			obj.zimDragTicker = function() {
				if (!dragObject) dragObject = obj; // could be risky if intending to drag children
				if (downCheck) {
					var point = dragObject.parent.globalToLocal(stage.mouseX, stage.mouseY);
					lastCount++;
					backX.push(point.x);
					backY.push(point.y);
					if (lastCount >= back) {
						lastBackX = backX.shift();
						lastBackY = backY.shift();
					} else {
						lastBackX = backX[0];
						lastBackY = backY[0];
					}
				} else {
					if (!obj.zimDragMoving) return;
					var desiredX = objUpX + upX-lastBackX;
					var desiredY = objUpY + upY-lastBackY;
					if (r) {
						var checkedPoint = checkBounds(dragObject, desiredX, desiredY);
						desiredX = checkedPoint.x;
						desiredY = checkedPoint.y;
					}
					if (!slideSnap) {
						var checkedPoint = checkBounds(dragObject, dampX.convert(desiredX), dampY.convert(desiredY));
						dragObject.x = checkedPoint.x;
						dragObject.y = checkedPoint.y;
						testMove(dragObject,dragObject.x,dragObject.y,dragObject.x,dragObject.y);
					} else {
						dragObject.x = dampX.convert(desiredX);
						dragObject.y = dampY.convert(desiredY);
						testMove(dragObject,dragObject.x,dragObject.y,desiredX,desiredY);
					}
				}
			}
			function testMove(o,x,y,desiredX,desiredY) {
				if (Math.abs(o.x-lastX) < .1 && Math.abs(o.y-lastY) < .1) {
					obj.zimDragMoving = false;
					o.x = desiredX; // snap to final resting place
					o.y = desiredY;
					o.dispatchEvent("slidestop");
				} else {
					lastX = x;
					lastY = y;
				}
			}
			zim.Ticker.add(obj.zimDragTicker, stage);
		}
		return obj;
	}//-31

/*--
obj.noDrag = function()

noDrag
zim DisplayObject method

DESCRIPTION
Removes drag function from an object.
This is not a stopDrag function (as in the drop of a drag and drop).
Dropping happens automatically with the drag() function.
The noDrag function turns off the drag function so it is no longer draggable.

EXAMPLE
circle.noDrag();

// OR with pre ZIM 4TH function
zim.noDrag(circle);
END EXAMPLE

RETURNS obj for chaining
--*///+32
	zim.noDrag = function(obj) {
		z_d("32");
		if (zot(obj) || !obj.on) return;
		obj.cursor = "default";
		zim.setSwipe(obj, true);
		obj.off("added", obj.zimAdded);
		obj.off("removed", obj.zimRemoved);
		obj.off("mousedown", obj.zimDown);
		obj.off("pressmove", obj.zimMove);
		obj.off("pressup", obj.zimUp);
		if (zim.Ticker && obj.zimDragSlide) zim.Ticker.remove(obj.zimDragSlide);
		obj.zimDragMoving=obj.zimAdded=obj.zimRemoved=obj.zimDown=obj.zimMove=obj.zimUp=obj.zimDragRect=obj.zimDragSlide=null;
		return obj;
	}//-32

/*--
obj.dragRect = function(rect)

dragRect
zim DisplayObject method

DESCRIPTION
Dynamically changes or adds a bounds rectangle to the object being dragged with zim.drag().

EXAMPLE
var dragBounds = new createjs.Rectangle(100,100,500,400);
circle.dragRect(dragBounds);

OR pre ZIM 4TH
zim.dragRect(circle, dragBounds);
END EXAMPLE

PARAMETERS
rect - is a createjs.Rectangle for the bounds - the local / global does not change from the original drag

RETURNS obj for chaining
--*///+33
	zim.dragRect = function(obj, rect) {
		z_d("33");
		if (zot(obj) || !obj.on) return;
		if (zot(rect)) return;
		obj.zimDragRect = rect;
		obj.zimDragMoving = true;
		if (obj.zimPosition) obj.zimPosition();
		return obj;
	}//-33

/*--
obj.setSwipe = function(swipe)

setSwipe
zim DisplayObject method

DESCRIPTION
Sets whether we want to swipe an object or not using ZIM Swipe.
Recursively sets children to same setting.

EXAMPLE
circle.swipe(false);

OR with pre ZIM 4TH function
zim.swipe(circle, false);
END EXAMPLE

PARAMETERS
swipe - (default true) set to false to not swipe object

RETURNS obj for chaining
--*///+34
	zim.setSwipe = function(obj, swipe) {
		z_d("34");
		if (zot(obj) || !obj.on) return;
		obj.zimNoSwipe = (swipe) ? null : true;
		if (obj instanceof createjs.Container) dig(obj);
		function dig(container) {
			var num = container.numChildren;
			var temp;
			for (var i=0; i<num; i++) {
				temp = container.getChildAt(i);
				temp.zimNoSwipe = obj.zimNoSwipe;
				if (temp instanceof createjs.Container) {
					dig(temp);
				}
			}
		}
		return obj;
	}//-34


/*--
obj.gesture = function(move, scale, rotate, rect, minScale, maxScale, snapRotate, localBounds, slide, slideEffect)

gesture
zim DisplayObject method

DESCRIPTION
Sets multi-touch pan, pinch and rotate for position, scale and rotation
Handles scaled and rotated containers
Scale and rotation occur from registration point
Note - gesture() only works on the currentTarget - not a container's children (like drag() can)
ZIM Frame should have touch set to true (which is the default for mobile)
ALSO: see the noGesture() method to remove some or all gestures
ALSO: see the gestureRect() method to set or reset the bound rectangle dynamically

EXAMPLE
rectangle.gesture(); // move, scale and rotate with no bounds

OR with pre ZIM 4TH function
zim.gesture(rectangle);
END EXAMPLE

EXAMPLE
rect.gesture({
	rotate:false,
	rect:new createjs.Rectangle(0,0,stageW,stageH),
	minScale:.5,
	maxScale:3,
	slide:true
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
move - (default true) move the object with average of fingers
scale - (default true) scale the object with first two fingers' pinch
rotate - (default true) rotate the object with first two fingers' rotation
rect - (default null) bounding CreateJS Rectangle(x,y,w,h) to contain registration point
minScale - (default null) a minimum scale
maxScale - (default null) a maximum scale
snapRotate - (default 1) degrees to snap rotation to after rotation is finished
localBounds - (default false) set to true to make rect for bounds local rather than global
slide - (default false) will let you throw the object and dispatch a slidestop event when done
slideEffect - (default 5) how much slide with 0 being no slide and then longer slide times and distance like 10, etc.

EVENTS
Adds move, scale and rotate events to obj (when associated gesture parameters are set to true)
If slide is true, obj dispatches a slidestop event when sliding stops

RETURNS obj for chaining
--*///+34.5
	zim.gesture = function(obj, move, scale, rotate, rect, minScale, maxScale, snapRotate, localBounds, slide, slideEffect) {

		var sig = "obj, move, scale, rotate, rect, minScale, maxScale, snapRotate, localBounds, slide, slideEffect";
		var duo; if (duo = zob(zim.gesture, arguments, sig)) return duo;
		z_d("34.5");

		if (zot(obj) || !obj.on) return;
		if (zot(move)) move = true;
		if (zot(scale)) scale = true;
		if (zot(rotate)) rotate = true;
		if (zot(localBounds)) localBounds = false;
		if (zot(snapRotate)) snapRotate = 1;
		if (zot(slide)) slide = false;
		if (zot(slideEffect)) slideEffect = 5;

		var slideData;
		var slideCount;

		if (!obj.zimTouch) {

			var dampScaleX = new zim.Damp(obj.scaleX, .05);
			var dampScaleY = new zim.Damp(obj.scaleY, .05);
			var scaleRatio = obj.scaleX/obj.scaleY;

			obj.zimTouch = {
				move:move, // store settings on object to control with noGesture()
				scale:scale,
				rotate:rotate,
				pointers:{}, // holds the current pointer data
				checkBounds:function(x, y) { // used locally and by zim.gestureRect
					if (obj.zimTouch.rect) {
						var rect = obj.zimTouch.rect;
						// convert the desired drag position to a global point
						// note that we want the position of the object in its parent
						// so we use the parent as the local frame
						var point = obj.parent.localToGlobal(x,y);
						// r is the bounds rectangle on the global stage
						// r is set during mousedown to allow for global scaling when in localBounds mode
						// if you scale in localBounds==false mode, you will need to reset bounds with dragRect()
						x = Math.max(rect.x, Math.min(rect.x+rect.width, point.x));
						y = Math.max(rect.y, Math.min(rect.y+rect.height, point.y));
						// now that the point has been checked on the global scale
						// convert the point back to the obj parent frame of reference
						point = obj.parent.globalToLocal(x, y);
						x = point.x;
						y = point.y;
					}
					return {x:x,y:y}
				}
			};

			if (rect) {
				obj.zimTouch.rect = rect;
				if (localBounds) obj.zimTouch.rect = zim.boundsToGlobal(obj.parent, rect);
				var result = obj.zimTouch.checkBounds(obj.x, obj.y); // set in bounds to start
				obj.x = result.x;
				obj.y = result.y;
			}

			if (slide) {
				slideSlice = 10;
				slideTotal = 5;
				slideCount = 0;
				slideData = [];
				obj.zimTouch.slideInterval = zim.interval(slideSlice,function() {
					slideData[slideCount++%slideTotal] = [obj.x, obj.y];
				});
				obj.zimTouch.slideInterval.pause();
				obj.move(obj.x, obj.y, 10, "quadOut"); // for some reason, first throw is smoother if already animated
			}

			obj.zimTouch.mousedown = obj.on("mousedown", function(e) {
				var id = "id"+Math.abs(e.pointerID+1); // some pointers have negative ids
				// convert all pointer x and y to the parent container of the obj
				var local = obj.parent.globalToLocal(e.stageX, e.stageY);
				// we compare current pointer to start pointer (rather than increment as we go)
				obj.zimTouch.pointers[id] = {
					startX:local.x, startY:local.y,
					x:local.x, y:local.y
				};
				if (obj.zimTouch.move || obj.zimTouch.rotate) {
					obj.zimTouch.total = 0;
					zim.loop(obj.zimTouch.pointers, function(id) {
						obj.zimTouch.total++;
					});
				}
				if (slide && obj.zimTouch.total == 1) obj.zimTouch.slideInterval.pause(false);
				setTouches();
			})

			obj.zimTouch.pressmove = obj.on("pressmove", function(e) {
				var id = "id"+Math.abs(e.pointerID+1);
				var local = obj.parent.globalToLocal(e.stageX, e.stageY);
				// update our pointer data with new x and y
				obj.zimTouch.pointers[id].x = local.x;
				obj.zimTouch.pointers[id].y = local.y;

				if (obj.zimTouch.move) {
					// average the pointers' movement
					var newX = 0;
					var newY = 0;
					zim.loop(obj.zimTouch.pointers, function(id, pointer) {
						newX += pointer.x - pointer.startX;
						newY += pointer.y - pointer.startY;
					});
					newX = obj.zimTouch.startX + newX / obj.zimTouch.total;
					newY = obj.zimTouch.startY + newY / obj.zimTouch.total;

					var result = obj.zimTouch.checkBounds(newX, newY); // es6 opportunity
					obj.x = result.x;
					obj.y = result.y;
					obj.dispatchEvent("move");
				}

				// if we have multitouch as determined by setTouches()
				if (obj.zimTouch.pair.length == 2) {
					var point1 = obj.zimTouch.pair[0];
					var point2 = obj.zimTouch.pair[1];
					if (obj.zimTouch.scale) {
						// use ration of distance between fingers to start and then current distance between fingers
						var startDistance = Math.sqrt(Math.pow((point2.startX-point1.startX),2) + Math.pow((point2.startY-point1.startY),2));
						var currentDistance = Math.sqrt(Math.pow((point2.x-point1.x),2) + Math.pow((point2.y-point1.y),2));
						var newScaleX = obj.zimTouch.startSX + (currentDistance / startDistance - 1);
						var newScaleY = obj.zimTouch.startSY + (currentDistance / startDistance - 1);
						obj.scaleX = dampScaleX.convert(newScaleX);
						obj.scaleY = dampScaleY.convert(newScaleY);

						// set to scale min or max if scale would be outside range
						var minBad = (!zot(minScale) && Math.min(newScaleX, newScaleY) < minScale);
						var maxBad = (!zot(maxScale) && Math.max(newScaleX, newScaleY) > maxScale);
						if (minBad || maxBad) {
							if (minBad) {
								if (scaleRatio > 1) {
									obj.scaleY = minScale;
									obj.scaleX = minScale*scaleRatio;
								} else {
									obj.scaleX = minScale;
									obj.scaleY = minScale/scaleRatio;
								}
							} else if (maxBad) {
								if (scaleRatio > 1) {
									obj.scaleX = maxScale;
									obj.scaleY = maxScale/scaleRatio;
								} else {
									obj.scaleY = maxScale;
									obj.scaleX = maxScale*scaleRatio;
								}
							}
							dampScaleX.immediate(obj.scaleX);
							dampScaleY.immediate(obj.scaleY);
						}

						obj.dispatchEvent("scale");
					}
					if (obj.zimTouch.rotate) {
						// rotate based on the difference of angle between the fingers at start and at current
						var startAngle = Math.atan2((point1.startY - point2.startY), (point1.startX - point2.startX)) * (180 / Math.PI);
						var currentAngle = Math.atan2((point1.y - point2.y), (point1.x - point2.x)) * (180 / Math.PI);
						obj.rotation = obj.zimTouch.startR + (currentAngle - startAngle);
						obj.dispatchEvent("rotate");
					}
				}
				if (obj.getStage && obj.stage) obj.stage.update();
			});

			obj.zimTouch.pressup = obj.on("pressup", function(e) {
				var id = "id"+Math.abs(e.pointerID+1);
				// remove touch data for pointer
				delete obj.zimTouch.pointers[id];
				if (obj.zimTouch.move || obj.zimTouch.rotate) obj.zimTouch.total--;
				if (rotate && !zot(snapRotate) && obj.zimTouch.total == 0) {
					if (snapRotate > 0) {
						obj.rotation = Math.round(obj.rotation/snapRotate)*snapRotate;
					} else if (snapRotate == 0) {
						obj.rotation = Math.round(obj.rotation);
					}
				}
				if (slide && obj.zimTouch.total == 0) {
					obj.zimTouch.slideInterval.pause();
					var startSlide = slideData[(slideCount+1)%slideData.length];
					var currentSlide = slideData[(slideCount)%slideData.length];
					var newX = obj.x + (startSlide[0]-currentSlide[0]) * slideEffect;
					var newY = obj.y + (startSlide[1]-currentSlide[1]) * slideEffect;
					var result = obj.zimTouch.checkBounds(newX, newY); // es6 opportunity
					// if it is being thrown past the bounds, need to reduce time by percentage of blocked movement
					var newT = slideTotal*slideSlice*slideEffect * Math.min((obj.x-result.x)/(obj.x-newX)||1, (obj.y-result.y)/(obj.y-newY)||1);
					obj.move(result.x, result.y, newT, "quadOut", function(){obj.dispatchEvent("slidestop");});
				}
				if (obj.getStage && obj.stage) obj.stage.update();
				setTouches();
			});
			function setTouches() {
				// anytime we add or remove a pointer we reset the start positions
				// this handles cases where single touch would change the start position
				// and handles removing of one of the active pairs of pointers
				// to be replaced with another current pointer
				obj.zimTouch.pair = [];
				zim.loop(obj.zimTouch.pointers, function(id, pointer, i) {
					pointer.startX = pointer.x;
					pointer.startY = pointer.y;
					// just record the first two pointers
					// keep looping as mov uses all pointers
					if (i <= 1) obj.zimTouch.pair.push(pointer);
				});
				// record the start position, scale and rotation
				obj.zimTouch.startX = obj.x;
				obj.zimTouch.startY = obj.y;
				obj.zimTouch.startSX = obj.scaleX;
				obj.zimTouch.startSY = obj.scaleY;
				obj.zimTouch.startR = obj.rotation;
			}
		}
		return obj;
	}//-34.5

/*--
obj.noGesture = function(move, scale, rotate)

noGesture
zim DisplayObject method

DESCRIPTION
Removes multi-touch pan, pinch and rotation gestures from an object.
If all three are removed then deletes the zimTouch object and touch events from obj

EXAMPLE
rectangle.noGesture(); // removes all gestures
// or
rectangle.noGesture(true, true, false); // would leave rotation
// or with ZIM DUO
rectangle.noGesture({rotation:false}); // would leave rotation

// OR with pre ZIM 4TH function
zim.noGesture(rectangle);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
move - (default true) - set to false not to remove move gesture
scale - (default true) - set to false not to remove scale gesture
rotate - (default true) - set to false not to remove rotate gesture

RETURNS obj for chaining
--*///+34.6
	zim.noGesture = function(obj, move, scale, rotate) {

		var sig = "obj, move, scale, rotate";
		var duo; if (duo = zob(zim.noGesture, arguments, sig)) return duo;
		z_d("34.6");

		if (zot(obj) || !obj.on || !obj.zimTouch) return;
		if (zot(move)) move = true;
		if (zot(scale)) scale = true;
		if (zot(rotate)) rotate = true;
		obj.zimTouch.move = !move;
		obj.zimTouch.scale = !scale;
		obj.zimTouch.rotate = !rotate;
		if (!obj.zimTouch.move && !obj.zimTouch.scale && !obj.zimTouch.rotate) {
			obj.off("mousedown", obj.zimTouch.mousedown);
			obj.off("pressmove", obj.zimTouch.pressmove);
			obj.off("pressup", obj.zimTouch.pressup);
			delete obj.zimTouch;
		}

		return obj;
	}//-34.6

/*--
obj.gestureRect = function(rect)

gestureRect
zim DisplayObject method

DESCRIPTION
Dynamically changes or adds a bounds rectangle to the object being dragged with zim.gesture().

EXAMPLE
var dragBounds = new createjs.Rectangle(100,100,500,400); // x,y,w,h
circle.gestureRect(dragBounds);

OR pre ZIM 4TH
zim.gestureRect(circle, dragBounds);
END EXAMPLE

PARAMETERS
rect - is a createjs.Rectangle for the bounds - the local / global does not change from the original gesture setting

RETURNS obj for chaining
--*///+34.7
	zim.gestureRect = function(obj, rect) {
		z_d("34.7");
		if (zot(obj) || !obj.on) return;
		if (zot(rect) || !obj.zimTouch) return;
		obj.zimTouch.rect = rect;
		var result = obj.zimTouch.checkBounds(obj.x, obj.y);
		obj.x = result.x;
		obj.y = result.y;
		return obj;
	}//-34.7

/*--
obj.hitTestPoint = function(x, y)

hitTestPoint
zim DisplayObject method

DESCRIPTION
See if shape of obj is hitting the global point x and y on the stage.

EXAMPLE
var circle = new zim.Circle();
stage.addChild(circle);
circle.drag();
circle.on("pressmove", function() {
	if (circle.hitTestPoint(stageW/2, stageH/2)) {
		if (circle.alpha == 1) {
			circle.alpha = .5;
			stage.update();
		}
	} else {
		if (circle.alpha == .5) {
			circle.alpha = 1;
			stage.update();
		}
	}
});

OR with pre ZIM 4TH functions
zim.drag(circle); // etc.
if (zim.hitTestPoint(circle, stageW/2, stageH/2)) {} // etc.
END EXAMPLE

PARAMETERS
x and y - the point we are testing to see if it hits the shape of the object

RETURNS a Boolean true if hitting, false if not
--*///+35
	zim.hitTestPoint = function(obj, x, y) {
		z_d("35");
		if (!obj.stage) return false;
		if (zot(obj) || !obj.globalToLocal) return;
		var point = obj.globalToLocal(x,y);
		var bounds = obj.getBounds();
		if (bounds) { // faster to check if point is in bounds first
			if (point.x > bounds.x + bounds.width || point.x < bounds.x) return;
			if (point.y > bounds.y + bounds.height || point.y < bounds.y) return;
		}
		return obj.hitTest(point.x, point.y);
	}//-35

/*--
obj.hitTestReg = function(other)

hitTestReg
zim DisplayObject method

DESCRIPTION
See if the shape shape of an object is hitting the registration point of object (other).

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
circle.on("pressmove", function() {
	if (circle.hitTestReg(rect)) {
		stage.removeChild(rect);
		stage.update();
	}
})

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestReg(circle, rect)) {} // etc.
END EXAMPLE

PARAMETERS
other - the object whose registration point we are checking against

RETURNS a Boolean true if hitting, false if not
--*///+36
	zim.hitTestReg = function(a, b) {
		z_d("36");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.localToLocal || !b.localToLocal) return;
		var point = b.localToLocal(b.regX,b.regY,a);
		var bounds = a.getBounds();
		if (bounds) { // faster to check if point is in bounds first
			if (point.x > bounds.x + bounds.width || point.x < bounds.x) return;
			if (point.y > bounds.y + bounds.height || point.y < bounds.y) return;
		}
		return a.hitTest(point.x, point.y);
	}//-36

/*--
obj.hitTestRect = function(other, num)

hitTestRect
zim DisplayObject method

DESCRIPTION
See if a shape of an object is hitting points on a rectangle of another object.
The rectangle is based on the position, registration and bounds of object (other).
num is how many points on the edge of the rectangle we test - default is 0.
The four corners are always tested as well as the very middle of the rectangle.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
circle.on("pressmove", function() {
	if (circle.hitTestRect(rect)) {
		stage.removeChild(rect);
		stage.update();
	}
});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestRect(circle, rect)) {} // etc.
END EXAMPLE

PARAMETERS
other - the object whose bounding rectangle we are checking against
num - (default 0) the number of points along each edge to checking
	1 would put a point at the middle of each edge
	2 would put two points at 1/3 and 2/3 along the edge, etc.
	there are always points at the corners
	and one point in the middle of the rectangle

RETURNS a Boolean true if hitting, false if not
--*///+37
	zim.hitTestRect = function(a, b, num) {
		z_d("37");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 0;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim methods - hitTestRect():\n please setBounds() on param b object");
			return;
		}
		var bounds2 = a.getBounds();
		if (bounds2 && !zim.hitTestBounds(a,b)) return; // bounds not hitting

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var point = b.localToLocal(centerX, centerY, a);
		if (a.hitTest(point.x, point.y)) return true; // check hit on center of Rectangle

		var shiftX, shiftY, point;

		//num = 0;  1/1
		//num = 1;  1/2  2/2
		//num = 2;  1/3  2/3  3/3
		//num = 3;  1/4  2/4  3/4  4/4

		for (var i=0; i<=num; i++) {
			shiftX = bounds.width  * (i+1)/(num+1);
			shiftY = bounds.height * (i+1)/(num+1);
			point = b.localToLocal(bounds.x+shiftX, bounds.y, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x+bounds.width, bounds.y+shiftY, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x+bounds.width-shiftX, bounds.y+bounds.height, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x, bounds.y+bounds.height-shiftY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}
	}//-37

/*--
obj.hitTestCircle = function(other, num)

hitTestCircle
zim DisplayObject method

DESCRIPTION
See if the shape of an object is hitting points on a circle of another object.
The circle is based on the position, registration and bounds of object (other).
num is how many points around the circle we test - default is 8
Also checks center of circle hitting.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var triangle = new zim.Triangle(100, 100, 100, "blue");
stage.addChild(triangle);
circle.on("pressmove", function() {
	if (triangle.hitTestCircle(circle)) {
		stage.removeChild(triangle);
		stage.update();
	}
});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestCircle(triangle, circle)) {} // etc.
END EXAMPLE

PARAMETERS
other - the object whose circle based on the bounding rect we are using
num - (default 8) the number of points evenly distributed around the circle
	and one point in the middle of the circle

RETURNS a Boolean true if hitting, false if not
--*///+38
	zim.hitTestCircle = function(a, b, num) {
		z_d("38");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 8;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim methods - hitTestCircle():\n please setBounds() on param b object");
			return;
		}
		var bounds2 = a.getBounds();
		if (bounds2 && !zim.hitTestBounds(a,b)) return; // bounds not hitting

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var point = b.localToLocal(centerX, centerY, a);
		if (a.hitTest(point.x, point.y)) return true; // check hit on center of circle
		var radius = (bounds.width+bounds.height)/2/2; // average diameter / 2
		var angle, pointX, pointY;
		for (var i=0; i<num; i++) {
			angle = i/num * 2*Math.PI; // radians
			pointX = centerX + (radius * Math.cos(angle));
			pointY = centerY + (radius * Math.sin(angle));
			point = b.localToLocal(pointX, pointY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}

	}//-38

/*--
obj.hitTestBounds = function(other, boundsShape)

hitTestBounds
zim DisplayObject method

DESCRIPTION
See if obj.getBounds() is hitting other.getBounds().
Pass in a boundsShape shape if you want a demonstration of where the bounds are.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.drag();
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
circle.on("pressmove", function() {
	if (circle.hitTestBounds(rect)) {
		stage.removeChild(rect);
		stage.update();
	}
});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.drag(circle); etc.
if (zim.hitTestBounds(circle, rect)) {} // etc.
END EXAMPLE

PARAMETERS
other - another object whose rectanglular bounds we are testing
boundsShape - (default null) an empty zim.Shape or createjs.Shape
	you would need to add the boundsShape to the stage

RETURNS a Boolean true if hitting, false if not
--*///+39
	zim.hitTestBounds = function(a, b, boundsShape) {
		z_d("39");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.getBounds || !b.getBounds) return;
		var boundsCheck = false;
		if (boundsShape && boundsShape.graphics) boundsCheck=true;

		var aB = a.getBounds();
		var bB = b.getBounds();
		if (!aB || !bB) {
			zog("zim methods - hitTestBounds():\n please setBounds() on both objects");
			return;
		}

		var adjustedA = zim.boundsToGlobal(a);
		var adjustedB = zim.boundsToGlobal(b);

		if (boundsCheck) {
			var g = boundsShape.graphics;
			g.c();
			g.ss(1).s("blue");
			g.r(adjustedA.x, adjustedA.y, adjustedA.width, adjustedA.height);
			g.s("green");
			g.r(adjustedB.x, adjustedB.y, adjustedB.width, adjustedB.height);
			boundsShape.stage.update();
		}

		return rectIntersect(adjustedA, adjustedB);

		function rectIntersect(a, b) { // test two rectangles hitting
			if (a.x >= b.x + b.width || a.x + a.width <= b.x ||
				a.y >= b.y + b.height || a.y + a.height <= b.y ) {
				return false;
			} else {
				return true;
			}
		}
	}//-39

/*--
obj.boundsToGlobal = function(rect, flip)

boundsToGlobal
zim DisplayObject method

DESCRIPTION
Returns a createjs Rectangle of the bounds of object projected onto the stage.
Handles scaling and rotation.
If a createjs rectangle is passed in then it converts this rectangle
from within the frame of the obj to a global rectangle.
If flip (default false) is set to true it goes from global to local rect.
Used by drag() and hitTestBounds() above - probably you will not use this directly.

EXAMPLE
zog(circle.boundsToGlobal().x); // global x of circle

OR with pre ZIM 4TH function
zog(zim.boundsToGlobal(circle).width); // global width of circle)
END EXAMPLE

PARAMETERS
rect - a rect inside an object which you would like mapped to global
flip - (default false) make a global rect ported to local values

RETURNS a Boolean true if hitting, false if not
--*///+40
	zim.boundsToGlobal = function(obj, rect, flip) {
		z_d("40");
		if (zot(obj) || !obj.getBounds) return;
		if (zot(flip)) flip = false;
		var oB = obj.getBounds();
		if (!oB && zot(rect)) {
			zog("zim methods - boundsToGlobal():\n please setBounds() on object (or a rectangle)");
			return;
		}
		if (rect) oB = rect;

		if (flip) {
			var pTL = obj.globalToLocal(oB.x, oB.y);
			var pTR = obj.globalToLocal(oB.x+oB.width, oB.y);
			var pBR = obj.globalToLocal(oB.x+oB.width, oB.y+oB.height);
			var pBL = obj.globalToLocal(oB.x, oB.y+oB.height);
		} else {
			var pTL = obj.localToGlobal(oB.x, oB.y);
			var pTR = obj.localToGlobal(oB.x+oB.width, oB.y);
			var pBR = obj.localToGlobal(oB.x+oB.width, oB.y+oB.height);
			var pBL = obj.localToGlobal(oB.x, oB.y+oB.height);
		}

		// handle rotation
		var newTLX = Math.min(pTL.x,pTR.x,pBR.x,pBL.x);
		var newTLY = Math.min(pTL.y,pTR.y,pBR.y,pBL.y);
		var newBRX = Math.max(pTL.x,pTR.x,pBR.x,pBL.x);
		var newBRY = Math.max(pTL.y,pTR.y,pBR.y,pBL.y);

		return new createjs.Rectangle(
			newTLX,
			newTLY,
			newBRX-newTLX,
			newBRY-newTLY
		);
	}//-40

/*--
obj.hitTestGrid = function(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)

hitTestGrid
zim DisplayObject method

DESCRIPTION
Converts an x and y point to an index in a grid.
If you have a grid of rectangles, for instance, use this to find out which rectangle is beneath the cursor.
This technique will work faster than any of the other hit tests.

EXAMPLE
zim.Ticker.add(function() {
	var index = stage.hitTestGrid(200, 200, 10, 10, stage.mouseX, stage.mouseY);
	if (index) zog(index);
});
OR with pre ZIM 4TH function
var index = zim.hitTestGrid(stage, 200, 200, 10, 10, stage.mouseX, stage.mouseY);
END EXAMPLE
offsetX, offsetY, spacingX, spacingY, local, type

PARAMETERS
width and height - the overall dimensions
cols and rows - how many of each (note it is cols and then rows)
x and y - where you are in the grid (eg. stage.mouseX and stage.mouseY)
offsetX and offsetY - (default 0) the distances the grid starts from the origin of the obj
spacingX and spacingY - (default 0) spacing between grid cells (null will be returned if x and y within spacing)
	spacing is only between the cells and is to be included in the width and height (but not outside the grid)
local - (default false) set to true to convert x and y to local values
type - (default index) which means the hitTestGrid returns the index of the cell beneath the x and y point
	starting with 0 at top left corner and counting columns along the row and then to the next row, etc.
	set type to "col" to return the column and "row" to return the row
	set to "array" to return all three in an Array [index, col, row]

RETURNS an index Number (or undefined) | col | row | an Array of [index, col, row]
--*///+41
	zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
		z_d("41");
		if (!obj.stage) return false;
		if (!zot(obj) && !local) {
			var point = obj.globalToLocal(x,y);
			x=point.x; y=point.y;
		}
		if (zot(offsetX)) offsetX = 0;
		if (zot(offsetY)) offsetY = 0;
		if (zot(spacingX)) spacingX = 0;
		if (zot(spacingY)) spacingY = 0;

		// assume spacing is to the right and bottom of a cell
		// turning this into an object would avoid the size calculations
		// but hopefully it will not be noticed - and then hitTests are all functions
		var sizeX = width / cols;
		var sizeY = height / rows;

		// calculate col and row
		var col = Math.min(cols-1,Math.max(0,Math.floor((x-offsetX)/sizeX)));
		var row = Math.min(rows-1,Math.max(0,Math.floor((y-offsetY)/sizeY)));

		// check if within cell
		if ((x-offsetX)>sizeX*(col+1)-spacingX || (x-offsetX)<sizeX*(col)) return;
		if ((y-offsetY)>sizeY*(row+1)-spacingY || (y-offsetY)<sizeY*(row)) return;

		var index = row*cols + col;
		if (zot(type) || type=="index") return index
		if (type == "col") return col;
		if (type == "row") return row;
		if (type == "array") return [index, col, row];
	}//-41

/*--
obj.move = function(x, y, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, protect, override, from, set, id)

move
zim DisplayObject method
wraps createjs.Tween

DESCRIPTION
Moves a target object to position x, y in time milliseconds.
You can set various types of easing like bounce, elastic, back, linear, sine, etc.
Handles callbacks, delays, loops, rewinds, sequences of move animations.
Also see the more general zim.animate()
(which this function calls after consolidating x an y into an object).

NOTE: to temporarily prevent animations from starting set zim.ANIMATE to false
NOTE: see zim.pauseZimAnimate(state, ids) and zim.stopZimAnimate(ids) for controlling tweens when running

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.move(100, 100, 700, "backOut");

// see zim.animate for more complex examples

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.move(circle, 100, 100, 700, "backOut");
// see ZIM Bits for more move examples
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
** some parameters below support ZIM VEE values that use zik() to pick a random option
The ZIM VEE value can be the following:
1. an Array of values to pick from - eg. ["red", "green", "blue"]
2. a Function that returns a value - eg. function(){return Date.now();}
3. a ZIM RAND object literal - eg. {min:10, max:20, integer:true, negative:true} max is required
4. any combination of the above - eg. ["red", function(){x>100?["green", "blue"]:"yellow"}] zik is recursive
5. a single value such as a Number, String, zim.Rectangle(), etc. this just passes through unchanged

NOTE: if using move as a zim function the first parameter is:
target - |ZIM VEE| the target object to tween

x and y - |ZIM VEE| the absolute positions to tween to
	RELATIVE VALUES: you can pass in relative values by putting the numbers as strings
	x:"100" will animate the object 100 pixels to the right of the current x position
	x:100 will animate the oject to an x position of 100
time - |ZIM VEE| the time for the tween in milliseconds 1000 ms = 1 second
ease - |ZIM VEE| (default "quadInOut") see CreateJS easing ("bounceOut", "elasticIn", "backInOut", "linearInOut", etc)
call - (default null) the function to call when the animation is done
params - (default target) a single parameter for the call function (eg. use object literal or array)
wait - |ZIM VEE| (default 0) milliseconds to wait before doing animation
loop - (default false) set to true to loop animation
loopCount - |ZIM VEE| (default 0) if loop is true how many times it will loop (0 is forever)
loopWait - |ZIM VEE| (default 0) milliseconds to wait before looping (post animation wait)
loopCall - (default null) calls function after loop and loopWait (not including last loop)
loopParams - (default target) parameters to send loopCall function
loopWaitCall - (default null) calls function after at the start of loopWait
loopWaitParams - (default target) parameters to send loopWaitCall function
rewind - |ZIM VEE| (default false) set to true to rewind (reverse) animation (doubles animation time)
rewindWait - |ZIM VEE| (default 0) milliseconds to wait in the middle of the rewind
rewindCall - (default null) calls function at middle of rewind after rewindWait
rewindParams - (default target) parameters to send rewindCall function
rewindWaitCall (default null) calls function at middle of rewind before rewindWait
rewindWaitParams - (default target) parameters to send rewindCall function
sequence - (default 0) the delay time in milliseconds to run on children of a container or an array of target animations
	for example, target = container or target = [a,b,c] and sequence = 1000
	would run the animation on the first child and then 1 second later, run the animation on the second child, etc.
	or in the case of the array, on element a and then 1 second later, element b, etc.
	If the loop prop is true then sequenceCall below would activate for each loop
	For an array, you must use the zim function with a target parameter - otherwise you can use the ZIM 4TH method
sequenceCall - (default null) the function that will be called when the sequence ends
sequenceParams - (default null) a parameter sent to the sequenceCall function
sequenceReverse - |ZIM VEE| (default false) set to true to sequence through container or array backwards
props - (default {override: true}) legacy - allows you to pass in TweenJS props
protect - (default false) protects animation from being interrupted before finishing
 	unless manually interrupted with stopZimMove()
	protect is always true (regardless of parameter setting) if loop or rewind parameters are set
override - (default true) subesequent tweens of any type on object cancel all earlier tweens on object
	set to false to allow multiple tweens of same object
from - |ZIM VEE| (default false) set to true to animate from obj properties to the current properties set on target
set - |ZIM VEE| (default null) an object of properties to set on the target to start (but after the wait time)
id - (default randomly created) set to String for id to pause or stop Tween

NOTE: earlier versions of ZIM used props for loop and rewind - now these are direct parameters
NOTE: call is now triggered once after all loops and rewinds are done

RETURNS the target for chaining
--*///+44
	zim.move = function(target, x, y, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, protect, override, from, set, id) {
		var sig = "target, x, y, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, protect, override, from, set, id";
		var duo; if (duo = zob(zim.move, arguments, sig)) return duo;
		z_d("44");
		if (zot(x) && zot(y)) return;
		var obj = {x:zik(x), y:zik(y)};
		if (zot(x)) {obj = {y:zik(y)};} else if (zot(y)) {obj = {x:zik(x)};}
		return zim.animate(target, obj, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, null, protect, override, from, set, id);
	}//-44

/*--
obj.animate = function(obj, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, css, protect, override, from, set, id)

animate
zim DisplayObject method
wraps createjs.Tween

DESCRIPTION
Animate object obj properties in time milliseconds.
You can set various types of easing like bounce, elastic, back, linear, sine, etc.
Handles callbacks, delays, loops, rewinds, series and sequences of animations.
Also see the more specific zim.move() to animate position x, y
although you can animate x an y just fine with zim.animate.

NOTE: to temporarily prevent animations from starting set zim.ANIMATE to false
NOTE: see zim.pauseZimAnimate(state, ids) and zim.stopZimAnimate(ids) for controlling tweens when running

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.alpha = 0;
circle.scale(0);
circle.animate({alpha:1, scale:1}, 700, null, done);
function done(target) {
	// target is circle if params is not set
	target.drag();
}

// or with ZIM DUO and from parameter:
var circle = new zim.Circle(50, "red");
circle.center(stage);
circle.animate({obj:{alpha:0, scale:0}, time:700, from:true});

// note: there was no need to set alpha and scale to 0 before the animation
// because from will animate from property values in obj {alpha:0, scale:0}
// to the present set values - which are 1 and 1 for the default scale and alpha.
// This allows you to place everything how you want it to end up
// and then easily animate to this state.
// An extra advantage of this is that you can use the zim.ANIMATE constant to skip animations while building
// See the http://zimjs.com/code/ornamate.html example

// RELATIVE animation
// rotate the rectangle 360 degrees from its current rotation
rectangle.animate({rotation:"360"}, 1000);

// pulse circle
var circle = new zim.Circle(50, "red");
circle.center(stage);
// pulse circle from scale 0 - 1 every second (use ZIM DUO)
circle.animate({obj:{scale:0}, time:500, loop:true, rewind:true, from:true});
// see ZIM Bits for more move examples

OR with pre ZIM 4TH function and without from
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
circle.alpha = 0;
zim.scale(circle, 0);
zim.animate(circle, {alpha:1, scale:1}, 700, null, done);
function done(target) {
	// target is circle if params is not set
	zim.drag(target);
}
END EXAMPLE

EXAMPLE
// using ZIM VEE value:
// this will animate the alpha to between .5 and 1 in either 1000ms or 2000ms
circle.animate({alpha:{min:.5, max:1}}, [1000, 2000]);
END EXAMPLE

EXAMPLE
// Series example animating a circle in square formation
// Also showing that the series can include multiple targets
// Click on the stage to pause or unpause the animation

var rect = new zim.Rectangle({color:frame.pink})
	.centerReg(stage)
	.scale(0); // hiding it to start

var circle = new zim.Circle({color:frame.purple}) // chaining the rest
	.addTo(stage)
	.pos(400,300)
	.animate({ // circle will be the default object for the inner animations
		obj:[
			// an array of animate configuration objects
			{obj:{x:600, y:300, scale:2}},
			{obj:{x:600, y:500, scale:1}, call:function(){zog("part way");}},
			{obj:{x:400, y:500}, time:500, ease:"quadInOut"},
			{target:rect, obj:{scale:3}, time:1000, rewind:true, ease:"quadInOut"},
			{obj:{x:400, y:300}}
		],
		time:1000, // will be the default time for the inner animations
		ease:"backOut", // will be the default ease for the inner animations
		id:"square", // will override any id set in the inner animations
		loop:true,
		loopCount:3,
		// note - no rewind or from parameters
		call:function(){zog("done");}
	});

	var paused = false;
	stage.on("stagemousedown", function() {
			paused = !paused;
			zim.pauseZimAnimate(paused, "square");
	});
END EXAMPLE

EXAMPLE
// sequence example to pulse two circles
var circle1 = new zim.Circle(50, "red");
var circle2 = new zim.Circle(50, "blue");
zim.center(circle1, stage);
zim.center(circle2, stage);
circle2.x += 70;
zim.animate({
	target:[circle1, circle2],
	obj:{scale:1},
	time:500,
	loop:true,
	rewind:true,
	from:true,
	sequence:500
});
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
** some parameters below support ZIM VEE values that use zik() to pick a random option
The ZIM VEE value can be the following:
1. an Array of values to pick from - eg. ["red", "green", "blue"]
2. a Function that returns a value - eg. function(){return Date.now();}
3. a ZIM RAND object literal - eg. {min:10, max:20, integer:true, negative:true} max is required
4. any combination of the above - eg. ["red", function(){x>100?["green", "blue"]:"yellow"}] zik is recursive
5. a single value such as a Number, String, zim.Rectangle(), etc. this just passes through unchanged

NOTE: if using move as a zim function the first parameter is:
target - |ZIM VEE| the target object to tween

obj - the object literal holding properties and values to animate (includes a scale - convenience property for scaleX and scaleY)
	|ZIM VEE| - each obj property value optionally accepts a ZIM VEE value for zik() to pick randomly from (except calls and params)
	RELATIVE VALUES: you can pass in relative values by putting the numbers as strings
		rotation:"360" will animate the rotation of the object 360 degrees from its current rotation
		whereas rotation:360 will animate the rotation of the object to 360 degrees
	ANIMATION SERIES: if you pass in an array for the obj value, then this will run an animation series
		The array must hold animate configuration objects:
		[{obj:{scale:2}, time:1000, rewind:true}, {target:different, obj:{x:100}}, etc.]
		If you run animate as a method on an object then this is the default object for the series
		but you can specify a target to override the default
		The default time and tween are as provided in the main parameters
		but you can specify these to override the default
		The id of the main parameters is used for the whole series and cannot be overridden
		The override parameter is set to false and cannot be overridden
		All other main parameters are available except rewind, sequence and from
		(rewind and from are available on the inner tweens - for sequence: the initial animation is considered)
		You currently cannot nest animimation series
		Note: if any of the series has a loop and loops forever (a loopCount of 0 or no loopCount)
		then this will be the last of the series to run
time - |ZIM VEE| the time for the tween in milliseconds 1000 ms = 1 second
ease - |ZIM VEE| (default "quadInOut") see CreateJS easing ("bounceOut", "elasticIn", "backInOut", "linearInOut", etc)
call - (default null) the function to call when the animation is done
params - (default target) a single parameter for the call function (eg. use object literal or array)
wait - |ZIM VEE| (default 0) milliseconds to wait before doing animation
waitedCall - (default null) calls function after wait is done if there is a wait
waitedParams - (default target) parameters to send waitedCall function
loop - (default false) set to true to loop animation
loopCount - |ZIM VEE| (default 0) if loop is true how many times it will loop (0 is forever)
loopWait - |ZIM VEE| (default 0) milliseconds to wait before looping
loopCall - (default null) calls function after loop and loopWait (not including last loop)
loopParams - (default target) parameters to send loopCall function
loopWaitCall - (default null) calls function after at the start of loopWait
loopWaitParams - (default target) parameters to send loopWaitCall function
rewind - |ZIM VEE| (default false) set to true to rewind (reverse) animation (doubles animation time)
rewindWait - |ZIM VEE| (default 0) milliseconds to wait in the middle of the rewind
rewindCall - (default null) calls function at middle of rewind after rewindWait
rewindParams - (default target) parameters to send rewindCall function
rewindWaitCall - (default null) calls function at middle of rewind before rewindWait
rewindWaitParams - (default target) parameters to send rewindCall function
sequence - (default 0) the delay time in milliseconds to run on children of a container or an array of target animations
	for example, target = container or target = [a,b,c] and sequence = 1000
	would run the animation on the first child and then 1 second later, run the animation on the second child, etc.
	or in the case of the array, on element a and then 1 second later, element b, etc.
	If the loop prop is true then sequenceCall below would activate for each loop
	For an array, you must use the zim function with a target parameter - otherwise you can use the ZIM 4TH method
sequenceCall - (default null) the function that will be called when the sequence ends
sequenceParams - (default null) a parameter sent to the sequenceCall function
sequenceReverse - |ZIM VEE| (default false) set to true to sequence through container or array backwards
ticker - (default true) set to false to not use an automatic zim.Ticker function
props - (default {override: true}) legacy - allows you to pass in TweenJS props
css - (default false) set to true to animate CSS properties in HTML
 	requires CreateJS CSSPlugin - ZIM has a copy here:
	<script src="https://d309knd7es5f10.cloudfront.net/CSSPlugin.js"></script>
	<script>
		// in your code at top after loading createjs
		createjs.CSSPlugin.install(createjs.Tween);
		// the property must be set before you can animate
		zss("tagID").opacity = 1; // set this even if it is default
		zim.animate(zid("tagID"), {opacity:0}, 2000); // etc.
	</script>
protect - (default false) protects animation from being interrupted before finishing
 	unless manually interrupted with stopZimAnimate()
	protect is always true (regardless of parameter setting) if loop or rewind parameters are set
override - (default true) subesequent tweens of any type on object cancel all earlier tweens on object
	set to false to allow multiple tweens of same object
from - |ZIM VEE| (default false) set to true to animate from obj properties to the current properties set on target
set - |ZIM VEE| (default null) an object of properties to set on the target to start (but after the wait time)
id - (default null) set to String to use with zimPauseTween(state, id) and zimStopTween(id)

NOTE: earlier versions of ZIM used props for loop and rewind - now these are direct parameters
NOTE: call is now triggered once after all loops and rewinds are done

RETURNS the target for chaining (or null if no target is provided and run on zim with series)
--*///+45
	zim.animate = function(target, obj, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, css, protect, override, from, set, id) {
		var sig = "target, obj, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, sequenceReverse, ticker, props, css, protect, override, from, set, id";
		var duo; if (duo = zob(zim.animate, arguments, sig)) return duo;
		z_d("45");

		if (zim.ANIMATE == false) return;

		// zik supports passing array of options or an object with min, max, integer, negative properties and zik will pick or calculate a random value
		target = zik(target); time = zik(time); ease = zik(ease); wait = zik(wait); loopCount = zik(loopCount); loopWait = zik(loopWait); rewind = zik(rewind); rewindWait = zik(rewindWait); sequenceReverse = zik(sequenceReverse); from = zik(from); set = zik(set);

		// PROPS
		// convert loop and rewind properties into the legacy props object
		var newProps = {override: true};
		if (!zot(loop)) newProps.loop = loop;
		if (!zot(loopCount)) newProps.count = loopCount; // note prop is count
		if (!zot(loopWait)) newProps.loopWait = loopWait;
		if (!zot(loopCall)) newProps.loopCall = loopCall;
		if (!zot(loopWaitParams)) newProps.loopWaitParams = loopWaitParams;
		if (!zot(loopWaitCall)) newProps.loopWaitCall = loopWaitCall;
		if (!zot(loopParams)) newProps.loopParams = loopParams;
		if (!zot(rewind)) newProps.rewind = rewind;
		if (!zot(rewindWait)) newProps.rewindWait = rewindWait;
		if (!zot(rewindCall)) newProps.rewindCall = rewindCall;
		if (!zot(rewindParams)) newProps.rewindParams = rewindParams;
		if (!zot(rewindWaitCall)) newProps.rewindWaitCall = rewindWaitCall;
		if (!zot(rewindWaitParams)) newProps.rewindWaitParams = rewindWaitParams;
		if (!zot(props)) newProps = zim.merge(newProps, props); // props to overwrite
		props = newProps;

		// SEQUENCE HANDLING
		// handle multiple targets first if there is an array
		// this just recalls the animate function for each element delayed by the sequence parameter
		if (zot(sequence)) sequence = 0;
		if (sequence > 0 && target.addChild) { // container with sequence so convert target to array
			var newTarget = [];
			for (var i=0; i<target.numChildren; i++) {
				newTarget.push(target.getChildAt(i));
			}
			target = newTarget;
		}
		if (target instanceof Array) {
			if (sequenceReverse) target.reverse();
			var currentTarget = 0;
			for (var i=0; i<target.length; i++) {
				-function () { // closure to store num (i) for timeout
					var num = i;
					if (from) {
						var val;
						target[i].zimObj = {};
						for (var prop in obj) {
							val = obj[prop];
							target[i].zimObj[prop] = target[i][prop];
							target[i][prop] = val;
						}
					} else {
						target[i].zimObj = obj;
					}
					setTimeout(function() {
						var t =	target[currentTarget];
						currentTarget++;
						zim.animate(t, t.zimObj, time, ease, call, params, wait, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, ticker, zim.copy(props), css, protect, override, null, set, id); // do not send from!
						if (num == target.length-1 && sequenceCall) {
							// calculate tween time
							var duration = ((time)?time:1000); // + ((wait)?wait:0); // wait only happens at start - no longer each time
							if (props && props.rewind) {
								duration += ((time)?time:1000) + ((props.rewindWait)?props.rewindWait:0);
							}
							if (props && props.loop && props.loopWait) {
								duration += props.loopWait;
							}
							setTimeout(function(){
								sequenceCall(sequenceParams);
							}, duration);
						}
					}, sequence*i);
				}();
			}
			return;
		}

		// DEFAULTS
		var t = time;
		if (zot(t)) t = 1000;
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		if (zot(props)) props = {override: true};
		if (zot(params)) params = target;
		if (zot(ticker)) ticker = true;
		if (zot(css)) css = false;
		if (zot(protect)) protect = false;
		if (zot(from)) from = false;
		if (zot(set)) set = {};
		if (set.scale) {set.scaleX = set.scaleY = set.scale; delete set.scale}
		if (!zot(override)) props.override = override;
		var tween;
		var idSet;
		var providedID;

		// ANIMATION SERIES HANDLING
		// if an array is passed in to animate() as the obj
		// then animate treats this as an animation series
		// [{target:circle, obj:{alpha:0}, time:1000}, {target:rect, obj:{alpha:0}, time:1000},]
		if (obj instanceof Array) {
			var starts;
			var currentCount = 1;
			if (obj.length == 0) return this;

			prepareSeries();
			prepareIds();
			runMaster();

			function runMaster() { // one day might consider reverse...
				var o; // inner obj
				var w = wait; // time for wait before starting animation
				var lastEnd = 0; // time of last label end
				var duration; // time of each label animation not including initial wait
				for (var i=0; i<obj.length; i++) {
					o = obj[i];
					if (zot(o.target)) continue;
					if (zot(o.time)) o.time = t;
					w += (o.wait?o.wait:0);
					duration = o.time;
					if (o.rewind) duration = duration * 2 + (o.rewindWait?o.rewindWait:0);
					if (o.loop) {
						// if loopCount is 0 (forever) then prepare series makes this the last animation
						duration *= o.loopCount;
						duration += (o.loopCount-1) * (o.loopWait?o.loopWait:0);
					}
					var currentObj = {
						target:o.target,
						obj:zim.copy(o.obj),
						wait:lastEnd+w,
						waitedCall:o.waitedCall,
						waitedParams:o.waitedParams,
						time:o.time,
						ease:o.ease,
						from:o.from,
						rewind:o.rewind,
						call:o.call,
						params:o.params,
						loop:o.loop, loopCount:o.loopCount, loopWait:o.loopWait,
						loopCall:o.loopCall, loopParams:o.loopParams,
						loopWaitCall:o.loopWaitCall, loopWaitParams:o.loopWaitParams,
						rewind:o.rewind, rewindWait:o.rewindWait,
						rewindCall:o.rewindCall, rewindParams:o.rewindParams,
						rewindWaitCall:o.rewindWaitCall, rewindWaitParams:o.rewindWaitParams,
						set:zim.copy(o.masterSet),
						override:false,
						id:id
					}
					if (i == obj.length-1) {
						endSeries(currentObj);
					}
					zim.animate(currentObj);
					lastEnd += w + duration;
					w = 0;
				}
			}
			function endSeries(currentObj) {

				if (props.loop && (!props.count || currentCount < props.count)) {
					currentObj.call = function() {
						if (props.loopCall && typeof props.loopCall == 'function') {(props.loopCall)(props.loopParams);}
						if (props.loopWait) {
							tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, {override:props.override}).wait(props.loopWait).call(goNext);
						} else {
							goNext();
						}
						function goNext() {
							for (var k=0; k<starts.objects.length; k++) {
								if (starts.objects[k].set) starts.objects[k].set(starts.values[k]);
							}
							if (props.loopWaitCall && typeof props.loopWaitCall == 'function') {(props.loopWaitCall)(props.loopWaitParams);}
							runMaster();
						}
					}
				} else {
					currentObj.call = function() {
						if (call && typeof call == 'function') {(call)(params);}
						endTween(id);
					}
				}
				currentCount++;
			}
			function prepareSeries() {
				var froms = new zim.Dictionary();
				starts = new zim.Dictionary();
				for (var i=0; i<obj.length; i++) {
					o = obj[i];
					if (!target) target = o.target;
					if (zot(o.target)) o.target = target;
					if (zot(o.ease)) o.ease = ease;
					if (zot(o.target)) continue;
					if (o.loop && (zot(o.loopCount) || o.loopCount <= 0)) {
						o.loopCount = 0;
						// this object is looping forever so no point in keeping any next objects
						obj.splice(i+1, obj.length); // obj.length may be too much but it works
					}
					if (!zot(o.obj.scale)) {
						o.obj.scaleX = o.obj.scaleY = o.obj.scale;
						delete o.obj.scale;
					}
					if (o.from) {
						var firstFrom = froms.at(o.target);
						if (firstFrom) {
							if (o.set) {
								// all properties from obj go to set
								// matching firstFrom properties to to obj
								// matching set properties override firstFrom on obj
								var temp = zim.copy(o.obj);
								var merged = zim.merge(firstFrom, o.set);
								o.obj = getFroms(o.target, o.obj, merged);
								o.set = zim.merge(o.set, temp);
							} else {
								o.set = zim.copy(o.obj);
								o.obj = getFroms(o.target, o.obj, firstFrom);
							}
							o.from = false;
						} else {
							// any set properties override target properties
							froms.add(o.target, getFroms(o.target, o.obj, o.set));
						}
					}
					var startProps = {};
					for (var iii in o.obj) {
						startProps[iii] = o.set?(o.set[iii]?o.set[iii]:o.target[iii]):o.target[iii];
					}
					if (zot(starts.at(o.target))) starts.add(o.target, {});
					var newEntry = zim.merge(starts.at(o.target), startProps);
					starts.remove(o.target);
					starts.add(o.target, newEntry);
					o.masterSet = zim.copy(o.set);
				}
				if (zot(target.zimTweens)) target.zimTweens = {};
			} // end prepareSeries
			return target;
		} // end series

		// -----------------------------
		// NORMALIZED TWEEN COMING THROUGH
		if (zot(target)) return;
		if (css) ticker = false;
		if (zot(target.zimTweens)) target.zimTweens = {};

		var stage;
		if (!target.stage) {
			if (zimDefaultFrame) stage = zimDefaultFrame.stage;
			else return;
		} else {
			stage = target.stage;
		}

		if (!zot(obj.scale)) {
			obj.scaleX = obj.scaleY = zik(obj.scale);
			delete obj.scale;
		}

		// PROTECT LOOPS AND REWINDS WITH BUSY
		// if protected or a loop or rewind is currently running for any of these properties
		// then remove the property from obj as it is currently busy
		for(var o in obj) {
			if (!target.zimBusy) break;
			if (target.zimBusy[o]) delete obj[o];
		}
		if (zim.isEmpty(obj)) return; // nothing left to animate
		function addZimBusy() {
			target.mouseEnabled = false;
			setTimeout(function() {
				if (!target.zimBusy) target.zimBusy = {};
				for(var o in obj) {
					target.zimBusy[o] = true;
				}
				target.mouseEnabled = true;
			}, 70);
		}
		if (protect || props.loop || props.rewind) addZimBusy();

		// IDS and IDSETS
		// this is for ids and idSets on this target
		// a single tween for an id does not get an idSet
		// a second tween for the same id gets an idSet
		// the original id is the id for the idSet
		prepareIds();
		function prepareIds() {
			if (zot(id)) {
				id = zim.makeID(10);
			} else {
				id = String(id);
				providedID = id;
			}
			if (zot(target.zimIdSets)) target.zimIdSets = {};
			if (!zot(target.zimIdSets[id])) { // already an idSet
				idSet = id;
				id = zim.makeID(10);
				target.zimIdSets[idSet].push(id);
			} else if (!zot(target.zimTweens[id])) { // not an idSet but already a tween so make an idSet
				idSet = id;
				id = zim.makeID(10);
				target.zimIdSets[idSet] = [idSet]; // add original into set
				target.zimTweens[idSet].zimIdSet = idSet; // reference back to idSet
				target.zimIdSets[idSet].push(id); // push the second one in
			} // else nothing - id is not currently part of idSet
		}

		// PREPARE ZIK RANDOM VALUES PASSED IN AS ARRAY OR RAND OBJECT {min, max, integer, negative}
		for (var i in obj) obj[i] = zik(obj[i]);
		for (i in set) set[i] = zik(set[i]);
		for (i in props) {
			if (i=="waitedCall" || i=="waitedParams" || i=="loopCall" || i=="rewindCall" || i=="loopWaitCall" || i=="rewindWaitCall") continue;
			props[i] = zik(props[i]);
		}

		// PREPARE RELATIVE VALUES PASSED IN AS STRINGS
		for (i in obj) {
			if (typeof obj[i] == "string") {
				obj[i] = target[i] + Number(obj[i].replace(/\s/g,""));
			}
		}
		for (i in set) {
			if (typeof set[i] == "string") {
				set[i] = target[i] + Number(set[i].replace(/\s/g,""));
			}
		}

		// PREPARE START VALUES
		if (from) obj = getFroms(target, obj, set, true);
		function getFroms(target, obj, set, update) {
			var newObj = {};
			for (i in obj) {
				if (set && !zot(set[i])) {
					newObj[i] = set[i];
				} else {
					newObj[i] = target[i];
				}
				if (update) target[i] = obj[i];
			}
			return newObj;
		}


		// LOOP AND REWIND SETUP
		var count = 0;
		if (props.loop) {
			if (!zot(props.count)) {
				count = props.count;
				delete props.count;
				var currentCount = 1;
			}
		}
		var wait3 = 0;
		if (props.loopWait) {
			wait3 = props.loopWait;
			delete props.loopWait;
		}
		var call3;
		if (props.loopCall) {
			call3 = props.loopCall;
			delete props.loopCall;
		}
		var params3 = target;
		if (props.loopParams) {
			params3 = props.loopParams;
			delete props.loopParams;
		}
		function doLoopCall() {
			if (call3 && typeof call3 == 'function') {(call3)(params3);}
		}
		var call4;
		if (props.loopWaitCall) {
			call4 = props.loopWaitCall;
			delete props.loopWaitCall;
		}
		var params4 = target;
		if (props.loopWaitParams) {
			params4 = props.loopWaitParams;
			delete props.loopWaitParams;
		}
		function doLoopWaitCall() {
			if (call4 && typeof call4 == 'function') {(call4)(params4);}
		}

		// TWEENS FOR REWIND, LOOP and NORMAL
		if (props.rewind) {
			// flip second ease
			if (ease) {
				// backIn backOut backInOut
				var ease2 = ease;
				if (ease2.indexOf("InOut") == -1) {
					if (ease2.indexOf("Out") != -1) {
						ease2 = ease2.replace("Out", "In");
					} else if (ease2.indexOf("In") != -1) {
						ease2 = ease2.replace("In", "Out");
					}
				}
			}
			var wait2 = 0;
			delete props.rewind;
			if (props.rewindWait) {
				wait2 = props.rewindWait;
				delete props.rewindWait; // not a createjs prop so delete
			}

			var call2;
			if (props.rewindCall) {
				call2 = props.rewindCall;
				var params2 = props.rewindParams;
				if (zot(params2)) params2 = target;
				delete props.rewindCall;
				delete props.rewindParams;
			}
			function doRewindCall() {
				if (call2 && typeof call2 == 'function') {(call2)(params2);}
			}
			var call5;
			if (props.rewindWaitCall) {
				call5 = props.rewindWaitCall;
				var params5 = props.rewindWaitParams;
				if (zot(params5)) params5 = target;
				delete props.rewindWaitCall;
				delete props.rewindWaitParams;
			}
			function doRewindWaitCall() {
				if (call5 && typeof call5 == 'function') {(call5)(params5);}
			}

			if (wait > 0) { // do not want wait as part of future loops (use loopWait)
				tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, {override:props.override}).wait(wait).call(function(){
					if (waitedCall && typeof waitedCall == 'function') {(waitedCall)(zot(waitedParams)?target:waitedParams);}
					tween1();
				});
			} else {
				tween1();
			}
			function tween1() {
				var obj2 = getStart();
				if (target.set && !from) target.set(set);
				tween = target.zimTweens[id] =  target.zimTween = createjs.Tween.get(target, props)
					.to(obj, t, createjs.Ease[ease])
					.call(doRewindWaitCall)
					.wait(wait2)
					.call(doRewindCall)
					.to(obj2, t, createjs.Ease[ease2])
					.call(doneAnimating)
					.wait(wait3)
					.call(doLoopCall);
				setZimTweenProps();
			}

		} else {
			if (wait > 0) { // do not want wait as part of future loops (use loopWait)
				tween = target.zimTweens[id] = target.zimTween = createjs.Tween.get(target, {override:props.override}).wait(wait).call(function(){
					if (waitedCall && typeof waitedCall == 'function') {(waitedCall)(zot(waitedParams)?target:waitedParams);}
					tween2();
				});
			} else {
				tween2();
			}
			function tween2() {
				if (target.set && !from) {target.set(set);}
				tween = target.zimTweens[id] =  target.zimTween = createjs.Tween.get(target, props)
					.to(obj, t, createjs.Ease[ease])
					.call(doneAnimating)
					.wait(wait3)
					.call(doLoopCall);
				setZimTweenProps();
			}
		}

		// SET TICKER
		var zimTicker;
		if (!css && ticker) {
			if (target.zimMask) { // mask graphics needs to have same position, scale, skew, rotation and reg as object
				zimTicker = zim.Ticker.add(function(){
					zim.copyMatrix(target.zimMask, target);
					target.zimMask.regX = target.regX;
					target.zimMask.regY = target.regY;
				}, stage);
			} else {
				zimTicker = zim.Ticker.add(function(){}, stage);
			}
		}

		// ANIMATION DONE AND HELPER FUNCTIONS
		function doneAnimating() {
			if (props.loop) {
				if (count > 0) {
					if (currentCount < count) {
						doLoopWaitCall();
						currentCount++;
						return;
					} else {
						if (rewind) {
							if (target.set) target.set(getStart());
						} else {
							if (target.set) target.set(obj);
						}
					}
				} else {
					doLoopWaitCall();
					return;
				}
			}
			endTween(id);
			if (call && typeof call == 'function') {(call)(params);}
		}
		function getStart() {
			// for rewind, we need to know the start value
			// which could be modified by the set parameter
			var startObj = {}
			for (var i in obj) {
				if (css) {
					if (!zot(set[i]) && !from) {
						startObj[i] = set[i];
					} else {
						startObj[i] = target.style[i];
					}
				} else {
					if (!zot(set[i]) && !from) {
						startObj[i] = set[i];
					} else {
						startObj[i] = target[i];
					}
				}
			}
			return startObj
		}
		function removeBusy(obj) {
			if (!target.zimBusy) return;
			for (var o in obj) {
				delete target.zimBusy[o];
			}
			if (zim.isEmpty(target.zimBusy)) target.zimBusy = null;
		}

		// PAUSE AND STOP MANAGEMENT
		var zimPaused = false;
		setZimTweenProps();
		function setZimTweenProps() {
			// used to keep track of tweens for various ids
			// for pauseZimAnimate() and stopZimAnimate() down below
			tween.zimObj = obj;
			tween.zimTicker = zimTicker;
			tween.zimPaused = zimPaused;
			if (idSet) {
				tween.zimIdSet = idSet;
			}
			if (providedID) {
				// add to zim.idSets for global animation pause and stop by id
				// zim.idSets = {id:[target, target], id:[target, target, target]}
				// watchout - global idSet works on provided IDS
				// local idSets work on multiple ids that are the same
				// so an object with one tween under a provided id is not locally an idSet
				if (zot(zim.idSets)) zim.idSets = {};
				if (zot(zim.idSets[providedID])) {
					zim.idSets[providedID] = [target];
				} else {
					if (zim.idSets[providedID].indexOf(target) < 0) zim.idSets[providedID].push(target); // ES6 needed
				}
			}
			if (!zim.animatedObjects) zim.animatedObjects = new zim.Dictionary(true);
			zim.animatedObjects.add(target, true);
		}
		function endTween(id) {
			if (zot(target.zimTweens) || zot(target.zimTweens[id])) return;
			removeBusy(target.zimTweens[id].zimObj);
			target.zimTweens[id].paused = true;
			endTicker(id);
			var idSet = target.zimTweens[id].zimIdSet;
			if (!zot(idSet) && target.zimIdSets) {
				var sets = target.zimIdSets[idSet];
				if (sets) sets.splice(sets.indexOf(id), 1);
				if (sets && sets.length == 0) {
					delete target.zimIdSets[idSet];
					if (zim.isEmpty(target.zimIdSets)) delete target.zimIdSets;
				}
			}
			delete target.zimTweens[id];
			if (zim.isEmpty(target.zimTweens)) target.stopZimAnimate();

			// handle zim.idSets
			// very tricky - the originating id for an idSet does not get an idSet
			// but rather its id is used by subsequent tweens for the tween.idSets
			// the originating id may create a zim.idSets if it was provided as a parameter
			if ((target.zimTweens && target.zimTweens[id]) ||
				(target.zimIdSets && target.zimIdSets[idSet?idSet:id])) {
					// leave zim.idSets alone
			} else {
				if (zim.idSets && zim.idSets[idSet?idSet:id]) {
					zim.idSets[idSet?idSet:id]
					var targetIndex = zim.idSets[idSet?idSet:id].indexOf(target);
					if (targetIndex >= 0)  zim.idSets[idSet?idSet:id].splice(targetIndex, 1);
					if (zim.idSets[idSet?idSet:id].length <= 0) {
						delete zim.idSets[idSet?idSet:id];
						if (zim.isEmpty(zim.idSets)) delete zim.idSets;
					}
				}
			}
		}
		function endTicker(id) {
			// need a little delay to make sure updates the last animation
			// and to help call function have a stage update
			// store reference to ticker function in a closure
			// as we may delete the zimTweens reference before the 200 ms is up
			-function() {
				var ticker = target.zimTweens[id].zimTicker
				setTimeout(function(){
					if (ticker) zim.Ticker.remove(ticker); ticker = null;
				},200);
			}();
		}
		function pauseTicker(id, paused) {
			var tween = target.zimTweens[id];
			tween.paused = paused;
			if (paused == tween.zimPaused) return;
			tween.zimPaused = paused;
			if (paused) {
				if (tween.zimTicker) tween.zimAnimateTimeout = setTimeout(function(){zim.Ticker.remove(tween.zimTicker);},200);
			} else {
				clearTimeout(tween.zimAnimateTimeout);
				if (tween.zimTicker) zim.Ticker.add(tween.zimTicker, stage);
			}
		}
		function expandIds(ids) {
			// turn any idSets into ids
			var actualIds = [];
			for (var i=0; i<ids.length; i++) {
				if (target.zimIdSets && !zot(target.zimIdSets[ids[i]])) {
					actualIds = actualIds.concat(target.zimIdSets[ids[i]]);
				} else {
					actualIds.push(ids[i]);
				}
			}
			return actualIds;
		}

		// METHODS ADDED TO TARGET
		if (!target.stopZimAnimate || !target.stopZimAnimate.real) { // empty method gets added by default
	        target.stopZimAnimate = function(ids, include) {
				if (zot(include)) include = true;
				if (zot(ids)) {
					if (!include) return; // would be exclude all ids
					target.zimBusy = null; // clear any busy properties
		            createjs.Tween.removeTweens(target);
					for (var id in target.zimTweens) {endTicker(id);}
					target.zimTweens = null;
					target.zimIdSets = null;
					if (zim.idSets && zim.idSets[idSet?idSet:id]) {
						delete zim.idSets[idSet?idSet:id];
						if (zim.isEmpty(zim.idSets)) delete zim.idSets;
					}
					zim.animatedObjects.remove(target);
				} else {
					if (!Array.isArray(ids)) ids = [ids];
					// expand any idSets into ids
					var actualIds = expandIds(ids);
					for (var id in target.zimTweens) {
						if (include && actualIds.indexOf(id) >= 0) endTween(id);
						if (!include && actualIds.indexOf(id) < 0) endTween(id);
					}
				}
				return target;
	        }
			target.stopZimAnimate.real = true; // record this as real method instead of empty method
	        target.pauseZimAnimate = function(paused, ids, include) {
	            if (zot(paused)) paused = true;
				if (zot(include)) include = true;
				if (zot(ids) && !include) return; // would be exclude all ids
				if (zot(ids)) { // want all ids
					for (var id in target.zimTweens) {pauseTicker(id, paused);}
				} else {
					if (!Array.isArray(ids)) ids = [ids];
					// expand any idSets into ids
					var actualIds = expandIds(ids);
					for (var id in target.zimTweens) {
						if (include && actualIds.indexOf(id) >= 0) pauseTicker(id, paused);
						if (!include && actualIds.indexOf(id) < 0) pauseTicker(id, paused);
					}
				}
				return target;
	        }
		}
		return target;
	}//-45

/*--
obj.stopZimAnimate = function(ids)

stopZimAnimate
zim function - and Display object function

DESCRIPTION
Stops tweens with the passed in id or array of ids.
If no id is passed then this will stop all tweens.
The id is set as a zim.animate, zim.move, zim.Sprite parameter
An animation series will have the same id for all the animations inside.
See also zim.pauseZimAnimate

NOTE: calling zim.stopZimAnimate(id) stops tweens with this id on all objects
calling object.stopZimAnimate(id) stops tweens with this id on the target object

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// We have split the tween in two so we can control them individually
// Set an id parameter to stop or pause
// You can control multiple tweens at once by using the same id (the id is for a tween set)
// Note the override:true parameter
var rect = new zim.Rectangle(200, 200, frame.pink)
	.centerReg(stage)
	.animate({obj:{scale:2}, time:2000, loop:true, rewind:true, id:"scale"})
	.animate({obj:{rotation:360}, time:4000, loop:true, ease:"linear", override:false});
rect.cursor = "pointer";
rect.on("click", function() {rect.stopZimAnimate()}); // will stop all tweens on rect
// OR
rect.on("click", function() {rect.stopZimAnimate("scale");}); // will stop scaling tween

zim.stopZimAnimate("scale") // will stop tweens with the scale id on all objects

zim.stopZimAnimate(); // will stop all animations
END EXAMPLE

PARAMETERS
ids - (default null) pass in an id or an array of ids specified in zim.animate, zim.move and zim.Sprite

RETURNS null if run as zim.stopZimAnimate() or the obj if run as obj.stopZimAnimate()
--*///+45.1
	zim.stopZimAnimate = function(ids) {
		z_d("45.1");
		if (zot(ids)) {
			if (zim.animatedObjects) {
				for (var i=zim.animatedObjects.length-1; i>=0; i--) {
					zim.animatedObjects.objects[i].stopZimAnimate();
				}
			}
			return;
		}
		if (!Array.isArray(ids)) ids = [ids];
		if (!zim.idSets) return;
		for (var j=0; j<ids.length; j++) {
			var idSet = ids[j];
			if (zim.idSets[idSet]) {
				var idLength = zim.idSets[idSet].length-1;
				for (var i=idLength; i>=0; i--) {
					zim.idSets[idSet][i].stopZimAnimate(idSet);
				}
			}
		}
	}//-45.1

/*--
obj.pauseZimAnimate = function(state, ids)

pauseZimAnimate
zim function - and Display object function

DESCRIPTION
Pauses or unpauses tweens with the passed in id or array of ids.
If no id is passed then this will pause or unpause all tweens.
The id is set as a zim.animate, zim.move, zim.Sprite parameter.
An animation series will have the same id for all the animations inside.
See also zim.stopZimAnimate

NOTE: calling zim.pauseZimAnimate(true, id) pauses tweens with this id on all objects
calling object.pauseZimAnimate(true, id) pauses tweens with this id on the target object

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// We have split the tween in two so we can control them individually
// Set an id parameter to stop or pause
// You can control multiple tweens at once by using the same id (the id is for a tween set)
// note the override:true parameter
var rect = new zim.Rectangle(200, 200, frame.pink)
	.centerReg(stage)
	.animate({obj:{scale:2}, time:2000, loop:true, rewind:true, id:"scale"})
	.animate({obj:{rotation:360}, time:4000, loop:true, ease:"linear", override:false});
rect.cursor = "pointer";
rect.on("click", function() {rect.pauseZimAnimate()}); // will pause all tweens on rect
// OR
var paused = false;
rect.on("click", function() {
	paused = !paused;
	rect.pauseZimAnimate(paused, "scale");
}); // will toggle the pausing of the scaling tween

zim.pauseZimAnimate(false, "scale") // will unpause tweens with the scale id on all objects

zim.pauseZimAnimate(); // will pause all animations
END EXAMPLE

PARAMETERS
state - (default true) will pause tweens - set to false to unpause tweens
ids - (default null) pass in an id or an array of ids specified in zim.animate, zim.move and zim.Sprite

RETURNS null if run as zim.pauseZimAnimate() or the obj if run as obj.pauseZimAnimate()
--*///+45.2
	zim.pauseZimAnimate = function(state, ids) {
		z_d("45.2");
		if (zot(state)) state = true;
		if (zot(ids)) {
			if (zim.animatedObjects) {
				for (var i=zim.animatedObjects.length-1; i>=0; i--) {
					zim.animatedObjects.objects[i].pauseZimAnimate(state);
				}
			}
			return;
		}
		if (!Array.isArray(ids)) ids = [ids];
		if (!zim.idSets) return;
		for (var j=0; j<ids.length; j++) {
			var idSet = ids[j];
			 if (zim.idSets[idSet]) {
				for (var i=zim.idSets[idSet].length-1; i>=0; i--) {
					zim.idSets[idSet][i].pauseZimAnimate(state, idSet);
				}
			}
		}
	}//-45.2

/*--
obj.wiggle = function(property, baseAmount, minAmount, maxAmount, minTime, maxTime, type, ease, integer, id)

wiggle
zim DisplayObject method

DESCRIPTION
Wiggles the property of the target object between a min and max amount to either side of the base amount
in a time between the min and max time.
Uses zim.animate() so to pause or stop the wiggle use zim.pauseZimAnimate and zim.stopZimAnimate
either on the object or using an id that you pass in as a parameter

NOTE: calling zim.pauseZimAnimate(true, id) pauses tweens with this id on all objects
calling target.pauseZimAnimate(true, id) pauses tweens with this id on the target object

EXAMPLE
var ball = new zim.Circle().centerReg(stage);
ball.wiggle("x", ball.x, 10, 30, 300, 1000);
// wiggles the ball 10-30 pixels to the left and right of center taking 300-1000 ms each time

ball.pauseZimAnimate(); // will pause the wiggle
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below

NOTE: if using wiggle as a zim function the first parameter is:
target - the object to wiggle

property - the property name as a String that will be width-indicatorLength-edgeLeft-edgeRight
baseAmount - the center amount for the wiggle - wiggle will go to each side of this center
minAmount - the min amount to change to a side of center
maxAmount - (default minAmount) the max amount to change to a side of center
minTime - (default 1000 ms) the min time in milliseconds to go from one side to the other
maxTime - (default minTime) the max time in milliseconds to go from one side to the other
ease - (default "quadInOut") the ease to apply to the animation
integer - (default false) tween to an integer value between min and max amounts
id - (default random id) the id to use for zim.pauseZimAnimate() or zim.stopZimAnimate()
type - (default "both") set to "positive" to wiggle only the positive side of the base or "negative" for negative side (or "both" for both)

RETURNS target for chaining
--*///+45.25
	zim.wiggle = function(target, property, baseAmount, minAmount, maxAmount, minTime, maxTime, type, ease, integer, id) {
		var sig = "target, property, baseAmount, minAmount, maxAmount, minTime, maxTime, type, ease, integer, id";
		var duo; if (duo = zob(zim.wiggle, arguments, sig)) return duo;
		z_d("45.25");
		if (zot(target) || zot(baseAmount) || zot(minAmount)) return target;
		if (zot(maxAmount)) maxAmount = minAmount;
		if (zot(minTime)) minTime = 1000;
		if (zot(maxTime)) maxTime = minTime;
		if (zot(ease)) ease = "quadInOut";
		if (zot(integer)) integer = false;
		if (zot(id)) id = zim.makeID();
		if (zot(type)) type = "both";

		var results = {};
		var count = 0;
		var lastWiggle;
		function wiggleMe() {
			var time = zim.rand(minTime, maxTime);
			var obj = {};
			var set = {};
			set[property] = baseAmount;
			// to start go from center
			if (type == "negative") {
				var wiggle = - zim.rand(minAmount,maxAmount,integer);
			} else if (type == "positive") {
				var wiggle = zim.rand(minAmount,maxAmount,integer);
			} else {
				if (count == 0) {
					var wiggle = zim.rand(minAmount,maxAmount,integer,true); // negative or positive
				} else {
					var wiggle = zim.rand(minAmount,maxAmount,integer)*zim.sign(lastWiggle)*-1;
				}
			}
			obj[property]=baseAmount+wiggle;
			if (count == 0) time = time/2;
			lastWiggle = wiggle;
			count++;
			if (type == "negative" || type == "positive") {
				zim.animate({target:target, obj:obj, set:set, ease:ease, time:time*2, rewind:true, override:false, call:wiggleMe, id:id, ticker:(target.getStage?true:false)});
			} else {
				zim.animate({target:target, obj:obj, ease:ease, time:time, override:false, call:wiggleMe, id:id, ticker:(target.getStage?true:false)});
			}		}
		wiggleMe();
		return target;
	}//-45.25

/*--
obj.loop = function(call, reverse, step, start, end)

loop
zim DisplayObject method
NOTE: overrides earlier loop function with added container loop
so that we can use earlier loop function without createjs

DESCRIPTION
1. If you pass in a Number for obj then loop() does function call that many times
and passes function call the currentIndex, totalLoops, startIndex, endIndex, obj.
By default, the index starts at 0 and counts up to one less than the number.
So this is like: for (var i=0; i<obj; i++) {}

2. If you pass in an Array then loop() loops through the array
and passes the function call the element in the array, currentIndex, totalLoops, startIndex, endIndex, array.
So this is like: for (var i=0; i<obj; i++) {element = array[i]}

3. If you pass in an Object literal then loop() loops through the object
and passes the function call the property name, value, currentIndex, totalLoops, startIndex, endIndex, obj.
So this is like: for (var i in obj) {property = i; value = obj[i];}

4. If you pass in a container for obj then loop() loops through all the children of the container
and does the function for each one passing the child, currentIndex, totalLoops, startIndex, endIndex, obj.
So this is like for(i=0; i<obj; i++) {var child = obj.getChildAt(i);} loop
or for (var i in container.children) {var child = container.children[i];}

NOTE: If you pass in true for reverse, the loop is run backwards counting to 0 (by default)
NOTE: use return to act like a continue in a loop and go to the next loop
NOTE: return a value to return out of the loop completely like a break (and return a result if desired)


EXAMPLE
var container = new zim.Container();
zim.loop(1000, function(i) { // gets passed an index i, total 1000, start 0, end 999, obj 1000
	// make 1000 rectangles
	container.addChild(new zim.Rectangle());
});
stage.addChild(container);

// to continue or break from loop have the function return the string "continue" or "break"
zim.loop(10, function(i) {
	if (i%2==0) return; // skip even
	if (i>6) return "break"; // quit loop when > 6
	zog(i);
});

var colors = [frame.green, frame.yellow, frame.pink];
zim.loop(colors, function(color, index, total, start, end, array) { // do not have to collect all these
	zog(color); // each color
});

var person = {name:"Dan Zen", occupation:"Inventor", location:"Dundas"}
var result = zim.loop(person, function(prop, val, index, total, start, end, obj) { // do not have to collect all these
	zog(prop, val); // each key value pair
	if (val == "criminal") return "criminal"; // this would return out of the loop to the containing function
});
if (result == "criminal") alert("oh no!");

// loop through children of the container
container.loop(function(child, i) { // gets passed the child, index, total, start, end and obj
	child.x += i*2;
	child.y += i*2;
}, true); // true would reverse - so highest in stack to lowest, with i going from numChildren-1 to 0

// with pre ZIM 4TH function and without reverse
zim.loop(container, function(child, i) { // gets passed the child, index, total, start, end and obj
	child.x += i*2;
	child.y += i*2;
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
call - the function to call
	the function will receive (as its final parameters) the index, total, start, end, obj
		where the index is the current index, total is how many times the loop will run
		start is the start index, end is the end index and obj is the object passed to the loop
	the starting parameters vary depending on the type of obj:
	if the obj is a number then the first parameter is the index (no extra starting parameters given)
	if the obj is an array then the first parameter is the element at the current index
	if the obj is an object literal then the first and second parameters are the property name and property value at the current index
	if the obj is a container then the first parameter is the child of the container at the current index
reverse - (default false) set to true to run the loop backwards to 0
step - (default 1) each step will increase by this amount (positive whole number - use reverse to go backwards)
start - (default 0 or length-1 for reverse) index to start
end - (default length-1 or 0 for reverse) index to end

RETURNS any value returned from the loop - or undefined if no value is returned from a loop
--*///+45.3
	zim.loop = function(obj, call, reverse, step, start, end) {

		var sig = "obj, call, reverse, step, start, end";
		var duo; if (duo = zob(zim.loop, arguments, sig)) return duo;
		z_d("45.3");
		if (zot(obj) || zot(call)) return undefined;
		if (zot(reverse)) reverse = false;
		if (zot(step) || step <= 0) step = 1;

		var type = typeof obj=="number"?"number":(obj.constructor === Array?"array":(obj.constructor === {}.constructor?"object":"container"));

		if (type == "container" && !obj.addChild) {
			return undefined;
		}
		if (type == "number" || type == "array") {
			var length = type=="number"?obj:obj.length;
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					if (type=="number") {
						var r = call(i, total, start, end, obj);
					} else { // array
						var r = call(obj[i], i, total, start, end, obj);
					}
					if (typeof r != 'undefined') return r;
				}
			}
		} else if (type == "object") {
			var length = 0;
			var props = [];
			for (var i in obj) {
				length++;
				props.push(i);
			}
			var total = getTotal(length-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					var r = call(props[i], obj[props[i]], i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			}
		} else {
			var total = getTotal(obj.numChildren-1);
			if (total == 0) return;
			if (reverse) {
				for(var i=start; i>=end; i-=step) {
					var r = call(obj.getChildAt(i), i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			} else {
				for(var i=start; i<=end; i+=step) {
					var r = call(obj.getChildAt(i), i, total, start, end, obj);
					if (typeof r != 'undefined') return r;
				}
			}
		}
		function getTotal(max) {
			if (zot(start)) start = reverse?max:0;
			if (zot(end)) end = reverse?0:max;
			if ((reverse && end > start) || (!reverse && start > end)) return 0;
			if ((start < 0 && end) <0 || (start > max && end > max)) return 0;
			start = Math.max(0, Math.min(start, max));
			end = Math.max(0, Math.min(end, max));
			return Math.floor((reverse?(start-end):(end-start)) / step) + 1;
		}
	}//-45.3

/*--
obj.copyMatrix = function(source)

copyMatrix
zim DisplayObject method

DESCRIPTION
Copies the transformation properties from the source to the obj
(x, y, rotation, scale and skew)
Might need to still copy the regX and regY (not included in copyMatrix)

NOTE: used internally by move(), animate() and setMask() for copying transform of shapes to mask
also used in addDisplayMembers for clone() method

EXAMPLE
circle.copyMatrix(circle2);
// circle will now match circle2 in x, y, rotation, scale and skew properties

OR with pre ZIM 4TH function
zim.copyMatrix(circle, circle2);
END EXAMPLE

PARAMETERS
source - object from which the transform properties are being copied

RETURNS obj for chaining
--*///+45.5
	zim.copyMatrix = function(obj, source) {
		z_d("45.5");
		obj.x = source.x;
		obj.y = source.y;
		obj.scaleX = source.scaleX;
		obj.scaleY = source.scaleY;
		obj.regX = source.regX;
		obj.regY = source.regY;
		obj.rotation = source.rotation;
		obj.skewX = source.skewX;
		obj.skewY = source.skewY;
		return obj;
	}//-45.5

/*--
obj.pos = function(x, y)

pos
zim DisplayObject method

DESCRIPTION
Chainable convenience function to position x and y
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
circle.pos(100, 100);

OR with pre ZIM 4TH function
zim.pos(circle, 100, 100);
END EXAMPLE

PARAMETERS
x - (default null) the x position
y - (default null) the y position

RETURNS obj for chaining
--*///+41.5
	zim.pos = function(obj, x, y) {
		z_d("41.5");
		if (zot(obj)) return;
		if (!zot(x)) obj.x = x;
		if (!zot(y)) obj.y = y;
		return obj;
	}//-41.5

/*--
obj.mov = function(x, y)

mov
zim DisplayObject method

DESCRIPTION
Move the object over in the x and/or y
Equivilant to obj.x += x and obj.y += y
Pass in 0 for no shift in x if you just want to shift y
Gives chainable relative position

NOTE: might want to pronounce this "mawv" to differentiate from ZIM move()

EXAMPLE
var circle = new zim.Circle().center(stage).mov(50); // move to right 50

OR with pre ZIM 4TH function
zim.mov(circle, 50);
END EXAMPLE

PARAMETERS
x - (default 0) the distance in x to move (can be negative)
y - (default 0) the distance in y to move (can be negative)

RETURNS obj for chaining
--*///+41.6
	zim.mov = function(obj, x, y) {
		z_d("41.6");
		if (zot(obj)) return;
		if (!zot(x)) obj.x += x;
		if (!zot(y)) obj.y += y;
		return obj;
	}//-41.6

/*--
obj.alp = function(alpha)

alp
zim DisplayObject method

DESCRIPTION
Chainable convenience function to set the alpha
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
circle.alp(.5);

OR with pre ZIM 4TH function
zim.alp(circle, .5);
END EXAMPLE

PARAMETERS
alpha - default(null) the alpha between 0 and 1

RETURNS obj for chaining
--*///+41.7
	zim.alp = function(obj, alpha) {
		z_d("41.7");
		if (zot(obj)) return;
		if (!zot(alpha)) obj.alpha = alpha;
		return obj;
	}//-41.7

/*--
obj.rot = function(rotation)

rot
zim DisplayObject method

DESCRIPTION
Chainable convenience function to set the rotation
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
rect.rot(180);

OR with pre ZIM 4TH function
zim.rot(rect, 180);
END EXAMPLE

PARAMETERS
rotation - (default null) the rotation in degrees

RETURNS obj for chaining
--*///+41.8
	zim.rot = function(obj, rotation) {
		z_d("41.8");
		if (zot(obj)) return;
		if (!zot(rotation)) obj.rotation=rotation;
		return obj;
	}//-41.8

/*--
obj.siz = function(width, height, only)

siz
zim DisplayObject method

DESCRIPTION
Chainable convenience function to set width and height in one call.
If you pass in just the width or height parameter, it keeps the aspect ratio.
If you want to set only the width or height, then set only to true.
If you pass in both the width and height then it sets both.
Note: that width and height will adjust the scaleX and scaleY of the object.
Also see zim.width, zim.height, zim.widthOnly, zim.heightOnly.

EXAMPLE
var rect = new zim.Rectangle(100,200,frame.blue).addTo(stage);
rect.siz(200); // sets width to 200 and height to 400
rect.siz(200, null, true); // sets width to 200 and leaves height at 200
rect.siz(200, 100); // sets width to 200 and height to 100

OR with pre ZIM 4TH function
zim.siz(rect, 200);
// etc.
END EXAMPLE

PARAMETERS
width - (default null) the width of the object
	setting only the width will set the widht and keep the aspect ratio
	unless the only parameter is set to true
height - (default null) the height of the object
	setting only the width will set the widht and keep the aspect ratio
	unless the only parameter is set to true
only - (default false) - defaults to keeping aspect ratio when one dimension set
 	set to true to scale only a single dimension (like widthOnly and heightOnly properties)

RETURNS obj for chaining
--*///+41.85
	zim.siz = function(obj, width, height, only) {
		z_d("41.85");
		if (zot(obj)) return;
		if (zot(only)) only = false;
		if (!zot(width) && !zot(height)) {
			obj.widthOnly = width; obj.heightOnly = height;
		} else if (!zot(width)) {
			if (only) {obj.widthOnly = width;} else {obj.width = width;}
		} else if (!zot(height)) {
			if (only) {obj.heightOnly = height;} else {obj.height = height;}
		}
		return obj;
	}//-41.85

/*--
obj.ske = function(skewX, skewY)

ske
zim DisplayObject method

DESCRIPTION
Chainable convenience function to skewX and skewY (slant)
See also the CreateJS set({prop:val, prop2:val}) method;

EXAMPLE
circle.ske(20);

OR with pre ZIM 4TH function
zim.ske(circle, 20);
END EXAMPLE

PARAMETERS
skewX - (default null) the x skew
skewY - (default null) the y skew

RETURNS obj for chaining
--*///+41.9
	zim.ske = function(obj, skewX, skewY) {
		z_d("41.9");
		if (zot(obj)) return;
		if (!zot(skewX)) obj.skewX = skewX;
		if (!zot(skewY)) obj.skewY = skewY;
		return obj;
	}//-41.9

/*--
obj.reg = function(regX, regY)

reg
zim DisplayObject method

DESCRIPTION
Chainable convenience function to regX and regY (registration point)
The registration point is the point the object is positioned with
and the object scales and rotates around the registration point
See also the CreateJS set({prop:val, prop2:val}) method;
See also zim.centerReg()

EXAMPLE
circle.reg(200, 200);

OR with pre ZIM 4TH function
zim.reg(circle, 200, 200);
END EXAMPLE

PARAMETERS
regX - (default null) the x registration
regY - (default null) the y registration

RETURNS obj for chaining
--*///+41.95
	zim.reg = function(obj, regX, regY) {
		z_d("41.95");
		if (zot(obj)) return;
		if (!zot(regX)) obj.regX = regX;
		if (!zot(regY)) obj.regY = regY;
		return obj;
	}//-41.95

/*--
obj.sca = function(scale, scaleY)

sca
zim DisplayObject method

DESCRIPTION
Chainable convenience function to do scaleX and scaleY in one call.
Same as zim.scale() but with consistent three letter shortcut (helps with stacked alignment)
If you pass in just the scale parameter, it scales both x and y to this value.
If you pass in scale and scaleY then it scales x and y independently.
Also see zim.scaleTo(), zim.fit() and zim.Layout().

EXAMPLE
circle.sca(.5); // x and y scale to .5
circle.sca(.5, 2); // x scale to .5 and y scale to 2

OR with pre ZIM 4TH function
zim.sca(circle, .5);
zim.sca(circle, .5, 2);
END EXAMPLE

PARAMETERS
scale - the scale (1 being full scale, 2 being twice as big, etc.)
scaleY - (default null) pass this in to scale x and y independently

RETURNS obj for chaining
--*///+41.97
	zim.sca = function(obj, scale, scaleY) {
		z_d("41.97");
		if (zot(obj) || zot(obj.scaleX)) return;
		if (zot(scale)) scale = obj.scaleX;
		if (zot(scaleY)) scaleY = scale;
		obj.scaleX = scale; obj.scaleY = scaleY;
		return obj;
	}//-41.97

/*--
obj.scale = function(scale, scaleY)

scale
zim DisplayObject method

DESCRIPTION
Chainable convenience function to do scaleX and scaleY in one call.
Same as zim.sca() but came first and full name was not taken.
If you pass in just the scale parameter, it scales both x and y to this value.
If you pass in scale and scaleY then it scales x and y independently.
Also see zim.scaleTo(), zim.fit() and zim.Layout().

EXAMPLE
circle.scale(.5); // x and y scale to .5
circle.scale(.5, 2); // x scale to .5 and y scale to 2

OR with pre ZIM 4TH function
zim.scale(circle, .5);
zim.scale(circle, .5, 2);
END EXAMPLE

PARAMETERS
scale - the scale (1 being full scale, 2 being twice as big, etc.)
scaleY - (default null) pass this in to scale x and y independently

RETURNS obj for chaining
--*///+42
	zim.scale = function(obj, scale, scaleY) {
		z_d("42");
		if (zot(obj) || zot(obj.scaleX)) return;
		if (zot(scale)) scale = obj.scaleX;
		if (zot(scaleY)) scaleY = scale;
		obj.scaleX = scale; obj.scaleY = scaleY;
		return obj;
	}//-42

/*--
obj.scaleTo = function(boundObj, percentX, percentY, type, boundsOnly)

scaleTo
zim DisplayObject method

DESCRIPTION
Scales object to a percentage of another object's bounds and scale
Percentage is from 0 - 100 (not 0-1).
Also see zim.scale(), zim.fit() and zim.Layout().

EXAMPLE
circle.scaleTo(stage, 50); // scale to half the stageW
circle.scaleTo(stage, 10, 20); // fit within these scalings of the stage

OR with pre ZIM 4TH function
zim.scaleTo(circle, stage, 100, 100, "both"); // make an oval touch all stage edges
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
boundObj - the object that we are scaling to with percents below
percentX - (default no scaling) the scale in the x
percentY - (default no scaling) the scale in the y
	if both percentX and percentY are missing then assumes 100, 100 for each
type - (default "smallest") to fit inside or outside or stretch to bounds
	smallest: uses the smallest scaling keeping proportion (fit)
	biggest: uses the largest scaling keeping proportion (outside)
	both: keeps both x and y scales - may stretch object (stretch)
boundsOnly - (default false) set to true to scale to the boundObj's bounds only - ignoring current boundObj scale

RETURNS obj for chaining
--*///+43
	zim.scaleTo = function(obj, boundObj, percentX, percentY, type, boundsOnly) {

		var sig = "obj, boundObj, percentX, percentY, type, boundsOnly";
		var duo; if (duo = zob(zim.scaleTo, arguments, sig)) return duo;
		z_d("43");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog ("zim methods - scaleTo(): please provide an object (with setBounds) to scale"); return;}
		if (zot(boundObj) || !boundObj.getBounds || !boundObj.getBounds()) {zog ("zim methods - scaleTo(): please provide a boundObject (with setBounds) to scale to"); return;}
		if (zot(percentX)) percentX = -1;
		if (zot(percentY)) percentY = -1;
		if (percentX == -1 && percentY == -1) percentX = percentY = 100;
		if (zot(type)) type = "smallest";
		if (zot(boundsOnly)) boundsOnly = false;
		var w = boundObj.getBounds().width * percentX / 100 * (boundsOnly?1:boundObj.scaleX);
		var h = boundObj.getBounds().height * percentY / 100 * (boundsOnly?1:boundObj.scaleY);
		if ((percentX == -1 || percentY == -1) && type != "both" && type != "stretch") {
			if (percentX == -1) {
				zim.scale(obj, h/obj.getBounds().height);
			} else {
				zim.scale(obj, w/obj.getBounds().width);
			}
			return obj;
		}
		if (type == "both" || type == "stretch") {
			obj.scaleX = (percentX != -1) ? w/obj.getBounds().width : obj.scaleX;
			obj.scaleY = (percentY != -1) ? h/obj.getBounds().height : obj.scaleY;
			return obj;
		} else if (type == "biggest" || type == "largest" || type == "outside") {
			var scale = Math.max(w/obj.getBounds().width, h/obj.getBounds().height);
		} else { // smallest or fit
			var scale = Math.min(w/obj.getBounds().width, h/obj.getBounds().height);
		}
		zim.scale(obj, scale);
		return obj;
	}//-43

/*--
obj.fit = function(left, top, width, height, inside)

fit
zim DisplayObject method

DESCRIPTION
Scale an object to fit inside (or outside) a rectangle and center it.
Actually scales and positions the object.
Object must have bounds set (setBounds()).

EXAMPLE
circle.fit(100, 100, 200, 300); // fits and centers in these dimensions

OR with pre ZIM 4TH function
zim.fit(circle); // fits circle and centers on stage
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
left, top, width, height - (default stage dimensions) the rectangle to fit
inside - (default true) fits the object inside the rectangle
	if inside is false then it fits the object around the bounds
	in both cases the object is centered

RETURNS an Object literal with the new and old details (bX is rectangle x, etc.):
{x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}
--*///+46
	zim.fit = function(obj, left, top, width, height, inside) {

		var sig = "obj, left, top, width, height, inside";
		var duo; if (duo = zob(zim.fit, arguments, sig)) return duo;
		z_d("46");
		if (zot(obj) || !obj.getBounds) return;
		if (!obj.getBounds()) {
			zog("zim methods - fit(): please setBounds() on object");
			return;
		}
		if (zot(left)) {
			if (!obj.stage) {
				zog("zim methods - fit(): please add boundary dimensions or add obj to stage first");
				return;
			}
			if (!obj.stage.getBounds()) {
				zog("zim methods - fit(): please add boundary dimensions or add obj with bounds to stage first");
				return;
			}
			var stageW = obj.stage.getBounds().width;
			var stageH = obj.stage.getBounds().height;
			left = 0; top = 0;
			width = stageW; height = stageH;
		}
		if (zot(inside)) inside = true;

		obj.scaleX = obj.scaleY = 1;

		var w = width;
		var h = height;
		var objW = obj.getBounds().width;
		var objH = obj.getBounds().height;
		var scale;

		if (inside) { // fits dimensions inside screen
			if (w/h >= objW/objH) {
				scale = h / objH;
			} else {
				scale = w / objW;
			}
		} else { // fits dimensions outside screen
			if (w/h >= objW/objH) {
				scale = w / objW;
			} else {
				scale = h / objH;
			}
		}

		obj.scaleX = obj.scaleY = scale;

		var newW = objW * scale;
		var newH = objH * scale;

		// horizontal center
		obj.x = (obj.regX-obj.getBounds().x)*scale + left + (w-newW)/2;

		// vertical center
		obj.y = (obj.regY-obj.getBounds().y)*scale + top + (h-newH)/2;

		return {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height};

	}//-46

/*--
obj.outline = function(color, size)

outline
zim DisplayObject method

DESCRIPTION
For testing purposes.
Draws a rectangle around the bounds of obj (adds rectangle to the objects parent).
Draws a cross at the origin of the object (0,0) where content will be placed.
Draws a circle at the registration point of the object (where it will be placed in its container).
These three things could be in completely different places ;-)

NOTE: will not subsequently be resized - really just to use while building and then comment it out or delete it

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
// show registration and origin at center and bounding box around outside
circle.outline();

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.outline(circle);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
color - (default brown) the color of the outline
size - (default 2) the stroke size of the outline

RETURNS the shape if you want to remove it: obj.parent.removeChild(returnedShape);
--*///+47
	zim.outline = function(obj, color, size) {

		var sig = "obj, color, size";
		var duo; if (duo = zob(zim.outline, arguments, sig)) return duo;
		z_d("47");
		if (zot(obj) || !obj.getBounds) {zog("zim methods - outline(): please provide object with bounds set"); return;}
		if (!obj.getBounds()) {zog("zim methods - outline(): please setBounds() on object");	return;}
		if (!obj.parent) {zog("zim methods - outline(): object should be on stage first"); return;}
		if (zot(color)) color = "brown";
		if (zot(size)) size = 2;
		var oB = obj.getBounds();
		var shape = new createjs.Shape();
		var shapeC = new createjs.Shape();
		var p = obj.parent;

		var pTL = obj.localToLocal(oB.x, oB.y, p);
		var pTR = obj.localToLocal(oB.x+oB.width, oB.y, p);
		var pBR = obj.localToLocal(oB.x+oB.width, oB.y+oB.height, p);
		var pBL = obj.localToLocal(oB.x, oB.y+oB.height, p);
		var pC = obj.localToLocal(0, 0, p);

		var g = shape.graphics;
		var gC = shapeC.graphics;
		g.s(color).ss(size)
			.mt(pTL.x, pTL.y)
			.lt(pTR.x, pTR.y)
			.lt(pBR.x, pBR.y)
			.lt(pBL.x, pBL.y)
			.lt(pTL.x, pTL.y);

		// subtract a scaled top left bounds from the top left point
		// zero = {x:pTL.x-oB.x*obj.scaleX, y:pTL.y-oB.y*obj.scaleY};

		// cross at 0 0
		var s = 10;
		var ss = s+1;
		gC.s("white").ss(size+2);
		gC.mt(-ss, 0).lt(ss, 0);
		gC.mt(0, -ss).lt(0, ss);
		gC.s(color).ss(size);
		gC.mt(-s, 0).lt(s, 0);
		gC.mt(0, -s).lt(0, s);
		shapeC.x = pC.x;
		shapeC.y = pC.y;
		shapeC.rotation = obj.rotation;

		// circle at registration point
		g.s("white").ss(size+2).dc(obj.x,obj.y,s+6);
		g.s(color).ss(size).dc(obj.x,obj.y,s+6);

		obj.parent.addChild(shape);
		obj.parent.addChild(shapeC);
		shape.mouseEnabled = false;
		shapeC.mouseEnabled = false;
		if (obj.stage) obj.stage.update();
		return obj;
	}//-47

/*--
obj.addTo = function(container, index)

addTo
zim DisplayObject method

DESCRIPTION
A wrapper function for addChild() / addChildAt() to add the obj to the container.
This allows us to chain more effectively:
var circle = new zim.Circle().addTo(stage).drag();
Also, ZIM has obj.center(container) and obj.centerReg(container) functions
where the obj comes first followed by the container.
So it is a pain to flip things and use container.addChild(obj)
Now, we can use obj.addTo(container) and the object we are adding comes first.
The last parameter is the index so similar to an addChildAt()
We can also use obj.removeFrom(container)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.addTo(stage);
// with chaining - and dragging:
var circle = new zim.Circle(50, "red").addTo(stage).drag();

var rect = new zim.Rectangle(100, 100, "blue");
rect.addTo(stage, 0); // place on bottom

OR with pre ZIM 4TH function
zim.addTo(circle, stage); // etc.
END EXAMPLE

PARAMETERS
container - the container to add to
index - (default null) if provided will addChildAt the object at the index (0 being bottom)

RETURNS obj for chaining
--*///+47.5
	zim.addTo = function(obj, container, index) {

		z_d("47.5");
		if (zot(obj)) {zog("zim methods - addTo(): please provide object"); return;}
		if (zot(container)) {zog("zim methods - addTo(): please provide container"); return;}
		if (zot(index) || isNaN(index)) {
			container.addChild(obj);
		} else {
			container.addChildAt(obj, index);
		}
		return obj;
	}//-47.5

/*--
obj.removeFrom = function(container)

removeFrom
zim DisplayObject method

DESCRIPTION
A wrapper function for removeChild() that removes the obj from the container
Matches obj.addTo(container)
We have obj.removeFrom(container)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.addTo(stage);
// later
circle.removeFrom(stage);

OR with pre ZIM 4TH function
zim.removeFrom(circle, stage); // etc.
END EXAMPLE

PARAMETERS
container - the container to remove the object from

RETURNS obj for chaining
--*///+47.6
	zim.removeFrom = function(obj, container) {

		z_d("47.6");
		if (zot(obj)) {zog("zim methods - removeFrom(): please provide object"); return;}
		if (zot(container)) {zog("zim methods - removeFrom(): please provide container"); return;}
		container.removeChild(obj);
		return obj;
	}//-47.6

/*--
obj.added = function(call, interval, maxTime)

added
zim DisplayObject method

DESCRIPTION
Calls callback function when object is added to the stage
CreateJS has an "added" event that triggers when an object is added to another container
but this container may not be on the stage.
added polls with a setInterval every 100ms to see if the object has a stage property
Once it does then it calls the callback and removes the interval

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.added(function() {zog("has stage");});

zim.interval(1000, function() {
	circle.centerReg(stage); // will trigger "has stage" message within 100ms
});
END EXAMPLE

PARAMETERS
call - the function to call when added - will call right away if object is already added
	call will receive a reference to the stage and the object as parameters
interval - (default 100) time in ms to check - keeps repeating until stage is there or maxTime is reached
maxTime - (default null) time in ms to keep checking or forever if not provided

RETURNS id of interval so clearInterval(id) will stop added() from checking for stage
--*///+47.7
	zim.added = function(obj, call, interval, maxTime) {
		z_d("47.7");
		if (zot(obj) || zot(call) || typeof call != "function") return;
		if (zot(interval)) interval = 100;
		if (obj.stage) {(call)(obj.stage, obj); return;}
		var startTime = Date.now();
		var id = setInterval(function() {
			if (maxTime > 0 && startTime-Date.now()>maxTime) clearInterval(id);
			if (obj.stage) {
				(call)(obj.stage, obj);
				clearInterval(id);
			}
		}, interval);
		return id;
	}//-47.7

/*--
obj.centerReg = function(container, index, add)

centerReg
zim DisplayObject method

DESCRIPTION
Centers the registration point on the bounds - obj must have bounds set.
If a container is provided it adds the object to the container.
A convenience function for setting both registration points at once.
Also see zim.center() for centering without changing the registration point.

EXAMPLE
var rect = new zim.Rectangle(100, 100, "blue");
rect.centerReg(stage); // centers registration, centers and adds to stage
rect.animate({obj:{rotation:360}, time:1000, ease:"linear", loop:true});

OR with pre ZIM 4TH function
zim.centerReg(rect, stage);
zim.animate({target:rect, obj:{rotation:360}, time:1000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - (default null) centers the object on and adds to the container
index - (default null) if provided will addChildAt the object at the index (0 being bottom)
add - (default true) set to false to only center the object on the container


RETURNS obj for chaining
--*///+48
	zim.centerReg = function(obj, container, index, add) {

		var sig = "obj, container, index, add";
		var duo; if (duo = zob(zim.centerReg, arguments, sig)) return duo;
		z_d("48");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog("zim methods - centerReg(): please provide object with bounds set"); return;}
		var oB = obj.getBounds();
		obj.regX = oB.x + oB.width/2;
		obj.regY = oB.y + oB.height/2;
		return (container) ? zim.center(obj, container, index, add) : obj;
	}//-48

/*--
obj.center = function(container, index, add)

center
zim DisplayObject method

DESCRIPTION
Centers the object on the container.
Will default to adding the object to the container.
Also see zim.centerReg() for centering registration point at same time.

EXAMPLE
var rect = new zim.Rectangle(100, 100, "blue");
rect.center(stage); // centers and adds to stage
// the below animation will be around the registration point at the top left corner
// this is usually not desired - see zim.centerReg() when rotating and scaling
rect.animate({obj:{rotation:360}, time:1000, ease:"linear", loop:true});

OR with pre ZIM 4TH function
zim.center(rect, stage);
zim.animate({target:rect, obj:{rotation:360}, time:1000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - centers the object on and adds to the container
index - (default null) if provided will addChildAt the object at the index (0 being bottom)
add - (default true) set to false to only center and not add the object to the container

RETURNS obj for chaining
--*///+48.1
	zim.center = function(obj, container, index, add) {

		var sig = "obj, container, index, add";
		var duo; if (duo = zob(zim.center, arguments, sig)) return duo;
		z_d("48.1");
		if (zot(obj) || !obj.getBounds) {zog("zim.center(): please provide object with bounds"); return;}
		if (zot(container) || !container.getBounds)  {zog("zim.center(): please provide container with bounds"); return;}

		var oB = obj.getBounds();
		var cB = container.getBounds();

	 	if (zot(add)) add = true;
		if (add && container.addChild) {
            if (zot(index) || (typeof index === 'number' && isNaN(index))) {
                container.addChild(obj);
            } else {
                container.addChildAt(obj, index);
            }
        }

		if (zot(cB)) return obj; // just add to container if no bounds on Container
		if (zot(oB)) { // just add to middle of container
			obj.x = container.getBounds().width/2;
			obj.y = container.getBounds().height/2;
			return obj;
		}

		// get registration point of object in coordinates of the container
		var reg = obj.localToLocal(obj.regX, obj.regY, container);

		// get bounds of the object in global space even if object is rotated and scaled
		// this makes a rectangle surrounding a rotated object - so bigger but parallel edges to the x and y
		var glob = zim.boundsToGlobal(obj);

		// now project this rectangle into the container coordinates
		// passing in a rectangle (glob) will make this act on the rectangle rather than the bounds
		// flip (true) means we go from global to local in the container
		var loc = zim.boundsToGlobal(container, glob, true);

		// the positions are all in the container coordinate so do the calculation
		obj.x = cB.x + cB.width/2 - loc.width/2  + (reg.x-loc.x);
		obj.y = cB.y + cB.height/2 - loc.height/2  + (reg.y-loc.y);

		if (!add && container.getStage && container.stage && obj.parent) {
			var p = container.localToLocal(obj.x, obj.y, obj.parent);
			obj.x = p.x;
			obj.y = p.y;
		}
		return obj;
	}//-48.1

/*--
obj.place = function(id)

place
zim DisplayObject method

DESCRIPTION
Sets the object to drag and logs to the console the x and y.
This is for when building you can move an object around to position it
then when positioned, look at the console for the positioning code.
In your code, set the reported x and y and delete the place call.

EXAMPLE
circle.place("circle"); // lets you drag circle around - then see console

OR with pre ZIM 4TH function
zim.place(circle, "circle");
END EXAMPLE

PARAMETERS
id - (default null) the name of the object so that the log gives you complete code

RETURNS undefined
--*///+49
	zim.place = function(obj, id) {
		z_d("49");
		if (zot(obj)) return;
		if (zot(id)) id = "obj";
		function report() {
			zog(id+".x = " + Math.round(obj.x) +  "; "+id+".y = " + Math.round(obj.y) + ";");
			zog(id+".pos(" + Math.round(obj.x) +  ", " + Math.round(obj.y) + ");");
		}
		zim.drag({obj:obj, currentTarget:true, dragCursor:"crosshair"});
		zog("place "+id+" - to get new position");
		obj.on("click", report);
	}//-49

/*--
obj.placeReg = function(id)

placeReg
zim DisplayObject method

DESCRIPTION
Gives draggable indicator to position a registration point in an object
This is for when building and when positioned, look at the console
for registration code and delete the placeReg call.

EXAMPLE
myContainer.placeReg("myContainer"); // lets you drag an indicator around - then see console

OR with pre ZIM 4TH function
zim.placeReg(myContainer, "myContainer");
END EXAMPLE

PARAMETERS
id - (default null) the name of the object so that the log gives you complete code

RETURNS undefined
--*///+49.5
	zim.placeReg = function(obj, id) {
		z_d("49.5");
		if (zot(obj)) return;
		var stage = obj.stage;
		if (zot(stage)) {zog("zim.placeReg() - add object to stage before calling placeReg()");	return;}
		if (zot(id)) id = "obj";
		function report() {
			var p = obj.globalToLocal(cursor.x, cursor.y);
			zog(id+".regX = " + Math.round(p.x) +  "; "+id+".regY = " + Math.round(p.y) + ";");
			zog(id+".reg(" + Math.round(p.x) +  ", " + Math.round(p.y) + ");");
		}
		var p = obj.parent.localToGlobal(obj.x, obj.y);
		var cursor = new zim.Shape(-25, -25, 50, 50).addTo(stage).pos(p.x, p.y);
		cursor.graphics.s("white").mt(-25,0).lt(25,0).mt(0,-25).lt(0,20);
		cursor.compositeOperation = "difference";
		cursor.expand(0);
		zim.drag({obj:cursor});
		zog("place cursor to get new registration point location");
		stage.on("stagemouseup", report);
	}//-49.5
/*--
obj.expand = function(padding, paddingVertical)

expand
zim DisplayObject method

DESCRIPTION
Adds a createjs hitArea to an object with an extra padding of padding.
Good for making mobile interaction better on labels, buttons, etc.

EXAMPLE
var circle = new zim.Circle(10, "red");
circle.center(stage);
circle.expand(); // makes hit area bigger
circle.on("click", function(){zog("yes");});

OR with pre ZIM 4TH function
zim.center(circle, stage);
zim.expand(circle);
END EXAMPLE

PARAMETERS
padding - (default 20) how many pixels to expand bounds
paddingVertical - (default null) the vertical padding (making padding for horizontal)

RETURNS obj for chaining
--*///+50
	zim.expand = function(obj, padding, paddingVertical) {
		z_d("50");
		if (zot(obj) || !obj.getBounds) {zog("zim methods - expand(): please provide object with bounds set"); return;}
		if (zot(padding)) padding = 20;
		if (zot(paddingVertical)) paddingVertical = padding;
		var oB = obj.getBounds();
		var rect = new createjs.Shape();
		rect.graphics.f("0").r(oB.x-padding,oB.y-paddingVertical,oB.width+2*padding,oB.height+2*paddingVertical);
		obj.hitArea = rect;
		return obj;
	}//-50
/*--
obj.setMask = function(mask)

setMask
zim DisplayObject method

DESCRIPTION
Specifies a mask for an object - the object can be any display object.
The mask can be a ZIM (or CreateJS) Shape or a ZIM Rectangle, Circle or Triangle.
Returns the mask which can then be animated using ZIM move() or animate().
This was added because it is nice to use positioned ZIM shapes (which are containers) as masks
and yet, ony Shape objects can be used as masks
and you often have to transform them properly which can be confusing.

NOTE: the mask you pass in can still be seen but you can set its alpha to 0
just watch, if you want to interact with the mask it cannot have 0 alpha
unless you provide a hit area with zim.expand() for instance (use 0 for padding)

NOTE: this was just mask() but that conflicted with createjs.mask property
so it would work to set the mask but then you could not use it again - so changed name

EXAMPLE
var label = new zim.Label("BIG", 200, null, "white");
label.center(stage);
var rect = new zim.Rectangle(200,100,"black");
rect.center(stage).alpha = 0;
var label = new zim.Label("BIG", 200, null, "white")
	.center(stage)
	.drag();
label.setMask(rect); // remember setMask should not be chained

OR with pre ZIM 4TH function
zim.center(label, stage);
var rect = new zim.Rectangle(200,100,"black");
zim.center(rect, stage).alpha = 0;
zim.setMask(label, rect);
zim.drag(label);
END EXAMPLE

NOTE: to drag something, the alpha cannot be 0
so we can use zim.expand(rect, 0) to assign a hit area
then we can drag even if the alpha is 0 (or set the alpha to .01)

EXAMPLE
var label = new zim.Label("BIG", 200, null, "white");
label.center(stage);
var rect = new zim.Rectangle(200,100,"black");
rect.expand(0);
rect.center(stage).alpha = 0;
label.setMask(rect);
rect.drag();

OR with pre ZIM 4TH function
zim.expand(rect, 0); // adds a hit area to rect so we can drag alpha 0
zim.center(rect, stage).alpha = 0;
zim.setMask(label, rect);
zim.drag(rect);
END EXAMPLE

NOTE: move(), animate() and drag() work specially with zim shapes to make this work
otherwise, if you want to reposition your mask
then save the return value of the setMask call in a variable
and position, scale or rotate the mask object using that variable
or use a zim.Shape or createjs.Shape directly to avoid this issue

EXAMPLE
var mask = zim.setMask(label, rect);
mask.x += 100;
// note: rect.x += 100 will not work
// because the mask is inside the rect and does not change its x
// rect.move(rect.x+100, rect.y, 700); will work
END EXAMPLE

PARAMETERS
mask - the object whose shape will be the mask

NOTE: use setMask(obj, null) or obj.setMask(null) to clear the mask

RETURNS the mask shape (different than the mask if using ZIM shapes)
--*///+50.1
	zim.setMask = function(obj, mask) {
		z_d("50.1");
		if (zot(obj)) {zog("zim methods - setMask(): please provide obj"); return;}
		var m;
		if (mask && mask.shape) { // zim.Rectangle, Circle or Triangle
			mask.zimMask = m = mask.shape.clone();
			zim.copyMatrix(m, mask);
			m.regX = mask.regX;
			m.regY = mask.regY;
			if (!m.centerReg) zimify(m);
			mask.addChildAt(m,0);
			m.alpha = 0;
		} else {
			m = mask;
		}
		obj.mask = m; // set the createjs mask
		return m;
	}//-50.1




////////////////  ZIM CONTROLS  //////////////

// Zim Controls (formerly Zim Pages) helps you layout and control flexive pages, click and swipe between pages and more
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com

/*--
zim.ANIMATE

ANIMATE
zim constant

DESCRIPTION
Set to false to stop zim.move() and zim.animate() calls from working.
Handy for testing your app so you do not have to wait for animations every time!
To animate things in you can place everything in their final positions
and then set the "from" parameter to true to animate from starting positions
like x or y offstage, scale or alpha of 0, etc.
Then to avoid waiting for animations to complete, you can just set zim.ANIMATE = false
and all your objects will be in their final locations and you don't wait for animations
When you are ready to run your animations for a final version, etc. just delete the line
or set zim.ANIMATE to true.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
zim.ANIMATE = false;
// without the line above, the circles will animate in
// we would have to wait for them everytime we load the app
// sometimes animations are even longer and this can waste development time
// when we add the line above, the circles are on stage right away
// this is easier and safer than commenting out all your animations

var circle1 = new zim.Circle(200, frame.green);
circle1.center(stage);
circle1.x -= 110;
circle1.animate({obj:{alpha:0, scale:0}, time:700, from:true});

var circle2 = new zim.Circle(200, frame.pink);
circle2.center(stage);
circle2.x += 110;
circle2.animate({obj:{alpha:0, scale:0}, time:700, wait:700, from:true});
END EXAMPLE
--*///+29.5
zim.ANIMATE = true;
//-29.5

/*--
zim.OPTIMIZE

OPTIMIZE
zim constant

DESCRIPTION
A setting that relates to how stage.update() is used by the components.
Default is false which means some components will update the stage automatically:
	the Slider will update the stage so that you can see the knob slide;
	the CheckBox and RadioButtons when checked will update the stage;
	the Tabs change button colors and then update the stage;
	closing of a Pane will update the stage
	the Stepper also updates as does changing color of a button, label, etc.
However, concurrent stage.update() calls can slow down mobile performance.
So if you are making content for mobile you should set zim.OPTIMIZE = true;
Then you will have to stage.update() in the change event handlers
but you were probably doing things in these events and updating anyway!
Just be careful - you might be testing a checkbox and it won't check...
So it takes some getting used to running in optimized mode.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// add this to the top of your script
zim.OPTIMIZE = true;
var slider = new zim.Slider();
slider.center(stage);
// will not see the slider operate (aside from rolling over button)
// unless you call stage.update() in the change event
slider.on("change", function() {
	// do your code
	stage.update(); // now will see the slider operate
});
END EXAMPLE

components affected by OPTIMIZE:
Label, Button, Checkbox, RadioButton, Pane, Stepper, Slider, Tabs

OPTIMIZE set to true also affects the ZIM Ticker
for functions like move, animate, drag, Scroller, Parallax
See zim.Ticker as you may have to set zim.Ticker.update = true;
--*///+50.2
zim.OPTIMIZE = false;
//-50.2

/*--
zim.ACTIONEVENT

ACTIONEVENT
zim constant

DESCRIPTION
a setting that specifies the event type to trigger many of the components
default is "mousedown" which is more responsive on mobile
setting the constant to anything else, will cause the components to use "click"

for instance, with the default settings, the following components will act on mousedown
CheckBox, RadioButtons, Pane, Stepper and Tabs

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// put this at the top of your code
zim.ACTIONEVENT = "click";
var checkBox = new zim.CheckBox();
checkBox.center(stage);
// note it now operates on mouseup (click)
// the default ACTIONEVENT is mousedown
END EXAMPLE
--*///+50.3
zim.ACTIONEVENT = "mousedown";
//-50.3

/*--
zim.Ticker = {}

Ticker
zim static class

DESCRIPTION
A static class to let ZIM use one animation function with a requestAnimationFrame
If a function has been added to the Ticker queue then it will run in the order added
along with a single stage update after all functions in queue have run.
There are settings that can adjust when the Ticker updates so see Usage notes below.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
zim.Ticker.add(function(){
	circle.x++;
}, stage); // stage is optional - will be the first stage made if left out

// to be able to remove the function:
zim.Ticker.add(tryMe, stage);
function tryMe() {circle.x++;}
zim.Ticker.remove(tryMe);

// OR with function literal, use the return value
var tickerFunction = zim.Ticker.add(function(){circle.x++;}, stage);
zim.Ticker.remove(tickerFunction);

// Check to see if a function is in the Ticker for that stage:
zog(zim.Ticker.has(stage, tickerFunction)); // false at the moment until added again
END EXAMPLE

USAGE
if zim.OPTIMIZE is true then the Ticker will not update the stage (it will still run functions)
however, OPTIMIZE can be overridden as follows (or with the always() method):

METHODS (static)
** As of ZIM 5.1.0, stage is optional and will default to the stage of first Frame object made
zim.Ticker.always(stage) - overrides zim.OPTIMIZE and always runs an update for the stage even with no function in queue
zim.Ticker.alwaysOff(stage) - stops an always Ticker for a stage
zim.Ticker.add(function, stage) - adds the function to the Ticker queue for a given stage and returns the function that was added
zim.Ticker.remove(function) - removes the function from the Ticker queue
zim.Ticker.removeAll([stage]) - removes all functions from the Ticker queue (optionally per stage)
zim.Ticker.has(function, stage) - returns a Boolean true if function is currently added to the Ticker for the stage - or false if not currently added
zim.Ticker.setFPS(30, 60) - (mobile, pc) default is set at natural requestAnimationFrame speed - this seems to be the smoothest
zim.Ticker.setTimingMode(mode) - (default "raf") RAF uses RequestAnimationFrame without framerate synching - gets screen synch (smooth) and background throttling
	set to "synched" for framerate synching - but will add some variance between updates
	set to "timeout" for setTimeout synching to framerate - no screen synch or background throttling (if RAF is not supported falls back to this mode)
	see CreateJS docs: http://www.createjs.com/docs/tweenjs/classes/Ticker.html
zim.Ticker.dispose([stage]) - removes all functions from the queue removes and removes the list (optionally per stage)

PROPERTIES (static)
zim.Ticker.update = true - overrides zim.OPTIMIZE and forces an update if a function is in the queue
zim.Ticker.update = false - forces no update regardless of zim.OPTIMIZE
zim.Ticker.update = null (default) - only updates if there is a function in queue and zim.OPTIMIZE is false
zim.Ticker.list - a ZIM Dictionary holding arrays with the functions in the Ticker queue for each stage
zim.Ticker.list.objects - the array of stages in the Ticker
zim.Ticker.list.values - the array holding an array of functions for each stage in the Ticker
zim.Ticker.framerate - read only - use setFPS() to set

the Ticker is used internally by zim functions like move(), animate(), drag(), Scroller(), Parallax()
you are welcome to add functions - make sure to pass the stage in as a second parameter to the add() method

USAGE
1. if you have your own ticker going, just set zim.OPTIMIZE = true and don't worry about a thing
2. if you do not have your own ticker going but still want OPTIMIZE true to avoid components updating automatically,
then set zim.OPTIMIZE = true and set zim.Ticker.update = true
this will run a single update only when needed in zim Ticker for any zim functions
3. if you want a ticker with a single update going all the time (with OPTIMIZE true or false) then
run zim.Ticker.always(stage);
4. if for some reason (can't think of any) you want no ticker updates for zim but want component updates
then set zim.OPTIMIZE = false and then set zim.Ticker.update = false
--*///+30
	zim.Ticker = {
		stages:null,
		myUpdate: null,
		alwaysList:new zim.Dictionary(),
		list:new zim.Dictionary(),
		setFPS: function(m, d) {
			if (zot(m) && zot(d)) {
				m = 30; d = 60;
			} else if (zot(m)) {
				m = 30;
			} else if (zot(d)) {
				d = m;
			}
			zim.Ticker.framerate = createjs.Ticker.framerate = (zim.mobile()) ? m : d;
		},
		setTimingMode: function(mode) {
			createjs.Ticker.timingMode = createjs.Ticker.RAF;
			if (mode == "synched") createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
			if (mode == "timeout") createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
		},
		add: function(f, s) {
			z_d("30");
			var t = zim.Ticker;
			if (t.has(f, s)) return f; // don't let the same function be added twice
			if (!t.framerate) t.setFPS();
			if (zot(s) || !s.update) s = zimDefaultFrame.stage;
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker.add() - only add functions"); return;}
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
			if (t.list.at(s)) {t.list.at(s).push(f);} else {t.list.add(s, [f]);}
			return f;
		},
		call: function(currentTime) {
			var t = zim.Ticker;
			var s, functions;
			for (var i=0; i<t.list.length; i++) {
				s = t.list.objects[i]; // stage
				functions = t.list.values[i]; // list of functions for the stage
				for (var j=0; j<functions.length; j++) {
					functions[j]();
				}
				if (t.alwaysList.at(s)) {
					s.update();
				} else if (functions.length > 0) {
					if (zot(t.update) && !zim.OPTIMIZE) {
						s.update();
					} else if (t.update) {
						s.update();
					}
				}
			}
			// may have no functions to run but always is turned on
			for (i=0; i<t.alwaysList.length; i++) {
				s = t.alwaysList.objects[i]; // stage
				if (t.list[s] == null) 	s.update(); // if functions then update is already handled
			}
		},
		always: function(s) {
			z_d("30");
			var t = zim.Ticker;
			if (!t.framerate) t.setFPS();
			if (zot(s) || !s.update) s = zimDefaultFrame.stage;
			t.alwaysList.add(s, true);
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
		},
		alwaysOff: function(s) {
			var t = zim.Ticker;
			if (zot(s) || !s.update) s = zimDefaultFrame.stage;
			t.alwaysList.remove(s);
		},
		remove: function(f) {
			var t = zim.Ticker;
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker - only remove functions"); return;}
			var count = 0;
			var s;
			for (var i=0; i<t.list.length; i++) {
				s = t.list.objects[i]; // stage
				var index = t.list.values[i].indexOf(f);
				if (index > -1) {
					t.list.values[i].splice(index,1);
				}
				count+=t.list.values[i].length;
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		removeAll: function(s) {
			var t = zim.Ticker;
			var count = 0;
			var st;
			for (var i=0; i<t.list.length; i++) {
				st = t.list.objects[i]; // stage
				if (zot(s) || s === st) {
					t.list.values[i] = [];
				}
				count+=t.list.values[i].length;
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		has: function(f,s) { // swapped params in zim 5.3.1
			if (zot(s) || !s.update) s = zimDefaultFrame.stage;
			return zim.Ticker.list && zim.Ticker.list.at(s) && zim.Ticker.list.at(s).indexOf(f) >= 0;
		},
		dispose: function(s) {
			var t = zim.Ticker;
			var count = 0;
			var st;
			for (var i=t.list.length-1; i>=0; i--) { // countdown when removing
				st = t.list.objects[i]; // stage
				if (zot(s) || s === st) {
					t.list.remove(s);
					t.alwaysList.remove(s);
				} else {
					count+=t.list.values[i].length;
				}
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
			return true;
		}
	}

	Object.defineProperty(zim.Ticker, 'update', {
		get: function() {
			return zim.Ticker.myUpdate;
		},
		set: function(value) {
			var t =  zim.Ticker;
			if (typeof value != "boolean") value = null;
			t.myUpdate = value;
			if (t.myUpdate === false) {
				 cancelAnimationFrame(t.ticker);
				 // note, this overrides always()
				 // but running always() will override update = false
				 t.alwaysList = new zim.Dictionary();
			}
		}
	});//-30

/*--
zim.Accessibility = function(appName, tabOrder, tabIndex, cycle, frame, decimals, alwaysHighlight, AHTime, AHColor, AHBorderWidth, AHBorderPadding, AHAlpha, AHObject, AHObjectScale)

Accessibility
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Adds Screen Reader accessibility to the canvas for TAB key or Swipe (mobile) highlighting of ZIM objects
Some objects can be activated using the ENTER key and adjusted using the ARROW keys
Default or custom titles can be set to be read by the Screen Reader
The objects and the order in which the objects recieve focus can be set with a tabOrder array
A text message can be passed to the talk() method and it will be read by a Screen Reader

NOTE: Instructions to activate a screen reader on desktop or laptop computers
On Windows, you can type Narrator into Cortana and run it - it is really easily
On Mac, under Accessibility choose Voice Over
On Android, under Accesibility choose Voice and turn on TalkBack
Windows worked at ZIM 6, Apple worked at 6.1.0, Android worked at 6.1.0 aside from Slider, Dial, Stepper and ColorPicker
Custom readers were not tested

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var button = new zim.Button().center(stage)
button.on("mousedown", function() {
	zgo("http://zimjs.com");
});
var dial = new zim.Dial().center(stage).mov(200);

var accessibility = new zim.Accessibility();
// this will automatically read in all objects on the stage and give default messages for the Screen Reader
// ENTER key events will be added to objects that will translate to mousedown and click events on the object
// Tab (swipe on mobile) to focus on the Button and press enter (double tap on mobile) to go to the ZIM site
// The Dial can use arrows to increase and decrease its value (up and right increase, down and left decrease)
// On mobile, double tapping the Dial brings up a select box with options (as does Slider, Stepper, and ColorPicker)

// OR

var accessibility = new zim.Accessibility("Second Example");
accessibility.tabOrder = [
	dial,
	{obj:button, title:"Press ENTER to go to ZIM site"}
];
// this will start and end the app with "Second Example" being read (rather than default, "application")
// the dial will be the first item to tab to
// the button has a tabOrder object so it will have the title read rather than the default button message
// You could also provide a tabOrder object for the dial as well
END EXAMPLE

NOTE: Please see http://zimjs.com/code/screenreader for a detailed example

PARAMETERS supports DUO - parameters or single object with properties below
appName - (default "application") read in screen reader when application receives or loses focus
tabOrder - (default an array of all ZIM Display Objects on stage) an array of zim Display Objects
 	These will be given TAB key control (and ENTER and ARROWS) and will work with Screen Readers
	Or given swipe left/right and double tap on mobile
	*** Alternatively, an array of tabOrder objects with an obj property and a title property can be used
	The obj is the Dispay Object and the title is what is read by the Screen Reader
	eg. {obj:button, title:"Press Enter Key to start game"}
	Can also specify tabOrder as a property of zim.Accessibility
	*** The tabOrder may change compared to the array that is initially provided
	*** as RadioButtons, Picker, Tabs, and Pad components are split into separate items
tabIndex - (default -1) - a starting index for focus - or can set tabIndex property after object is made
cycle - (default false) set to true to keep tab order inside application rather than leaving application when an end is reached
decimals - (default 2) number of decimals max to read for screen reader
frame - (default currentFrame) the frame
alwaysHighlight - (default false) screen readers will add their own highlights - but this will set highlight to true even if there is no screen reader
	Set to true to place a rectangle around the object being put into focus by pressing the tab key or swipe on mobile
	This will replace screen reader highlights (eg. for Windows Narrator) except for when aria is true (eg. Apple Voice Over)
	The rest of the parameters relate to the alwaysHighlight - meaning highlight even if there is no screen reader
AHTime - (default 700ms) milliseconds to show the alwaysHighlight
AHColor - (default brown) - the color of the alwaysHighlight rectangle
AHBorderWidth - (default 3) thickness of border
AHBorderPadding - (default 5) distance from object bounds outward towards border
AHAlpha - (default .8) alpha of the alwaysHighlight
AHObject - (default null) set to a display object - including animated objects - to override the rectangle as a alwaysHighlight object
AHObjectScale - (default .8) scale the AHObject relative to the object with tab focus

PROPERTIES
tabOrder - get or set an array with the order in which display objects will receive focus with tab and shift tab (swipe on mobile)
tabIndex - get or set the index of the tabOrder (also see currentObject)
	Setting works only if object at the index is on the stage
	Returns -1 if no tabOrder object has the focus
currentObject - get or set the object in the tabOrder that has focus
	Objects have the following Accessibility properties added:
		zimAccessibility - the accessibility object
		zimTabIndex - the index in the tabOrder
		zimTabTag - the HTML tag that is used to represent the object to the screen reader
		zimTabParent - the parent of an object for RadioButtons, Tabs, and Pads (for others, the zimTabParent is the object)
		tabIndex - the index of the tag in tabParent (if there is a parent)
		type - the type of object. If there is a zimTabParent (that is not itself), the type is RadioButton, TabsButton or PadButton
activatedObject - get the object in the tabOrder that was last clicked or had the ENTER key pressed on
startAppTag - get the HTML tag that announces application start
endAppTag - get the HTML tag that announces application end
cycle - (default false) set to true to keep tab order inside application rather than leaving application when an end is reached
decimals - (default 2) number of decimals max to read for screen reader
frame - (default currentFrame) the frame
alwaysHighlight - Boolean to use a alwaysHighlight rectangle
AHTime - milliseconds to show the hightlight
AHColor - the color of the alwaysHighlight rectangle
AHBorderWidth - thickness of border
AHBorderPadding - (default 5)distance from object bounds outward towards border
AHAlpha - alpha of the alwaysHighlight
AHObject - set to a display object - including animated objects - to override the rectangle as a alwaysHighlight object
AHObjectScale - scale the AHObject relative to the object with tab focus
enabled - default is true - set to false to disable

METHODS
tab(dir) - set dir to 1 (default) to emulate tab forward or -1 to emulate shift tab
changeTitle(target, title, activate) - change a title for the Screen Reader
	target - the tabObject (eg. button) or the tabIndex of the item in the tabOrder to change
		*** The tabOrder may change compared to the array that is initially provided
		*** as RadioButtons, Picker, Tabs, and Pad components are split into separate items
	title - the new title that will be read to the screen reader
		If no title is provided any component passed will just update to its currentValue or selectedIndex
	activate (default false) - set to true to set focus of item at index and send to Screen Reader
talk(words) - tell the Screen Reader to read the words provided (does not affect focus)
resize(target) - target is the object or index of the object to update - or do not pass a target to update all
	This needs to be done if the object is moved, scaled, or removed from / re-added to the stage
	Accessibility works by placing HTML tags behind the canvas where the ZIM objects exist - so resize() handles this
	Use the Frame resize event and optionally, the zim.ResizeManager()
dispose() - removes listeners and sets tabOrder to []

EVENTS
Dispatches a "change" event when the screen reader is about to talk
	This is when the talk() method runs or the tabIndex is changed (from click, swipe, tab, changeTitle - with activate true)
	The event object has a title property that holds the words the screen reader will say
 	Several change events can happen at the same time so what is said is usually the last
	but the talk() method takes priority as it runs in alert mode so focus is not lost
 The Enter key dispatches mousedown and click events from object with focus
	The event object has a fromEnter property which is true if from an enter key on the object
	This could trigger a button press for instance

--*///+30.5
	zim.Accessibility = function(appName, tabOrder, tabIndex, cycle, decimals, frame, alwaysHighlight, AHTime, AHColor, AHBorderWidth, AHBorderPadding, AHAlpha, AHObject, AHObjectScale) {

		var sig = "appName, tabOrder, tabIndex, cycle, decimals, frame, alwaysHighlight, AHTime, AHColor, AHBorderWidth, AHBorderPadding, AHAlpha, AHObject, AHObjectScale";
		var duo; if (duo = zob(zim.Accessibility, arguments, sig, this)) return duo;
		z_d("30.5");
		this.cjsEventDispatcher_constructor();

		if (zot(appName)) appName = "application";
		if (zot(cycle)) cycle = false;
		if (zot(decimals)) decimals = 2;
		if (zot(frame)) frame = zimDefaultFrame;
		if (zot(alwaysHighlight)) alwaysHighlight = false;
		if (zot(AHTime)) AHTime = 700;
		if (zot(AHColor)) AHColor = "brown";
		if (zot(AHBorderWidth)) AHBorderWidth = 3;
		if (zot(AHBorderPadding)) AHBorderPadding = 5;
		if (zot(AHAlpha)) AHAlpha = .8;
		if (zot(AHObjectScale)) AHObjectScale = .8;
		if (zot(AHObject)) {
			var alwaysHighlightShape = new zim.Shape();
			alwaysHighlightShape.mouseEnabled = false;
		} else {
			if (AHObject.mouseEnabled) AHObject.mouseEnabled = false;
		}

		var that = this;
		that.cycle = cycle;
		that.decimals = decimals
		that.alwaysHighlight = alwaysHighlight; // will want to set as getter setter
		that.AHTime = AHTime;
		that.AHColor = AHColor;
		that.AHBorderWidth = AHBorderWidth;
		that.AHBorderPadding = AHBorderPadding;
		that.AHAlpha = AHAlpha;
		that.AHObjectScale = AHObjectScale;

		// ZIM Accessability
		// If there is a tabOrder then make HTML tags (tabTags) that match tab objects
		// Put these outside viewable document area and give them titles that match the text property
		// ALSO - add:
		// 1. a tabPrefixTag before the canvas
		// 2. a tabBufferTag before and after the last tabTag
		// 3. a tabSuffixTag before and after the buffer
		// These are used when exiting or entering canvas tab system
		// When entering, the tab system forwards the focus to the first or last tab on stage
		// When exiting, the prefix or suffix is left active, the title is read
		// This allows the next tab to go to the normal tab order on the HTML page
		// The buffer tag lets us enter the canvas if the user goes back after exiting to the suffix tag
		// there is no need for a buffer tag for the prefix as we use the canvas tag itself
		// 4. We also add a talk tag with a role of alert
		// We change the innerHTML of this tag and it will be read without losing focus

		// item is used for an object from the tabOrder - with obj and title properties
		// obj is used when referencing the obj property of the item

		var _tabOrder = -1; // will be an array, but need to handle purposeful empty array
		var _tabIndex = -1;
		var tabTags = [];
		var tabEvents = [];
		var phrases = {RadioButtons:"option", Tabs:"tab", Pad:"key"};
		var currentHighlight;
		var canvasID = frame.canvas.id;
		var mobile = zim.mobile();
		var ariaCheck = false; // keeps track of whether we have checked aria
		var _aria = null; // keeps track of aria setting
		var ariaEvents = []; // [obj, event] - uses on
		var prefixTab;
		var suffixTab;
		var talkTag;
		var noAriaTabPrefix
		var noAriaTabSuffix
		var noAriaTabPrefix2
		var noAriaTabSuffix2
		var firstDelay = 100; // ms to let component changes take place for mobile
		var secondDelay = 150;
		var lastAriaTag;
		Object.defineProperty(this, 'tabOrder', {
			get: function() {
				return _tabOrder;
			},
			set: function(array) {

				// remove any previous tabTags and prefix/suffix and events
				if (prefixTab) prefixTab.removeEventListener("focus", clearAlert);
				if (suffixTab) suffixTab.removeEventListener("focus", clearAlert);
				for (var i=0; i<tabTags.length; i++) {
					tabTags[i].outerHTML = "";
				}
				tabTags = [];

				// remove any previous mousedown events added to capture focus
				var item;
				var obj;
				for (i=0; i<tabEvents.length; i++) {
					item = _tabOrder[i];
					if (item) tabEvents[i][0].off("mousedown", tabEvents[i][1]);
				}
				tabEvents = [];
				_tabOrder = [];
				var finalTabs = [];
				var lastMadeTag = frame.canvas;

				var subtotal = 0;
				for (var i=0; i<array.length; i++) {
					item = array[i];
					if (item.constructor == {}.constructor) {
						obj = item.obj;
						if (!obj || !obj.getStage) continue; // must provide display object
						if (!item.title) item.title = getText(obj, i+subtotal);
					} else {
						obj = item;
						item = {obj:item, title:getText(item, i+subtotal)};
					}

					// these components we will split into individual tab items
					// we use the RadioButtons labels and the Tabs and Pad buttons
					// and there is a slight difference in phrasing - otherwise, they work the same
					if (obj.type == "RadioButtons" || obj.type == "Tabs" || obj.type == "Pad") {
						var splitAdd = [];
						subtotal--; // subtract 1 for the obj in array we replace
						for (var j=0; j<obj.buttons.length; j++) {
							subtotal++;
							var but = obj.buttons[j];
							var splitItem = {obj:but, title:item.title + " - " + phrases[obj.type] + ": " + ((but.text=="a" || but.text=="A") ? "eh" : but.text)}
							splitAdd.push(splitItem);
							but.zimTabParent = obj;
							but.zimTabParent.zimAccessibility = that;
							but.zimTabIndex = i+subtotal; // for click event
							but.tabIndex = j; // for seeing if pressed
							but.zimAccessibility = that;
							addExtraTitle(splitItem);
							lastMadeTag	= makeTabTag(canvasID+"Tab"+(i+subtotal), splitItem.title, lastMadeTag, splitItem);
							tabEvents.push([but, but.on("mousedown", setTabFocus)]);
							if (!ariaCheck) ariaEvents.push([but, but.on("mousedown", ariaCheckEvent)]);
						}
						finalTabs = finalTabs.concat(splitAdd);
					} else {
						obj.zimTabIndex = i+subtotal;
						obj.zimTabParent = obj; // just so always can ask for zimTabParent
						addExtraTitle(item);
						obj.zimAccessibility = that;
						tabEvents.push([obj, obj.on("mousedown", setTabFocus)]);
						if (!ariaCheck) ariaEvents.push([obj, obj.on("mousedown", ariaCheckEvent)]);
						finalTabs.push(item);
						lastMadeTag	= makeTabTag(canvasID+"Tab"+(i+subtotal), item.title, lastMadeTag, item);
					}
				}

				// ARIA
				// need to check for aria which is used by Apple Voice Over for instance...
				// so start assuming aria is true
				// then make a noAria tag before the prefix and a noAria tag after the suffix
				// these will have aria-hidden = true attributes
				// they also have a focus event and if the focus is triggered, _aria gets set to false
				// also, the noAria tags are removed and focus given to the prefix or suffix
				// So... the check does not work right away, but just as focus

				prefixTab = that.startAppTag = makeTabTag(canvasID+"PrefixTab", appName + " start", frame.canvas, null, "before"); // resting tag when exiting backwards
				prefixTab.addEventListener("focus", clearAlert);
				if (!ariaCheck) {
					prefixTab.addEventListener("focus", removeAriaEvent);
					// make tags surrounding prefix that set aria to false if seen by non-aria
					noAriaTabPrefix = makeTabTag(canvasID+"noAriaTab", "", prefixTab, null, "before");
					noAriaTabPrefix.setAttribute("aria-hidden", true);
					noAriaTabPrefix.focusTab = prefixTab;
					noAriaTabPrefix.addEventListener("focus", ariaFalseEvent);
					// if click inside on TextArea or Loader it will not determine aria
					// and so, we may arrive at the prefix going backwards from the inside - sigh
					noAriaTabPrefix2 = makeTabTag(canvasID+"noAriaTab", "", prefixTab);
					noAriaTabPrefix2.setAttribute("aria-hidden", true);
					noAriaTabPrefix2.focusTab = prefixTab;
					noAriaTabPrefix2.addEventListener("focus", ariaFalseEvent);
				}

				lastMadeTag = makeTabTag(canvasID+"BufferTab", "", lastMadeTag); // catch tag if sent to suffix then shift tabs back in to canvas
				// not sure if I need this on mobile
				if (mobile) lastMadeTag.setAttribute("aria-hidden", true);

				lastMadeTag = suffixTab = that.endAppTag = makeTabTag(canvasID+"SuffixTab", appName + " end", lastMadeTag); // resting tag when exiting forward
				suffixTab.addEventListener("focus", clearAlert);
				if (!ariaCheck) {
					suffixTab.addEventListener("focus", removeAriaEvent);
					lastMadeTag = noAriaTabSuffix = makeTabTag(canvasID+"noAriaTab", "", suffixTab); // resting tag when exiting backwards
					noAriaTabSuffix.setAttribute("aria-hidden", true);
					noAriaTabSuffix.focusTab = suffixTab;
					noAriaTabSuffix.addEventListener("focus", ariaFalseEvent);

					noAriaTabSuffix2 = makeTabTag(canvasID+"noAriaTab", "", suffixTab, null, "before"); // resting tag when exiting backwards
					noAriaTabSuffix2.setAttribute("aria-hidden", true);
					noAriaTabSuffix2.focusTab = suffixTab;
					noAriaTabSuffix2.addEventListener("focus", ariaFalseEvent);
				}

				_tabOrder = finalTabs;
			}
		});


		Object.defineProperty(this, 'tabIndex', {
			get: function() {
				return _tabIndex;
			},
			set: function(num) {
				if (!_state) return;
				if (num < 0 || num >= _tabOrder.length) {
					clearTab();
				} else {
					if (num != _tabIndex) clearOld();
					var obj = _tabOrder[num].obj;
					if (obj.stage) {
						_tabIndex = num;
						obj.focus = true;
						tabFocus = true;
						tabFirstCheck = false;

						that.changeTitle(obj);
						obj.zimTabTag.focus();

						setTimeout(function() {
							obj.zimTabTag.focus();
							var readerEvent = new createjs.Event("change");
							readerEvent.title = obj.zimTabTag.getAttribute("aria-label");
							that.dispatchEvent(readerEvent);
						}, secondDelay);

						// if (num == _tabIndex) return;

						// custom hightlights
						if (that.alwaysHighlight && !_aria) {
							if (!that.AHObject) {
								currentHighlight = alwaysHighlightShape;
								var oB = obj.getBounds();
								var pTL = obj.localToGlobal(oB.x-5, oB.y-5);
								var pTR = obj.localToGlobal(oB.x+oB.width+5, oB.y-5);
								var pBR = obj.localToGlobal(oB.x+oB.width+5, oB.y+oB.height+5);
								var pBL = obj.localToGlobal(oB.x-5, oB.y+oB.height+5);

								var g = alwaysHighlightShape.graphics;
								g.clear();
								g.s(that.AHColor).ss(that.AHBorderWidth)
									.mt(pTL.x, pTL.y)
									.lt(pTR.x, pTR.y)
									.lt(pBR.x, pBR.y)
									.lt(pBL.x, pBL.y)
									.lt(pTL.x, pTL.y)
									.cp();
								alwaysHighlightShape.alpha = that.AHAlpha;
								if (that.AHTime > 0) tabTimeout = setTimeout(function(){frame.stage.removeChild(alwaysHighlightShape); frame.stage.update();}, that.AHTime);

							} else {
								currentHighlight = that.AHObject;
								var b = zim.boundsToGlobal(obj);
								that.AHObject.alp(that.AHAlpha).addTo(frame.stage)
								that.AHObject.fit(b.x, b.y, b.width, b.height)
								that.AHObject.scale(that.AHObject.scaleX*that.AHObjectScale);
								if (that.AHTime > 0) tabTimeout = setTimeout(function(){frame.stage.removeChild(that.AHObject); frame.stage.update();}, that.AHTime);
							}
							frame.stage.addChild(currentHighlight);
							frame.stage.update();
						}
					} else {
					 	clearTab();
					}
				}
				function clearOld() {
					if (_tabIndex && _tabIndex > -1) {
						_tabOrder[_tabIndex].obj.focus = false;
					} else {
						for (var i=0; i<_tabOrder.length; i++) {
							_tabOrder[i].obj.focus = false;
						}
					}
				}
				function clearTab() {
					clearOld();
					tabFocus = false;
					if (that.AHObject) frame.stage.removeChild(that.AHObject);
					if (that.alwaysHighlightShape) frame.stage.removeChild(that.alwaysHighlightShape);
					frame.stage.update();
					_tabIndex = -1;
				}
			}
		});

		Object.defineProperty(this, 'aria', {
			get: function() {
				return _aria;
			},
			set: function(val) {
				_aria = val;
				if (_aria) setAriaTrue();
				// and more
			}
		});

		// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		// Aria
		// function called from mousedown on any object to see if entering app through mousedown rather than tab
		// ONLY HAPPENS ONCE! function gets removed after checking
		function ariaCheckEvent(e) {
			var obj = e.currentTarget;
			var bounds = obj.boundsToGlobal();
			var cX = bounds.x + bounds.width/2;
			var cY = bounds.y + bounds.height/2;
			var delta = 5;
			// aira sends event through with mouseX and mouseY at the center of the object
			if (e.stageX < cX-delta || e.stageX > cX+delta || e.stageY < cY-delta || e.stageY > cY+delta) {
				setAriaFalse();
			} else {
				setAriaTrue();
			}
		}

		function clearAlert() {
			if (talkTag) talkTag.innerHTML = "";
		}

		// function to set aria true
		function setAriaTrue() {
			_aria = true;
			removeAriaCheck();
			if (talkTag) talkTag.setAttribute("aria-hidden", false);

			zim.ACTIONEVENT = "click";
			// can't tell if aria until first click which might place a highlight
			// aria uses its own highlight so do not want two highlights
			// for windows narrator, if we use a custom highlight then we move the tags off the stage
			// but with mobile, they don't get moved off the stage but rather to the edge of the screen - arrg
			frame.stage.removeChild(currentHighlight);
			that.alwaysHighlight = false;
			frame.stage.update();
			var item;
			var obj;
			var tag;
			for (var i=0; i<_tabOrder.length; i++) {
				item = _tabOrder[i];
				obj = item.obj;
				tag = obj.zimTabTag;
				tag.disabled = false;
				item.title = item.title.replace(/\s\(use arrow keys\)/, "");
				tag.setAttribute("aria-label", item.title);
				tag.addEventListener("focus", ariaTagFocusEvent);
			}
		}
		// function to set aria false
		function setAriaFalse() {
			_aria = false;
			var item;
			var obj;
			var tag;
			for (var i=0; i<_tabOrder.length; i++) {
				item = _tabOrder[i];
				obj = item.obj;
				tag = obj.zimTabTag;
				tag.disabled = false;
			}
			removeAriaCheck();
			if (alwaysHighlight) moveTagsOffstage();
		}

		// function to go to new tag via aria swipe
		// note, the aria-label is read as soon as focus is received
		// so can't do any testing of selected, or values
		// so the label must be set before coming in to focus
		function ariaTagFocusEvent(e) {
			var tag = e.currentTarget;
			var obj = tag.zimObject;
			// that.tabIndex = obj.zimTabIndex;
			_tabIndex = obj.zimTabIndex;
			obj.focus = true;
			var readerEvent = new createjs.Event("change");
			readerEvent.title = tag.getAttribute("aria-label");
			that.dispatchEvent(readerEvent);
		}

		// function to send focus to prefix or suffix if no aria present
		function ariaFalseEvent(e) {
			_aria = false;
			e.target.focusTab.focus();
		}
		// function to set aria when arriving at prefix or suffix
		function removeAriaEvent() {
			if (zot(_aria) || _aria) setAriaTrue(); // was not set to false or was set to true
			else setAriaFalse(); // was set to false
		}

		// function to remove ariaChecking objects and events
		function removeAriaCheck() {
			ariaCheck = true;

			prefixTab.removeEventListener("focus", removeAriaEvent);
			suffixTab.removeEventListener("focus", removeAriaEvent);

			noAriaTabPrefix.removeEventListener("focus", ariaFalseEvent);
			noAriaTabSuffix.removeEventListener("focus", ariaFalseEvent);
			noAriaTabPrefix.parentNode.removeChild(noAriaTabPrefix);
			noAriaTabSuffix.parentNode.removeChild(noAriaTabSuffix);

			noAriaTabPrefix2.removeEventListener("focus", ariaFalseEvent);
			noAriaTabSuffix2.removeEventListener("focus", ariaFalseEvent);
			noAriaTabPrefix2.parentNode.removeChild(noAriaTabPrefix2);
			noAriaTabSuffix2.parentNode.removeChild(noAriaTabSuffix2);

			for (var i=0; i<ariaEvents.length; i++) {
				ariaEvents[i][0].off("mousedown", ariaEvents[i][1]);
			}
		}

		// function to move tags offstage if there is no aria
		function moveTagsOffstage() {
			for (var i=0; i<tabTags.length; i++) {
				var t = tabTags[i];
				if (t.zimObject && (t.zimObject.type == "Loader" || t.zimObject.type == "TextArea")) continue;
				tabTags[i].style.left = "-2000px";
			}
		}


		// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

		// function to handle tabOrder parameter versus tabOrder property being set at start
		if (!zot(tabOrder)) {
			_tabOrder = [];
			that.tabOrder = tabOrder;
			if (!zot(tabIndex)) that.tabIndex = tabIndex;
		} else {
			// wait a sec to see if the tabOrder property is set
			// and if not, set a default tabOrder to all objects on the stage
			setTimeout(function() {
				if (_tabOrder == -1) {
					_tabOrder = [];
					var tabTemp = [];
					zim.loop(frame.stage, function(obj){if (obj.type) tabTemp.push(obj);});
					that.tabOrder = tabTemp;
					if (!zot(tabIndex)) that.tabIndex = tabIndex;
				}
			}, 50);
		}

		// CLICK
		// function called from mousedown on any tabOrder objects to handle setting tabIndex
		function setTabFocus(e) {
			var obj = e.currentTarget;
			if (obj.type == "RadioButton" || obj.type == "TabsButton" || obj.type == "PadButton") {
				for (var j=0; j<obj.zimTabParent.buttons.length; j++) {
					var but = obj.zimTabParent.buttons[j];
					but.zimTabTag.setAttribute("aria-label", but.zimTabTag.getAttribute("aria-label").split(" - currently")[0] + (obj.zimTabParent.selectedIndex == but.tabIndex ? " - currently selected." : " - currently not selected."));
				}
			}
			that.tabIndex = e.currentTarget.zimTabIndex;
			that.activatedObject = obj;
		}

		// function to create text for screen reader prepending object type
		// and in some cases if tabParent then preparing prefix for future items like radio buttons
		function getText(obj) {
			if (obj.type == "TextArea" || obj.type == "RadioButtons" || obj.type == "Tabs" || obj.type == "Pad") return obj.type; // first part of title naming for radio button if no title provided
			if (obj.type == "Waiter") return "Waiter active - please wait";
			return obj.text ? obj.type + " - " + ((obj.text=="a" || obj.text=="A") ? "eh" : obj.text) : obj.type + ((obj.type == "Dial" || obj.type == "Slider" || obj.type == "ColorPicker" || obj.type == "Stepper") ? " (use arrow keys)" : "") + ((obj.type == "TextArea") ? " (press ENTER to edit)" : "");
		}

		// function to add extra information to title
		function addExtraTitle(item) {
			var obj = item.obj;
			item.title = item.title.replace(/\.$/, "");
			if (obj.type == "RadioButton" || obj.type == "TabsButton" || obj.type == "PadButton") item.title = item.title + (obj.tabIndex == obj.zimTabParent.selectedIndex ? " - currently selected" : " - currently not selected");
			else if (obj.type == "CheckBox") item.title = item.title + (obj.checked ? " - currently checked" : " - currently not checked");
			else if (obj.type == "Stepper") item.title = item.title + " - currently displaying " + obj.currentValue;
			else if (obj.type == "Slider" || obj.type == "Dial") item.title = item.title + " - currently at " + zim.decimals(obj.currentValue, that.decimals);
			else if (obj.type == "ColorPicker") item.title = item.title + " - currently at " + obj.selectedColor;
			else if (obj.type == "TextArea") item.title = item.title + (obj.tag.value != "" ? "" : " - placeholder: " + obj.tag.placeholder); // text areas get read automatically (except placeholder)
			else if (obj.type == "Indicator") item.title = item.title + " - currently " + (obj.selectedIndex>=0 ? "at " + (obj.selectedIndex+1) + " of " + obj.num :  "not indicating");
			item.title += ".";
		}

		// function to make HTML tags off screen to feed titles to screen reader using focus()
		function makeTabTag(id, title, targetTag, item, place) {
			var obj;
			var tabTag;
			if (item) obj = item.obj;
			if (item && (obj.type == "TextArea" || obj.type == "Loader")) {
				var tabTag = obj.tag;
				tabTag.setAttribute("aria-label", title);
				if (obj) tabTag.setAttribute("aria-hidden", !obj.stage);
				if (place == "before") {
					targetTag.parentNode.insertBefore(tabTag, targetTag);
				} else {
					targetTag.parentNode.insertBefore(tabTag, targetTag.nextSibling);
				}
				tabTag.style.zIndex = "5";
				tabTag.zimObject = obj;
				item.obj.zimTabTag = tabTag;
				tabTags.push(tabTag);
				return tabTag;
			}
			if (item && (obj.type == "Dial" || obj.type == "Slider" || obj.type == "Stepper" || obj.type == "ColorPicker")) {
				var stepArray = [];
				if (obj.type == "Dial" || obj.type == "Slider") {
					var step = (obj.step <= 0 ? (obj.max-obj.min)/20 : obj.step);
					for (var i=obj.min; i<obj.max; i=i+step) {
						stepArray.push(obj.min + i);
					}
				} else if (obj.type == "Stepper") {
					stepArray = obj.stepperArray;
				} else if (obj.type == "ColorPicker") {
					stepArray = obj.colors;
				}
				tabTag = document.createElement("select");
				tabTag.disabled = true;
				tabTag.zimObject = obj;
				tabTag.addEventListener("change", function(e) {
					if (!_aria) return;
					e.currentTarget.zimObject.zimTabParent.currentValueEvent = e.target.value;
					frame.stage.update();
				});
				tabTag.size = 1;
				var el;
				var op;
				for (var i=0; i<stepArray.length; i++) {
					el = stepArray[i];
					op = document.createElement("option");
					op.setAttribute("aria-label", el);
					op.innerHTML = el;
					tabTag.add(op);
					if (el == obj.zimTabParent.currentValue) op.setAttribute("selected", "selected");
				}
				tabTag.setAttribute("role", "button");
			} else {
				tabTag = document.createElement("div");
				if (obj) tabTag.zimObject = obj;
				tabTag.innerHTML = "tag"; // needs to have text for ipad to read it
				tabTag.setAttribute("role", "button");
			}
			tabTag.setAttribute("id", id);
			tabTag.setAttribute("tabindex", 0);
			tabTag.setAttribute("aria-label", title);
			if (obj) tabTag.setAttribute("aria-hidden", !obj.stage);

			if (place == "before") {
				targetTag.parentNode.insertBefore(tabTag, targetTag);
			} else {
				targetTag.parentNode.insertBefore(tabTag, targetTag.nextSibling);
			}
			tabTag.style.position = "absolute";
			if (item) {
				var obj = item.obj;
				var bounds = obj.boundsToGlobal();
				tabTag.style.left = (frame.x + bounds.x * frame.scale)+"px";
				tabTag.style.top = (frame.y + bounds.y * frame.scale)+"px";
				tabTag.style.width = (bounds.width * frame.scale)+"px"
				tabTag.style.height = (bounds.height * frame.scale)+"px"
				item.obj.zimTabTag = tabTag;
			} else {
				tabTag.style.left = -1000+"px";
				tabTag.style.top = frame.y+"px";
			}
			tabTag.style.overflow = "hidden"
			tabTag.style.zIndex = "5";
			tabTag.style.fontSize = "20px";

			tabTags.push(tabTag);
			return tabTag;
		}

		// keydown event to handle tab, enter and arrows for various objects
		var tabFocus = false;
		var tabFirstCheck = true;
		var tabFrameEvent = frame.on("keydown", function(e) {
			if (e.keyCode==9) {
				if (!checkTabs()) { // check focus has not been given outside frame canvas
					tabFocus = false;
					if (that.tabIndex != -1) that.tabIndex = -1;
				}
				if (tabFocus) {
					goTabs(e);
				} else {
					setTabs(e);
				}
			}

			// area for special keys ENTER, ARROWS if frame has tabFocus, etc.
			if (tabFocus && _tabOrder.length > 0 && that.tabIndex >= 0) {

				// ENTER key
				if (e.keyCode==13) {
					var item = _tabOrder[that.tabIndex];
					var obj = item.obj;
					if (item && obj.stage) {
						var downEvent = new createjs.Event("mousedown");
						var clickEvent = new createjs.Event("click");
						downEvent.fromEnter = clickEvent.fromEnter = true;
						if (obj.type == "Pane") {
							obj.backdrop.dispatchEvent(downEvent); // on backdrop
							obj.backdrop.dispatchEvent(clickEvent);
						} else {
							obj.dispatchEvent(downEvent);
							obj.dispatchEvent(clickEvent);
						}
					}
				}

			} // end special keys (not tab)

		}); // keydown event


		// function to check if any other HTML tag or other Frame currently has taken focus
		// this is not called immediately when focus is lost but rather on next keydown event with tab key pressed
		function checkTabs() {
			var frameTagFocus = false;
			for (var i=0; i<tabTags.length; i++) {
				if (document.activeElement == tabTags[i]) {
					frameTagFocus = true;
					break;
				}
			}
			if (document.activeElement == frame.canvas || frameTagFocus) return true;
			return false;
		}

		// function to test for tab key event when currently on PrefixTab or SuffixTab for frame
		// will then set up tabFocus and send focus to right object with goTabs()
		function setTabs(e) {
			if (!frame.shiftKey && (zid(canvasID+"PrefixTab") == document.activeElement || frame.canvas == document.activeElement)) {
				// this means tabbing forward and arriving at canvas
				// set tab to last tabTag on canvas so next goes to first tabTag
				if (_tabOrder.length > 0) _tabOrder[_tabOrder.length-1].obj.focus = true;
				tabFirstCheck = true;
				tabFocus = true;
				goTabs(e);
			} else if (frame.shiftKey && (zid(canvasID+"SuffixTab") == document.activeElement || zid(canvasID+"BufferTab") == document.activeElement)) {
				// this means tabbing with shift and arriving at SuffixTab
				// so set to first tabTag so goTabs loops backwards around to last tabTag
				// as long as tabFirstCheck is true
				// we have entered the canvas so set the tabFocus to true
				if (_tabOrder.length > 0) _tabOrder[0].obj.focus = true;
				tabFirstCheck = true;
				tabFocus = true;
				goTabs(e);
			}
		}

		// function to call tab() used by setTabs and keydown when tabs are already set
		function goTabs(e) {
			if (e.ctrlKey) {
				focusToDoc(e.shiftKey?-1:1);
				return;
			}
			if (e.shiftKey) that.tab(-1);
			else that.tab(1);
			e.preventDefault();
		}

		// method to move to next or previous tab - called from goTabs() or by user
		var tabTimeout;
		this.tab = function(dir) {
			clearTimeout(tabTimeout);
			if (currentHighlight) frame.stage.removeChild(currentHighlight);
			if (zot(dir)) dir = 1;
			if (_tabOrder.length == 0) {
				focusToDoc(dir);
				return;
			}
			for (var i=0; i<_tabOrder.length; i++) {
				var obj = _tabOrder[i].obj;
				if (obj.focus) {
					obj.focus = false;
					var index = i + dir;
					var normalizedIndex = (index+_tabOrder.length*10000)%_tabOrder.length;
					var tabData = _tabOrder[normalizedIndex]
					obj = tabData.obj;

					// make sure on stage
					var attempts = 0;
					var badTabs = false;
					// keep looking if the object t is not on the stage or is not enabled (or parent is not enabled if it has one)
					while(!(obj.stage && ((!obj.zimTabParent && (zot(obj.enabled) || obj.enabled)) || (obj.zimTabParent && (zot(obj.zimTabParent.enabled) || obj.zimTabParent.enabled))))) {
						attempts++;
						index = index + dir;
						normalizedIndex = (index+_tabOrder.length*100)%_tabOrder.length;
						tabData = _tabOrder[normalizedIndex];
						obj = tabData.obj;
						if (attempts == _tabOrder.length) { // none on stage
							badTabs = true;
							break;
						};
					}
					if (badTabs || (!that.cycle && index != normalizedIndex && !tabFirstCheck)) {
						focusToDoc(dir);
						return;
					}
					tabFirstCheck = false;
					that.tabIndex = normalizedIndex;
					break;
				}
			}
		}

		// function to give focus to html doc when no more frame tabs left in direction we are tabbing
		function focusToDoc(dir) {
			tabFocus = false
			zid(canvasID + (dir==1 ? "SuffixTab" : "PrefixTab") ).focus();
			frame.stage.removeChild(AHObject);
			frame.stage.update();
			that.tabIndex = -1;
		}

		// target is tabIndex or obj
		this.changeTitle = function(target, title, activate) {
			if (typeof target != "number") target = target.zimTabIndex;
			if (zot(target)) return;
			if (activate && zot(title)) {that.tabIndex = target; return;} // changeTitle is called from within tabIndex setter function (without the activate part...)
			var item = _tabOrder[target];
			var obj = item.obj;
			// when passing no title will be coming from component for title update due to change in component
			// if you want no title, then pass "" as title
			if (zot(title)) title = obj.zimTabTag.getAttribute("aria-label").split(" - currently")[0];
			item.title = title;
			addExtraTitle(item);
			obj.zimTabTag.setAttribute("aria-label", item.title);
			if (activate) that.tabIndex = target;
		}
		var talkCheck = false;
		this.talk = function(words) {
			// talk tag
			// this prevents talk tag from being read at the start - activate it once we need to talk
			// then we set the innerHTML to "" when we swipe focus to start or end app on the way out
			// we may still get the tag read on mobile if they exit the app through some other tag
			// and then swipe focus towards end of app - as it is just after the end of app
			// this will then re-read the message... but it is unlikely, and did not see a way around it
			if (!talkCheck) {
				talkTag = makeTabTag(canvasID+"TalkTab", "", suffixTab);
				talkTag.setAttribute("role", "alert");
				talkTag.setAttribute("aria-hidden", !_aria);
				talkCheck = true;
			}
			// talk tag is role alert which allows it to talk without removing focus
			// the tag is aria-hidden for aria == false
			talkTag.setAttribute("aria-label", words);
			talkTag.innerHTML = " "; // force change
			talkTag.innerHTML = words;
			var readerEvent = new createjs.Event("change");
			// TODO - remove talk in front of event
			readerEvent.title = words;
			that.dispatchEvent(readerEvent);
		}

		this.resize = function(target) {
			if (!zot(target)) {
				if (typeof target != "number") target = target.zimTabIndex;
				if (target < 0) return;
				var item = _tabOrder[target];
				var obj = item.obj;
				if (!obj.stage && currentHighlight && obj==that.currentObject) {
					frame.stage.removeChild(currentHighlight);
					frame.stage.update();
				}
				if (that.alwaysHighlight && !zot(_aria)) return;
				resizeObj(obj);
			} else {
				if (that.alwaysHighlight && !zot(_aria)) return;
				for (var i=0; i<_tabOrder.length; i++) {
					resizeObj(_tabOrder[i].obj);
				}
			}
			function resizeObj(obj) {
				if (obj.type == "TextArea" || obj.type == "Loader") {
					obj.resize();
					return;
				} else {
					var bounds = obj.boundsToGlobal();
					var tabTag = obj.zimTabTag;
					tabTag.style.left = (frame.x + bounds.x * frame.scale)+"px";
					tabTag.style.top = (frame.y + bounds.y * frame.scale)+"px";
					tabTag.style.width = (bounds.width * frame.scale)+"px"
					tabTag.style.height = (bounds.height * frame.scale)+"px"
				}
				tabTag.setAttribute("aria-hidden", !obj.stage);
				tabTag.hidden = !obj.stage;
			}
		}

		Object.defineProperty(this, 'currentObject', {
			get: function() {
				if (_tabOrder[_tabIndex] && _tabOrder[_tabIndex].obj) return _tabOrder[_tabIndex].obj;
				else return null
			},
			set: function(obj) {
				for (var i=0; i<_tabOrder.length; i++) {
					if (_tabOrder[i].obj == obj) {that.tabIndex = i; break;}
				}
			}
		});

		_state = true;
		Object.defineProperty(this, 'enabled', {
			get: function() {
				return _state;
			},
			set: function(state) {
				_state = state;
			}
		});

		this.dispose = function() {
			that.tabOrder = [];
			for (var i=0; i<tabTags.length; i++) {
				tabTags[i].outerHTML = "";
			}
			that.removeAllEventListeners();
			frame.off("keydown", tabFrameEvent);
		}
	}
	zim.extend(zim.Accessibility, createjs.EventDispatcher, null, "cjsEventDispatcher", false);
	//-30.5

/*--
zim.Swipe = function(obj, distance, duration)

Swipe
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Sets up capturing swipes on objects.
Dispatches a "swipe" event on swipe left, right, up, down.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var rect = new zim.Rectangle(200, 200, "blue");
rect.center(stage);
var swipe = zim.Swipe(rect);
var distance = 100;
swipe.on("swipe", function(e) {
	zog(e.swipeX); // -1, 0, 1  (for left, none and right)
	zog(e.swipeY); // -1, 0, 1  (for up, none and down)

	// move directly:
	// rect.x += distance * e.swipeX;
	// rect.y += distance * e.swipeY;
	// stage.update();

	// or animate
	zim.move({
		target:rect,
		x:rect.x+distance*e.swipeX,
		y:rect.y+distance*e.swipeY,
		time:400,
		ease:"quadOut"
	});
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object you want to swipe on
distance - (default 30) the distance in pixels to activate swipe
	might want to pass in a pixel distance based on percentage of stage
time - (default 80) time in milliseconds to travel that distance
	try http://zimjs.com/code/swipe.html for testing distance and time (speed)

PROPERTIES
distance - the distance needed for swipe to activate
duration - the time from mousedown a swipe is measured for distance
direction - the direction of the last swipe (left, right, up, down or none)
obj - the object that was last swiped
active - Boolean true for dispatching swipes and false for not

METHODS
enable() - set swipe to active (by default it is)
disable() - set swipe to inactive (sets active to false and does not dispatch)

EVENTS
dispatches a "swipe" event on every pressup (even if swipe failed and direction is none)
when a swipe event triggers
the Swipe event object has a swipeX and swipeY property that is -1,0, or 1
for left, none, or right OR up, none, down
the event object has an obj property as well for what object was swiped
also dispatches a "swipedown" event for convenience on a mousedown

LEGACY
the Swipe object provides a direction property of "left", "right", "up", or "down"
the Swipe object provides an obj property of what object was swiped on
for instance if e is the event object
then e.target is the Swipe object so use e.target.direction
did not dispatch a custom event due to lack of support in early IE
Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
this can be used to snap back to an original location
--*///+70
	zim.Swipe = function(obj, distance, duration) {

		var sig = "obj, distance, duration";
		var duo; if (duo = zob(zim.Swipe, arguments, sig, this)) return duo;
		z_d("70");
		this.cjsEventDispatcher_constructor();

		if (zot(obj) || !obj.on) {zog("zim controls - Swipe():\nPlease pass in object"); return;}
		if (zot(distance)) distance = 30; // pixels for swipe to count
		if (zot(duration)) duration = 80; // ms to test pixels

		this.distance = distance;
		this.duration = duration;
		this.active = true;

		var startX;
		var startY;
		var mouseX;
		var mouseY;
		var downCheck;
		var timer;
		var that = this;

		obj.on("mousedown", function(e) {

			if (!that.active || e.target.zimNoSwipe) return;
			that.obj = e.target;
			mouseX = startX = e.stageX;
			mouseY = startY = e.stageY;
			downCheck = true;
			that.dispatchEvent("swipedown");
			clearTimeout(timer);
			timer = setTimeout(function() {
				if (downCheck) {
					checkSwipe();
					downCheck = false;
				}
			}, that.duration);
			obj.on("pressmove", function(e) {
				mouseX = e.stageX;
				mouseY = e.stageY;
			});
			obj.on("pressup", function(e) {
				if (downCheck) {
					checkSwipe();
					downCheck = false;
					clearTimeout(timer);
				}
			});

			function checkSwipe() {
				var swipeCheck = false;
				var e = new createjs.Event("swipe");
				e.obj = that.obj;
				e.swipeX = e.swipeY = 0;
				that.direction = "none";
				// may as well use 45 degrees rather than figure for aspect ratio
				if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
					if (mouseX - startX > that.distance) {e.swipeX = 1;  that.direction="right";}
					if (startX - mouseX > that.distance) {e.swipeX = -1; that.direction="left";}
				} else {
					if (mouseY - startY > that.distance) {e.swipeY = 1;  that.direction="down";}
					if (startY - mouseY > that.distance) {e.swipeY = -1; that.direction="up";}
				}
				that.dispatchEvent(e);
			}
		});

		this.disable = function() {
			that.active = false;
		}

		this.enable = function() {
			that.active = true;
		}
	}
	zim.extend(zim.Swipe, createjs.EventDispatcher, null, "cjsEventDispatcher", false);
	//-70

/*--
zim.Pages = function(pages, transition, speed, transitionTable, holder)

Pages
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Pages handle going between pages.
Make a Pages object and add it to the stage.
All your pages from then on are added to and manipulated inside the Pages object.
Pages allows you to set the destination pages for swipe events.
Other events like buttons can call the go(page, direction) method.
Consider using zim.HotSpots() to efficiently handle multiple buttons.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// make pages (these would be containers with content)
var home = new zim.Rectangle(stageW, stageH, "blue");
var hide = new zim.Rectangle(stageW, stageH, "green");
var find = new zim.Rectangle(stageW, stageH, "yellow");

var pages = new zim.Pages({
	pages:[
		// imagine pages to the left, right, up and down
		// swipe:["to page on left", "to page on right", etc.s]
		{page:home, swipe:[null,"info",hide,find]},
		{page:hide, swipe:[null,null,null,home]},
		{page:find, swipe:[null,null,home,null]}
	],
	transition:"slide",
	speed:1000 // slower than usual for demonstration
});
stage.addChild(pages);

// handle any events inserted into the swipe arrays
pages.on("info", function(){zog("info requested")});

// handle any custom requirements when arriving at a page
// the event gives you the page object
// so add a name properties just make it easier to manage
home.name = "home";
hide.name = "hide";
find.name = "find";
pages.on("page", function() {
	zog(pages.page.name); // now we know which page we are on
})

// you can manually go to pages as well
// we will make a little triangle to click:
var back = new zim.Triangle({color:"red"});
back.center(find); // add triangle to find page
// not really supposed to add things to zim shapes
// they default to mouseChildren false
// we want to click on the back button
// so we have to set the mouseChildren of find to true
find.mouseChildren = true;
back.cursor = "pointer";
back.on("click", function() {pages.go(home, "up")});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
pages - (default null) an array of pages or page objects - for example:
	[home, hide] assuming home and hide Containers are made OR if swipe data is desired then use page object format:
	[{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
	the pages should be containers - it helps to give them each a name property
	the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
	in other words, these could be pages to the left, right, top and bottom of the current page
	or they can call commands as strings
transition - (default "none") the type of transition "none", "reveal", "slide", "fade", "clear", "black", "white"
speed - (default 200) speed in milliseconds of the transition if set
transitionTable - (default none) an array to override general transitions with following format:
	[[fromPage, toPage, "transition", ms(optional)], etc.]
holder - (default the default stage) where are we putting the pages (used for setting transition properties)

METHODS
addPage() - lets you alternatively add pages after you create the object
removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
setSwipe() - lets you set the swipe array for a page
go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events
	newPage can be a reference to the page or an index matching the pages array order
	direction is which way the pages is relative to the current page
	trans and ms are optional and will override any previously set transitions (speed in ms)
resize() - call to resize transitions - not the pages themselves (use layouts)
pause() - pauses a transition before it starts (call from swipe event)
unpause() - unpauses a paused transition (unless another go() command is called)
puff(time) - adds all the pages behind the currentPage (adding time (ms) will auto calls settle)
settle() - removes all pages except the currentPage
disable() - stops swipe from activating and sets active = false
enable() - enables swipe action and sets active = true
dispose() - clears your listeners and pages

PROPERTIES
type - holds the class name as a String
speed - of transitions in ms
transitionTable - [[fromPage, toPage, "transition", ms(optional)], etc.] overrides default transition
page - the current page object (read)
pages - the page array initially passed as a parameter including any updates if using addPage or removePage methods
lastPage - the last page before transition (read)
direction - direction of transition (read)
transitioning - read only Boolean as to whether the pages are transitioning
active - default true, boolean to have swipes active (good for layered Pages objects)
swipe - the ZIM Swipe object used for pages (can tweak distance to percentage if rescaling)
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
Pages dispatches a "page" event when the page changes (to a page in the swipe array)
myPages.on("page",function(e){...})
with myPages.page being set to the new page (e.target.page)
and myPages.lastPage being set to the old page (e.target.lastPage)
myPages.direction gets the direction of the transition (e.target.direction)

if there is a string in the swipe array like "info"
then the zim.Pages() object dispatches an event equivalent to the string
for the data example above, myPages.on("info",function(e){...});
would trigger when the home page is swiped to the left

Pages dispatches a "swipe" event before changing pages if swiped
you can then get pages.page, pages.nextPage and pages.direction
you can pause() if needed the transition to handle data, etc. and then unpause()
you do not need to handle going to another page when swiping - that is handled automatically
so you probably will not use the swipe event unless handling data between pages

Pages also dispatches a "pagetransitioned" event when a transition is complete
you will have the same properties available as with the page event

USAGE
the first page object is the start page
for the data above, swiping the home page down automatically goes to the hide page
if the home page is swiped up it automatically goes to the find page
you can add pages with the addPage() method
it will not show until you swipe or go to it - unless it was the first page added
1. if the holder is the stage then add the pages object to the stage
2. if the holder is another container then add pages object to the holder
and add the holder to the stage (read this twice to make sure you got it!)
in the second case, you will have to mask the holder so you do not see transitions
DO NOT add the pages to the stage or holder - let Pages do it for you
sometimes you need a page to be on the stage to operate on it
if this is the case, call puff() and make adjustments
call settle() when done - or pass in a time in ms to puff to auto settle after that time
you can define multiple pages objects add and remove pages objects as needed
--*///+71
	zim.Pages = function(pages, transition, speed, transitionTable, holder) {

		var sig = "pages, transition, speed, transitionTable, holder";
		var duo; if (duo = zob(zim.Pages, arguments, sig, this)) return duo;
		z_d("71");
		this.zimContainer_constructor();
		this.type = "Pages";

		if (zot(pages)) pages = []; // can add pages with addPages
		this.pages = pages;
		if (zot(transition)) transition = "none";
		if (zot(speed)) speed = 200;
		if (zot(transitionTable)) transitionTable = [];
		this.transitionTable = transitionTable;

		if (zot(holder)) {
			if (zimDefaultFrame) holder = zimDefaultFrame.stage;
		}
		if (!holder.getBounds || !holder.getBounds()) {zog("zim controls - Pages():\nholder object must have bounds set"); return;}

		this.speed = speed;
		this.active = true;
		var that = this;
		that.transitioning = false;

		var hW = holder.getBounds().width;
		var hH = holder.getBounds().height;

		var black; var white;
		if (transition!="none" || transitionTable!=[]) makeTransitionAssets();

		function makeTransitionAssets() {
			black = new createjs.Shape();
			black.graphics.f("black").r(0,0,hW,hH+1);
			white = new createjs.Shape();
			white.graphics.f("white").r(0,0,hW,hH+1);
		}

		var directions = ["left","right","up","down"];

		var data; // holds the page data object
		var page; // holds a page

		for (var i=0; i<pages.length; i++) {
			data = pages[i];
			if (data.constructor !== {}.constructor) data = pages[i] = {page:pages[i]}; // accept an array of only pages
			data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
			data.page.zimOriginalAlpha = data.page.alpha;
			if (data.page.parent) data.page.parent.removeChild(data.page);
		}
		var currentPage = this.page = pages[0] ? pages[0].page : null;
		this.addChild(currentPage);

		this.swipe = new zim.Swipe(holder);

		// handle giving swipe event time to trigger event and provide code intervention
		var pauseInfo;
		var paused = false;

		var swipeEvent = this.swipe.on("swipe", function(e) {
			if (!that.active) return;
			var direction = e.currentTarget.direction
			if (direction == "none") return;
			// swap direction (swipe up means move down)
			var newDirection = "";
			if (direction=="left") newDirection="right";
			else if (direction=="right") newDirection="left";
			else if (direction=="up") newDirection="down";
			else if (direction=="down") newDirection="up";
			direction = newDirection;
			var dirIndex = directions.indexOf(direction);
			page = currentPage.zimSwipeArray[dirIndex];

			pauseInfo = [page, direction, null, null, true];
			that.page = currentPage;
			that.nextPage = page;
			that.direction = direction;
			that.dispatchEvent("swipe");

			setTimeout(function() {
				if (!paused) {
					that.go(page, direction, null, null, true); // true is from swipe
				}
			}, 50);
		});

		this.addPage = function(page, swipeArray) {
			if (zot(swipeArray)) swipeArray = [];
			var data = {page:page, swipe:swipeArray};
			data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
			data.page.zimOriginalAlpha = data.page.alpha;
			if (!currentPage) {
				currentPage = that.page = data.page;
				that.addChild(currentPage);
			} else {
				if (data.page.parent) data.page.parent.removeChild(data.page);
			}
		}

		this.removePage = function(page) {
			if (that.currentPage == page) {
				that.removeChild(page);
				if (holder.stage) holder.stage.update(); // works even if holder is stage
			}
			page.zimSwipeArray = null;
		}

		this.setSwipe = function(page, swipeArray) {
			if (zot(swipeArray)) swipeArray = [];
			var data = {page:page, swipe:swipeArray};
			data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
		}

		this.pause = function() {
			paused = true;
		}
		this.unpause = function() {
			if (paused) that.go(pauseInfo[0], pauseInfo[1], pauseInfo[2], pauseInfo[3], pauseInfo[4]);
		}

		var goCheck = true;
		this.go = function(newPage, direction, trans, ms, fromSwipe) {

			if (typeof newPage == "number") {
				var np = that.pages[newPage];
				if (zot(np)) return;
				newPage = np.page;
			}

			// newPage holds a page or a string command
			setTimeout(function() {paused = false;},200);
			var slides = [{x:hW},{x:-hW},{y:hH},{y:-hH}];
			var slides2 = [{x:0},{x:0},{y:0},{y:0}];
			var reveals = [{x:hW/2,alpha:0},{x:-hW/2,alpha:0},{y:hH/2,alpha:0},{y:-hH/2,alpha:0}];

			// check for default transition override in transitionTable
			var tempTransition = transition; // default transition
			var tempMs = speed; // default transition speed
			for (var i=0; i<that.transitionTable.length; i++) {
				if (that.transitionTable[i][0]==currentPage && that.transitionTable[i][1]==newPage) {
					tempTransition = that.transitionTable[i][2];
					tempMs = that.transitionTable[i][3];
					break;
				}
			}
			// transition passed into go overrides all transitions
			// so if there is not a transition parameter set trans tempTransition
			// which is either the transition table transition or the default
			if (zot(trans)) trans = tempTransition; // use default
			if (zot(ms)) ms = tempMs; // use default
			that.speed = ms;

			that.direction = direction;
			if (newPage=="" || newPage==null) {
				that.page = currentPage;
				that.dispatchEvent("nothing");
			} else if (typeof newPage === 'string') {
				that.page = currentPage;
				that.dispatchEvent(newPage);
			} else {
				if (newPage == currentPage) return; // same page ;-)
				if (zot(direction)) direction="right";
				var dirIndex = directions.indexOf(direction);

				if (!goCheck) return;
				goCheck = false;

				function transEnd(pages) {
					pages[0].uncache();
					pages[1].uncache();
					that.transitioning = false;
					that.dispatchEvent("pagetransitioned");
					that.removeChild(that.lastPage);
					that.removeChild(black);
					that.removeChild(white);
					goCheck = true;
				}

				function transEndHalf(pages) {
					that.removeChild(that.lastPage);
					zim.animate(pages.shift(), {alpha:0}, that.speed/2, null, transEnd, pages);
				}

				newPage.x = 0;
				newPage.y = 0;
				newPage.alpha = newPage.zimOriginalAlpha;

				that.transitioning = true;
				if (trans == "slide") {
					newPage.x = -(slides[dirIndex].x | 0);
					newPage.y = -(slides[dirIndex].y | 0);
					newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
					currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
					that.addChild(newPage);
					that.addChild(currentPage);
					zim.animate(currentPage, slides[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
					zim.animate(newPage, slides2[dirIndex], that.speed);
				} else if (trans == "reveal") {
					newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
					currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
					that.addChild(newPage); // put destination under current page
					that.addChild(currentPage);
					zim.animate(currentPage, reveals[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
				} else if (trans == "fade") {
					newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
					currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
					newPage.alpha = 1;
					that.addChild(newPage);
					that.addChild(currentPage);
					zim.animate(currentPage, {alpha:0}, that.speed, null, transEnd, [currentPage, newPage]);
				} else if (trans == "black") {
					newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
					currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
					newPage.alpha = 1;
					that.addChild(newPage);
					that.addChild(currentPage);
					black.alpha = 0;
					that.addChild(black);
					zim.animate(black, {alpha:1}, that.speed/2, null, transEndHalf, [black, currentPage, newPage]);
				} else if (trans == "clear") {
					newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
					currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
					newPage.alpha = 0;
					that.addChild(newPage);
					that.addChild(currentPage);
					zim.animate(currentPage, {alpha:0}, that.speed/2);
					zim.animate(newPage, {alpha:1}, that.speed/2, null, transEnd, [currentPage, newPage], that.speed/2);
				} else if (trans == "white") {
					newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
					currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
					newPage.alpha = 1;
					that.addChild(newPage);
					that.addChild(currentPage);
					white.alpha = 0;
					that.addChild(white);
					zim.animate(white, {alpha:1}, that.speed/2, null, transEndHalf, [white, currentPage, newPage]);
				} else {
					that.transitioning = false;
					that.addChild(newPage);
					that.removeChild(currentPage);
					goCheck = true;
					// that.dispatchEvent("pagetransitioned"); // hmmm... no
				}

				that.lastPage = currentPage;
				that.page = newPage;
				if (zot(fromSwipe)) fromSwipe = false;
				that.fromSwipe = fromSwipe;
				that.dispatchEvent("page");
				currentPage = newPage;
				if (holder.stage) holder.stage.update();
			}
		}

		this.resize = function() {
			hW = holder.getBounds().width;
			hH = holder.getBounds().height;
			if (transition!="none" || transitionTable!=[]) makeTransitionAssets();
		}

		this.puff = function(milliseconds) {
			// add all pages to the holder behind current page
			// if milliseconds then this is the time to settle automatically
			for (var i=0; i<pages.length; i++) {
				that.addChild(pages[i].page);
			}
			that.addChild(currentPage);
			if (milliseconds > 0) {
				setTimeout(function() {
					that.settle();
				}, milliseconds);
			}
		}

		this.settle = function() {
			that.removeAllChildren();
			that.addChild(currentPage);
			that.dispatchEvent("puffed");
		}

		this.disable = function() {
			that.active = false;
		}

		this.enable = function() {
			that.active = true;
		}

		this.dispose = function() {
			that.swipe.off("swipe", swipeEvent);
			that.removeAllChildren();
			pages = null;
			return true;
		}

	}
	zim.extend(zim.Pages, zim.Container, "clone", "zimContainer", false);
	//-71


/*--
zim.HotSpots = function(spots, local, mouseDowns)

HotSpots
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
HotSpots allow you to create multiple zim.hotSpot objects on multiple pages.
A zim.hotSpot is an invisible click area (like an image map in HTML).
You can alternatively specify an object and it will turn that into a hotSpot.
zim.HotSpots lets you control many or all of your interactions in one place.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// our first hotSpot will be a 50 pixel square at 100, 100
// then we will add hotSpots to these items as well
var circle = new zim.Circle(60, "red");
circle.center(stage);

var button = new zim.Button();
stage.addChild(button);
button.x = stageW - button.width - 100;
button.y = stageH - button.height - 100;

// make the hotSpots object
// these are all on the same page
// gets really handy when you have multiple pages with zim.Pages
var hs = new zim.HotSpots([
	{page:stage, rect:[100,100,50,50], call:function(){zog("hot!");}},
	{page:stage, rect:circle, call:function(){zog("circle!");}},
	{page:stage, rect:button, call:function(){zog("button!");}},
]);
// hs.show(); // uncomment this to see rectangle hotSpots
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
spots - an array of hotspot data objects with the following format:
	[{page:home, rect:[190,50,260,260], call:someFunction},
	 {page:home, rect:[70,405,500,150], call:someOtherFunction}]
	the page should be a createjs Container
	the rect is the [left, right, width, height] of a rectangle relative to the stage
	call is the callback function to call when a hotSpot is clicked
	instead of a rect array you can pass an object that must have setBounds() set
	[{page:home, rect:submitButton, call:function(){//code}}]
	the hotSpot will then use the button position and bounds as the rectangle
	note - in this case, HotSpots will actually add a mousedown or click event to the button
local (default true) hotSpot rect is based on local coordinates of the container
	use when the element scale independently from the stage
	if set to false then you pass in global coordinates and hotSpot will convert them
mouseDowns (default false) stops mousedown events on a button that is used as a hotSpot
	prevents users from activating a swipe on a button (when using ZIM Swipe)

METHODS
show() - shows the hotspots for testing during authoring time
hide() - hides the hotspots
addHotSpot(page,rect,call) - can dynamically add hotSpots
removeHotSpots(page,id) - id is optional - so can remove all spots on a page
dispose() - removes listeners

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

NOTE: the class does actually add rectangle shapes to your page
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
this could have been done with "math" alone but rollover cursor would be a pain
the class creates zim.HotSpot objects - see the class underneath this one
--*///+72
	if (zot(zim.ACTIONEVENT)) zim.ACTIONEVENT = "mousedown";

	zim.HotSpots = function(spots, local, mouseDowns) {
		var sig = "spots, local, mouseDowns";
		var duo; if (duo = zob(zim.HotSpots, arguments, sig, this)) return duo;
		z_d("72");
		this.zimContainer_constructor();
		this.type = "HotSpots";

		if (zot(spots) || !Array.isArray(spots)) {zog("zim controls - HotSpots():\nplease provide an array of HotSpot data"); return;}
		if (zot(local)) local = true;
		if (zot(mouseDowns)) mouseDowns = false;
		var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

		var that = this;

		var data; // spot data object
		var hs; // hotSpot object
		var hotSpots = []; // array of hotSpot objects

		// loop through data and add hotSpot objects
		for (var i=0; i<spots.length; i++) {
			addSpot(spots[i]);
		}

		function addSpot(data) {
			var button = null;
			if (!Array.isArray(data.rect)) {
				button = data.rect; // data includes a button rather than rect
				if (!button) {
					zog("zim controls - HotSpots(): HotSpot "+ data.page + " " + data.rect +" button does not exist");
					return;
				}
				data.rect = [button.x, button.y, 1, 1];	// bounds are not used for button
			}

			hs = new zim.HotSpot(data.page,data.rect[0],data.rect[1],data.rect[2],data.rect[3],data.call,local);
			hs.zimHSpage = data.page;
			hs.button = button;
			hotSpots.push(hs);
			hs.on(eventType, hsEvent);
			if (button) {
				// stop hotSpot from taking away rollovers on button
				hs.spot.mouseEnabled = false;
				hs.spot.mouseChildren = false;
				// but now need to add click to button as hotSpot will not work
				button.zimHScall = data.call;
				button.zimHSEvent = button.on(eventType, hsEvent, true);
				if (!mouseDowns) {
					button.zimHSMDEvent = button.on("mousedown",function(e) {
						e.stopImmediatePropagation();
					});
				}
				button.cursor = "pointer";
			}
		}

		function hsEvent(e) {
			if (e.stopImmediatePropagation) e.stopImmediatePropagation();
			if (window.event) window.event.cancelBubble=true;
			if (typeof(e.currentTarget.zimHScall) == "function") {
				e.currentTarget.zimHScall(e);
			}
		}

		this.addHotSpot = function(page,rect,call) {
			data = {page:page, rect:rect, call:call};
			spots.push(data);
			addSpot(data);
		}

		this.show = function() {
			for (var i=0; i<hotSpots.length; i++) {
				hs = hotSpots[i];
				if (!hs.button) hs.show();
			}
		}
		this.hide = function() {
			for (var i=0; i<hotSpots.length; i++) {
				hs = hotSpots[i];
				hs.hide();
			}
		}

		this.removeHotSpots = function(page, rect) {
			for (var i=spots.length-1; i>=0; i--) {
				data = spots[i];
				hs = hotSpots[i];
				if (rect && !Array.isArray(rect)) { // button
					rect = [rect.x, rect.y, rect.getBounds().width, rect.getBounds().height];
				}
				if (
					(zot(page) && zot(rect)) ||
					(zot(rect) && page==data.page) ||
					(zot(page) && zim.arraysEqual(rect,data.rect)) ||
					(page==data.page && zim.arraysEqual(rect,data.rect))
				) {
					// remove hotSpot from data and hotSpots list
					spots.splice(i,1);
					if (hs.button) {
						hs.button.off(eventType, hs.button.zimHSEvent);
						hs.button.zimHSEvent = null;
						if (!mouseDowns) {
							hs.button.off("mousedown", hs.button.zimHSMDEvent);
							hs.button.zimHSMDEvent = null;
						}
					}
					hs.off(eventType, hsEvent);
					hs.dispose();
					hotSpots.splice(i,1);
				}
			}
		}

		this.dispose = function() {
			for (var i=0; i<hotSpots.length; i++) {
				hs = hotSpots[i];
				if (hs.button) {
					hs.button.off(eventType, hs.button.zimHSEvent);
					hs.button.zimHSCall = null;
					hs.button.zimHSEvent = null;
					if (!mouseDowns) {
						hs.button.off("mousedown", hs.button.zimHSMDEvent);
						hs.button.zimHSMDEvent = null;
					}
				}
				hs.off(eventType, hsEvent);
				hs.dispose();
			}
			return true;
		}
	}
	zim.extend(zim.HotSpots, zim.Container, "clone", "zimContainer", false);
	//-72


/*--
zim.HotSpot = function(obj, x, y, width, height, call, local)

HotSpot
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
HotSpot adds an invisible button to a container object (often think of this as the page).
If you want multiple spots it is more efficient to use the HotSpots class above
which manages multiple HotSpot objects (otherwise you end up with multiple event functions).
The spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape.
The spot will get a cursor of "pointer".

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var hs = new zim.HotSpot(stage, 100, 100, 50, 50, myFunction);
function myFunction() {
	zog("activation!");
}
// hs.show(); // uncomment this to see rectangle hotSpot
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - container object in which to place the hotspot (stage for instance)
x, y, width and height - of the rectangle for the hotspot
call - the function to call when the spot is pressed
local (default true) hotSpot rect is based on local coordinates of the container
	use when the element scale independently from the stage
	if set to false then you pass in global coordinates and hotSpot will convert them

METHODS
show() - helps when creating the spot to see where it is
hide() - hides the hotspot
dispose() - removes the listener and the spot

PROPERTIES
type - holds the class name as a String
spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
eg. hs.spot

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)
--*///+73
	zim.HotSpot = function(obj, x, y, width, height, call, local) {

		var sig = "obj, x, y, width, height, call, local";
		var duo; if (duo = zob(zim.HotSpot, arguments, sig, this)) return duo;
		z_d("73");
		this.zimContainer_constructor();
		this.type = "HotSpot";

		if (zot(obj) || !obj.addChild) {zog("zim controls - HotSpot():\nPlease pass in container object for obj"); return;}
		if (obj instanceof createjs.Container == false) {zog("zim controls - HotSpot():\nObjects passed in should be Containers"); return;}
		if (zot(x) || zot(y) || zot(width) || zot(height)) {zog("zim controls - HotSpot():\nPlease pass in x, y, width, height"); return;}
		if (zot(local)) local = true;
		eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

		var w = width; var h = height;
		var that = this;

		var backing = new createjs.Shape();
		var but = new createjs.Shape();

		if (!local) {
			var point = obj.globalToLocal(x,y);
			var point2 = obj.globalToLocal(x+w,y+h);
			var newW = point2.x-point.x;
			var newH = point2.y-point.y;
			backing.graphics.f("#999999").dr(point.x,point.y,newW,newH);
			but.graphics.f("#999999").dr(point.x,point.y,1,1);	 // small point
		} else {
			backing.graphics.f("#999999").dr(x,y,w,h);
			but.graphics.f("#999999").dr(x,y,1,1);
		}

		backing.alpha = .4;
		backing.mouseEnabled = false;
		but.alpha = .01;
		but.cursor = "pointer";
		this.spot = but;

		var butEvent = but.on(eventType,function(e) {
			if (typeof(call) == "function") {
				call();
			}
		});
		obj.addChild(but);
		but.hitArea = backing;
		this.show = function() {
			obj.addChild(backing);
		}
		this.hide = function() {
			obj.removeChild(backing);
		}
		this.dispose = function() {
			but.off(eventType, butEvent);
			obj.removeChild(but);
			delete but;
			return true;
		}
	}
	zim.extend(zim.HotSpot, zim.Container, "clone", "zimContainer", false);
	//-73

/*--
zim.Manager = function()

Manager
zim class

DESCRIPTION
used internally to make ResizeManager, GridManager and GuideManager
and in future perhaps OutlineManager
--*///+75
	zim.Manager = function(type) {
		z_d("75");
		var that = this;
		this.items = [];
		this.add = function(obj) {
			if (Array.isArray(obj)) that.items.concat(obj);
			else that.items.push(obj);
		}
		this.remove = function(obj) {
			if (zot(obj)) {that.items = []; return;}
			if (!Array.isArray(obj)) obj = [];
			var o;
			for (var i=0; i<obj.length; i++) {
				o = obj[i];
				var index = that.items.indexOf(o);
				if (index != -1) that.items.splice(index, 1);
			}
		}
		this.resize = function() {
			if (!that) return;
			for (var i=0; i<that.items.length; i++) {
				if (!that.items[i].resize) that.items.splice(i); // was disposed
			}
		}
		this.dispose = function() {
			for (var i=that.items.length-1; i>=0; i--) {
				that.items[i].dispose();
			}
			that.items = [];
			that = null;
			return true;
		}
	}//-75

/*--
zim.ResizeManager = function()

ResizeManager
zim class extends zim.Manager abstract class

DESCRIPTION
Add objects with a resize() method to a ResizeManager object and call a single resize() on the ResizeManager object
This will most likely go in a resize event on the Frame
Works with objects such as Layout, Pages, Grid, Guide, Accessibility, Loader and TextArea

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var resizeManager = new zim.ResizeManager();
resizeManager.add([pages, layout, accessibility]);
// where these three objects have already been made
// *** Note that the Loader and TextArea are already resized if added to an Accessibility object that is resized
frame.on("resize", function() {
	resizeManager.resize(); // without ResizeManager you would make three different resize() calls
})
END EXAMPLE

METHODS
add(obj) - adds objects or an array of objects to the ResizeManager
	*** Note that the Loader and TextArea are already resized if added to an Accessibility object that is resized
remove(obj) - removes objects or an array of objects to the ResizeManager
resize() - calls the resize() method of any object in the ResizeManager
dispose() - disposes the objects in the ResizeManager and the ResizeManager itself

PROPERTIES
items - get or set an array of objects currently in the Manager

--*///+75.5
	zim.ResizeManager = function() {
		z_d("75.5");
		zim.Manager.call(this, "ResizeManager");
	}
	zim.ResizeManager.prototype = new zim.Manager();
	zim.ResizeManager.prototype.constructor = zim.ResizeManager;
	//-75.5

/*--
zim.Guide = function(obj, vertical, percent, hideKey, pixelKey)

Guide Class
extends a zim.Container which extends a createjs.Container

DESCRIPTION
Guide shows a guideline to help layout assets with code.
Cursor x and y in percentage or pixels are shown along edges
as a distance from the guide.
You only need one guide per axis because you measure from the guide to your cursor.
Use the G key to toggle guide visibility.
Use the P key to toggle percent and pixels.
Make sure you remove the guide for your final version (dispose).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// simple form for a vertical guide
// use the distance from the guide to your cursor to measure
// so you only need one vertical guide for horizontal measurement
var guide = new zim.Guide();

// better to add guides to a GuideManager
var manager = new zim.GuideManager();
manager.add(new zim.Guide(stage));
manager.add(new zim.Guide(stage, false));

// or with pixels
// manager.add(new zim.Guide(stage, true, false));
// manager.add(new zim.Guide(stage, false, false));

// then you can remove all guides with
// manager.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all guides:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - (default the default stage) object to add guide to for example a Container
vertical - (default true) set to false for horizontal guide
percent - (default true) set to false to show pixels
hideKey - (default G) key to press to hide guide
pixelKey - (default P) key to press to swap percent and pixels

METHODS
resize() - resizes the guide if the container size changes (put in frame resize event)
dispose() - removes keyboard event listeners and guide

PROPERTIES
type - holds the class name as a String
pixels - boolean - set to true to change to pixels, false to go to percent
--*///+76
	zim.Guide = function(obj, vertical, percent, hideKey, pixelKey) {

		var sig = "obj, vertical, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Guide, arguments, sig, this)) return duo;
		z_d("76");
		this.zimContainer_constructor();
		this.type = "Guide";

		if (zot(obj)) {
			if (zimDefaultFrame) {
				obj = zimDefaultFrame.stage;
			} else {
				obj = "stage";
			}
		}
		if (zot(vertical)) vertical = true;
		if (obj != "stage" && (!obj.addChild || !obj.getBounds || !obj.getBounds())) {zog ("zim controls - Guide(): Please provide container with bounds for the obj (setBounds())"); return;}
		if (zot(percent)) percent = true;
		if (zot(hideKey)) hideKey = "G";
		if (zot(pixelKey)) pixelKey = "P";

		var that = this;
		var stageEvent;

		// make text boxes that show x and y
		var boxW = 80;
		var boxH = 26;
		var minX = boxW/6+boxW/2;
		var minY = boxH*2
		var maxX; // set max values once we get a stage
		var maxY;

		var box;
		if (vertical) {
			box = makeBox("#00c5af", "white", "white");
			box.shape.regX = boxW+boxW/6; box.shape.regY = boxH/2;
			box.label.x = -boxW/2-boxW/6;
		} else {
			box = makeBox("#d61fa0", "white", "white");
			box.shape.regX = boxW/2; box.shape.regY = boxH + boxH/4;
			box.label.y = -boxH*3/4;
		}

		function makeBox(fill, stroke, textColor) {
			var box = new zim.Container();
			box.shape = new createjs.Shape();
			box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH);
			box.shape.alpha = .9;
			box.addChild(box.shape);
			box.label = new createjs.Text("10", "16px verdana", textColor);
			box.label.textAlign = "center";
			box.label.textBaseline = "middle";
			box.addChild(box.label);
			box.mouseChildren = false;
			box.mouseEnabled = false;
			return box;
		}

		var stage;
		if (obj != "stage") obj.addChild(that);
		var addedInterval = zim.added(that, added);

		var guideCheck = false;
		var objW;
		var objH;
		var line;
		var dragBounds;
		function added() {
			if (obj == "stage") {
				stage =	that.stage;
				obj = stage;
			} else {
				stage =	obj.stage;
			}
			obj.addChild(that);
			objW = obj.getBounds().width;
			objH = obj.getBounds().height;
			if (vertical) {
				box.y = objH/2;
				box.label.text = "y:" + ((that.pixels) ? Math.round(objW*70/100) : "70%");
			} else {
				box.x = objW/2;
				box.label.text = "x:" + ((that.pixels) ? Math.round(objH*70/100) : "70%");
			}
			line = new createjs.Shape();
			that.addChild(line);
			(vertical) ? line.x = objW*.7 : line.y = objH*.7;

			if (!guideCheck) {
				obj.addChild(that);
				drawGuide();
			}
			stage.off("stagemousemove", stageEvent);
			stageEvent = stage.on("stagemousemove", where);
			stage.update();
		};

		var lastPoint = {x:0,y:0};
		function where(e) {
			// convert mouse location to local point
			var point; var diff;
			if (e) {
				point = obj.globalToLocal(e.rawX, e.rawY);
				lastPoint = point;
			} else {
				point = {x:lastPoint.x, y:lastPoint.y}
			}
			if (!percent) {	// pixels
				if (vertical) {
					diff = Math.round(Math.abs(point.x-line.x));
					box.label.text = "x:" + Math.max(0, Math.min(diff, Math.round(objW)));
					box.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					diff = Math.round(Math.abs(point.y-line.y));
					box.label.text = "y:" + Math.max(0, Math.min(diff, Math.round(objH)));
					box.x = Math.max(minX, Math.min(point.x, maxX));
				}
			} else {
				if (vertical) {
					diff = Math.round(Math.abs(point.x-line.x)/objW*100);
					box.label.text = "x:" + Math.max(0, Math.min(diff, 100)) + "%";
					box.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					diff = Math.round(Math.abs(point.y-line.y)/objH*100);
					box.label.text = "y:" + Math.max(0, Math.min(diff, 100)) + "%";
					box.x = Math.max(minX, Math.min(point.x, maxX));
				}
			}
			if (stage) stage.update();
		}

		// make the guide once we have the stage
		// and any time resize is called
		function drawGuide() {
			guideCheck = true;
			objW = obj.getBounds().width;
			objH = obj.getBounds().height;
			var pointer;
			if (vertical) {
				pointer = "ew-resize";
				dragBounds = new createjs.Rectangle(0,0,objW,0);
			} else {
				pointer = "ns-resize";
				dragBounds = new createjs.Rectangle(0,0,0,objH);
			}
			zim.noDrag(line);
			setTimeout(function() {
				// give time for content to settle
				zim.drag(line, dragBounds, pointer, pointer, null, null, true);
			}, 500);
			stage.mouseMoveOutside = true;
			stage.enableMouseOver(10);

			maxX = objW-boxW*2/3;
			maxY = objH-boxH - boxH;
			line.uncache();
			var g = line.graphics;
			if (vertical) {
				g.c().s("rgba(0,255,255,.1)").ss(20).mt(0,0).lt(0,objH);
				g.f().s("white").ss(2).mt(0,0).lt(0,objH);
				g.s("#00c5af").sd([20,20]).mt(0,0).lt(0,objH).sd();
				line.cache(-10,0,20,objH);
			} else {
				g.c().s("rgba(255,0,255,.1)").ss(20).mt(0,0).lt(objW,0);
				g.f().s("white").ss(2).mt(0,0).lt(objW, 0);
				g.s("#d61fa0").sd([20,20]).mt(0,0).lt(objW, 0).sd();

				line.cache(0,-10,objW,20);
			}

			(vertical) ?  box.x = objW : box.y = objH;
			that.addChild(box);

		}

		Object.defineProperty(this, 'pixels', {
			get: function() {
				return !percent;
			},
			set: function(value) {
				percent = !value;
				that.resize();
			}
		});

		// add key listener to hide and show the guide
		window.addEventListener("keydown", keyEvent);

		function keyEvent(e) {
			if (!e) e=event;
			if (!stage) return;
			if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
				that.visible = !that.visible;
				stage.off("stagemousemove", stageEvent);
				if (that.visible) {
					stageEvent = stage.on("stagemousemove", where, that);
				}
				stage.update();
			}
			if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
				that.pixels = !that.pixels;
			}
		}

		this.resize = function() {
			if (!that) return false;
			if (stage) {
				drawGuide();
				where();
			}
			return true;
		}

		this.dispose = function() {
			if (!that) return false;
			zim.noDrag(line);
			clearInterval(addedInterval);
			that.removeAllChildren();
			window.removeEventListener("keydown", keyEvent);
			if (that.parent) that.parent.removeChild(that);
			that = null;
			return true;
		}
	}
	zim.extend(zim.Guide, zim.Container, "clone", "zimContainer", false);
	//-76


/*--
zim.GuideManager = function()

GuideManager
zim class - extends the ZIM Manager abstract class

DESCRIPTION
Add Zim Guide objects to a GuideManager object and update or remove all guides at once.
Guides are handy to use but perhaps annoying to update and remove if you have many.
GuideManager keeps track of the guides and lets you update or dispose of them on command.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var manager = new zim.GuideManager();
manager.add(new zim.Guide());
manager.add(new zim.Guide(false));

// or with pixels
// manager.add(new zim.Guide(true, false));
// manager.add(new zim.Guide(false, false));

// then you can remove all guides with
// manager.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all guides:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PROPERTIES
items - an array of all Guide objects added with add()

METHODS
add(guide) - registers a guide with the GuideManager
remove(guide) - removes guide from register
resize() - resizes all the guides in the GuideManager (ie. if stage changes)
dispose() - disposes all guides and the GuideManager

NOTE: to just hide guides, you use the G key
and to toggle percent and pixels use the P key
you can dispose guides individually or use this class to dispose all
disposing will remove the G, P key listener and the guide
--*///+77
	zim.GuideManager = function() {
		z_d("77");
		zim.Manager.call(this, "GuideManager");
	}
	zim.GuideManager.prototype = new zim.Manager();
	zim.GuideManager.prototype.constructor = zim.GuideManager;
	//-77

/*--
zim.Grid = function(obj, color, percent, hideKey, pixelKey)

Grid
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A Grid shows gridlines to help layout assets with code (percent is default).
Cursor x and y percentage or pixels are shown along edges.
Use the G key to toggle grid visibility.
Use the P key to toggle percent and pixels.
Make sure you remove the grid for your final version (dispose).

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var grid = new zim.Grid();

// better to add grids to a GridManager
var manager = new zim.GridManager();
manager.add(new zim.Grid());

// or with pixels
// manager.add(new zim.Grid(null, false));

// then you can remove all grids with
// grid.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all grids:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - (default the default stage) the object to add grid to (for example a Container)
color - (default black) the color of the grid
percent - (default true) set to false to show pixels
hideKey - (default G) key to press to hide grid
pixelKey - (default P) key to press to swap percent and pixels

METHODS
resize() - resize the grid if the container changes size (eg. put in frame resize event)
dispose() - clears keyboard events and grid

PROPERTIES
type - holds the class name as a String
pixels - boolean - set to true to change to pixels, false to go to percent
--*///+78
	zim.Grid = function(obj, color, percent, hideKey, pixelKey) {

		var sig = "obj, color, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Grid, arguments, sig, this)) return duo;
		z_d("78");
		this.zimContainer_constructor();
		this.type = "Grid";

		if (zot(obj)) {
			if (zimDefaultFrame) {
				obj = zimDefaultFrame.stage;
			} else {
				obj = "stage";
			}
		}
		if (zot(color)) color = "black";
		if (obj != "stage" && (!obj.addChild || !obj.getBounds || !obj.getBounds())) {zog ("zim controls - Grid(): Please provide container with bounds for the obj (setBounds())"); return;}
		if (zot(percent)) percent = true;
		if (zot(hideKey)) hideKey = "G";
		if (zot(pixelKey)) pixelKey = "P";

		var that = this;
		var pixels = 10; // for grid
		var stageEvent;


		this.mouseChildren = false;
		this.mouseEnabled = false;

		// make text boxes that show x and y
		var boxW = 80;
		var boxH = 26;

		var top = makeBox("#dddddd", color, "#333333");
		top.shape.regX = boxW/2; top.shape.regY = -boxH/4;
		top.label.y = boxH*3/4;

		var left = makeBox("#dddddd", color, "#333333");
		left.shape.regX = -boxW/6; left.shape.regY = boxH/2;
		left.label.x = boxW/2 + boxW/6;

		function makeBox(fill, stroke, textColor) {
			var box = new zim.Container();
			box.shape = new createjs.Shape();
			box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH);
			box.shape.alpha = .9;
			box.addChild(box.shape);
			box.label = new createjs.Text("10", "16px verdana", textColor);
			box.label.textAlign = "center";
			box.label.textBaseline = "middle";
			box.addChild(box.label);
			box.mouseChildren = false;
			box.mouseEnabled = false;
			return box;
		}

		var minX = boxW/6+boxW/2;
		var minY = boxH*2
		var maxX; // set max values once we get a stage
		var maxY;

		top.x = minX;
		left.y = minY;
		top.label.text = "x:0";
		left.label.text = "y:0";

		var stage;
		if (obj != "stage") obj.addChild(that);
		var addedInterval = zim.added(that, added);

		var gridCheck = false;
		function added() {
			if (obj == "stage") {
				stage =	that.stage;
				obj = stage;
			} else {
				stage =	obj.stage;
			}
			if (!gridCheck) {
				drawGrid();
				obj.addChild(that);
			}
			stage.off("stagemousemove", stageEvent);
			stageEvent = stage.on("stagemousemove", where);
			stage.update();
		};

		var lastPoint = {x:0,y:0};
		function where(e) {
			// convert mouse location to local point
			var point;
			if (e) {
				point = obj.globalToLocal(e.rawX, e.rawY);
				lastPoint = point;
			} else {
				point = {x:lastPoint.x, y:lastPoint.y}
			}
			if (!percent) {	// pixels
				top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x), Math.round(objW)));
				top.x = Math.max(minX, Math.min(point.x, maxX));
				left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y), Math.round(objH)));
				left.y = Math.max(minY, Math.min(point.y, maxY));
			} else {
				top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x/objW*100), 100)) + "%";
				top.x = Math.max(minX, Math.min(point.x, maxX));
				left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y/objH*100), 100)) + "%";
				left.y = Math.max(minY, Math.min(point.y, maxY));
			}
			if (stage) stage.update();
		}

		// make the grid once we have the stage
		var objW;
		var objH;
		var cached;
		function drawGrid() {
			 gridCheck = true;

			if (obj && obj.getBounds) {
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
			}
			if (stage) {
				stage.mouseMoveOutside = true;
				stage.enableMouseOver(10);
			}

			maxX = objW-boxW*2/3;
			maxY = objH-boxH - boxH;

			cached = new zim.Container();
			that.addChild(cached);
			var grid = new createjs.Shape();
			cached.addChild(grid);
			var g = grid.graphics;
			g.s(color).ss(1);

			var grid2 = new createjs.Shape();
			cached.addChild(grid2);


			if (!percent) { // pixels

				for (var i=0; i<objW/pixels; i++) {
					g.mt(i*pixels, 0).lt(i*pixels, objH);
				}
				for (var i=0; i<objH/pixels; i++) {
					g.mt(0, i*pixels).lt(objW, i*pixels);
				}
				grid.alpha = .3;

				g = grid2.graphics;
				g.s(color).ss(1);

				for (var i=0; i<objW/(pixels*10); i++) {
					g.mt(i*(pixels*10), 0).lt(i*(pixels*10), objH);
				}
				for (var i=0; i<objH/(pixels*10); i++) {
					g.mt(0, i*(pixels*10)).lt(objW, i*(pixels*10));
				}

			} else { // percent - every 5 percent

				for (var i=1; i<20+2; i++) {
					g.mt(i*objW/20, 0).lt(i*objW/20, objH);
				}
				for (var i=1; i<20; i++) {
					g.mt(0, i*objH/20).lt(objW, i*objH/20);
				}
				grid.alpha = .3;

				g = grid2.graphics;
				g.s(color).ss(1);

				for (var i=1; i<10; i++) {
					g.mt(i*objW/10, 0).lt(i*objW/10, objH);
				}
				for (var i=1; i<10; i++) {
					g.mt(0, i*objH/10).lt(objW, i*objH/10);
				}
			}

			var crossSize = 80;
			g.s("#FFFFFF").ss(8);
			g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
			g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);

			g.s("#000000").ss(4);
			g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
			g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);

			// draw a border
			g.s(color).ss(3);
			g.dr(0,0,objW,objH);

			grid2.alpha = .5;
			cached.cache(0,0,objW,objH);

			that.addChild(top);
			that.addChild(left);

		 	if (stage) stage.update();
		}

		Object.defineProperty(this, 'pixels', {
			get: function() {
				return !percent;
			},
			set: function(value) {
				percent = !value;
				that.resize();
			}
		});

		// add key listener to hide and show the grid
		window.addEventListener("keydown", keyEvent);

		function keyEvent(e) {
			if (!e) e=event;
			if (!stage) return;
			if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
				that.visible = !that.visible;
				stage.off("stagemousemove", stageEvent);
				if (that.visible) {
					stageEvent = stage.on("stagemousemove", where, that);
				}
				stage.update();
			}
			if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
				that.removeChild(cached);
				cached = null;
				that.pixels = !that.pixels;
			}
		}

		this.resize = function() {
			if (!that) return false;
			that.removeChild(cached);
			cached = null;
			if (stage) {
				drawGrid();
				where();
				setTimeout(function(){ // solve ipod bug
					that.removeChild(cached);
					cached = null;
					drawGrid();
				},200);
			}
			return true;
		}

		this.dispose = function() {
			clearInterval(addedInterval);
			that.removeAllChildren();
			window.removeEventListener("keydown", keyEvent);
			if (that.parent) that.parent.removeChild(that);
			that = null;
			return true;
		}

	}
	zim.extend(zim.Grid, zim.Container, "clone", "zimContainer", false);
	//-78


/*--
zim.GridManager = function()

GridManager
zim class - extends a zim.Manager

DESCRIPTION
Add Zim Grid objects to a GridManager object and update or remove all grids at once.
Grids are handy to use but perhaps annoying to update and remove if you have many.
GridManager keeps track of the grids and lets you update or dispose of them on command.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var manager = new zim.GridManager();
manager.add(new zim.Grid());

// or with pixels
// manager.add(new zim.Grid(null, false));

// then you can remove all grids with
// grid.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all grids:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

METHODS
add(grid) - registers a grid with the GridManager
remove(grid) - removes grid from the register
resize() - resizes all the grids in the GridManager (ie. if stage changes)
dispose() - disposes all grids and the GridManager

NOTE: to just hide grids, you use the G key
and to toggle percent and pixels use the P key
you can dispose grids individually or use this class to dispose all
disposing will remove the G key listener and the grid

PROPERTIES
items - an array of all Grid objects added with add()
--*///+79
	zim.GridManager = function() {
		z_d("79");
		zim.Manager.call(this, "GridManager");
	}
	zim.GridManager.prototype = new zim.Manager();
	zim.GridManager.prototype.constructor = zim.GridManager;
	//-79

/*--
zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)

Layout
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Layout arranges objects on the page by fitting them in regions.
Make a layout object for each page if desired
and even nest layout objects inside regions.
Fixed aspect ratio content is fit into regions.
Layout is good for flexive design where you anchor titles and navigation.
Layout handles any number of regions vertically or horizontally.
It is useful for full scale mode for different devices or browser window scale.
You need to run the resize() method to update the layout.
Put the all your layouts in zim.LayoutManager to scale all at once.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// these would be containers with your content
// make sure that bounds are set on containers
// you may want to hard code bounds for clarity
var header = new zim.Rectangle(500, 200, "blue");
var content = new zim.Rectangle(600, 500, "green");
var footer = new zim.Rectangle(500, 200, "blue");
stage.addChild(header, content, footer);

// make the Layout - more useful for FULL scale mode
var layout = new zim.Layout({
	holder:stage,
	regions:[
		{object:header, marginTop:10, maxWidth:80, minHeight:10, valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:footer, marginTop:5, maxWidth:80, height:10}
	],
	lastMargin:5
});

// add to LayoutManager to resize or dispose all layouts together
// disposing only removes keyboard events to show boundaries
var manager = new zim.LayoutManager();
manager.add(layout);

frame.on("resize", function() {
	manager.resize();
	stage.update();
});

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - object to hold layout (stage, container, etc) that must have bounds set
regions - an array of region objects with specific properties for each
	Example VERTICAL region objects - all dimensions are percents
		[{object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:nav, marginTop:5, maxWidth:80, height:20, backgroundColor:"red"}]
	note: no minHeight for middle regions - but heights on any region
	align defaults to middle for the regions
	valign defaults to top and bottom for the top and bottom region and middle for the others
	backgroundColor applies a backing color to the region
	Example HORIZONTAL region objects
		[{object:col1, marginLeft:10, maxHeight:80, width:20, valign:"bottom"},
		{object:col2, marginLeft:5, maxHeight:90, align:"middle"}, // note, middle gets no minWidth
		{object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"}]
	align defaults to left and right for the outer regions and middle for the inside regions
	valign defaults to top for all the regions
lastMargin - (default 0) the margin at the bottom (vertical) or at the right (horizontal)
backgroundColor - (default null) background color for the whole holder
vertical - (default true) set to false for horizontal layout
regionShape - (default null) a zim or createjs Shape object to show bounds (gets added to holder)
	can toggle on and off with B key - but must pass in the Shape to use the B key
scalingTarget - (default holder) an object used as the bounds of the region scaling
	setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
	it does not scale the holder - only scales the region objects inside
hideKey - (default B) is the hot key for hiding and showing the bounds

METHODS
resize() - resize based on new bounds of the holder (or scalingObject)
dispose() - removes the B key listener (otherwise, nothing to dispose)
addShape(shape) - adds a bounding shape dynamically
removeShape() - permanently removes the bounding shape
disable() - disables all the layout (shape and sizing)
enable() - enables all the layout (shape and sizing)
if you want to get rid of the objects then you need to do so in your app

PROPERTIES
regions - the regions object - if changed will have to call resize() manually

DESCRIPTION OF FLEXIVE DESIGN
here described with vertical layout - horizontal is similar but rotated 90
the content in the middle will try and expand against the top and bottom
until it forces the top and bottom to their minimum percents
if the content hits its maximum width percent first then the top and bottom
will fill up the rest of the height until they reach their maximum widths
--*///+80
	zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey) {

		var sig = "holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey";
		var duo; if (duo = zob(zim.Layout, arguments, sig, this)) return duo;
		z_d("80");
		this.cjsEventDispatcher_constructor();

		if (zot(holder) || !holder.getBounds) {zog ("zim controls - Layout(): please provide an object with bounds set that holds the objects being laid out"); return;}
		scalingObject = (zot(scalingObject)) ? holder : scalingObject;
		if (!scalingObject.getBounds || !scalingObject.getBounds()) {zog ("zim controls - Layout(): holder must have bounds set or provide a scalingObject with bounds"); return;}
		var bounds = scalingObject.getBounds();
		holder.setBounds(0,0,bounds.width,bounds.height);
		// note, Layout sets bounds of holder but does not scale the holder - only the objects in regions
		// it may be that the holder is scaled by some external process
		// but probably not if a scalingObject is used

		if (zot(lastMargin)) lastMargin = 0;
		if (zot(vertical)) vertical = true;
		if (zot(backgroundColor)) backgroundColor = "";
		if (zot(hideKey)) hideKey = "B";
		var backing = new createjs.Shape(); // holds any backing colors
		var that = this;
		this.active = true;

		// loop through region objects and assign defaults
		// also check that regions can fit with values given
		// we basically do the same thing with horizontal and vertical layouts
		// but obviously one uses widths and the other heights, etc.
		// so adapted generic phrases of PRIMARY and SECONDARY
		// primary for vertical is in the Y direction and uses height and top
		// primary for horizontal is in the X direction and uses width and left
		// secondary for vertical is X and for horizontal is Y
		// min, absolute and margin values are only available in the primary
		// max values are only available in the secondary
		// align, valign and backgroundcolor is available for primary and secondary
		// absolute values (height, width) are to be used if given
		// if not given we try to maximize size and to adhere to min values
		// as calculations progress we calculate given, maxGiven and marginGiven values
		// these are temporary depending on the resizing and are always in the primary direction
		// secondary direction is quite simple
		// primary direction is quite complex involving a number of steps and even some recursion

		this.regions = regions; // expose the regions object for dynamic adjustments then manual resize

		var r; // used to hold a region in a loop
		var totalAbsolute = 0;
		var minPrimary = "minWidth";
		var primary = "width";
		var secondary = "height";
		var marginPrimary = "marginLeft";
		var maxSecondary = "maxHeight";
		var axisPrimary = "x";
		var axisSecondary = "y";
		if (vertical) {
			minPrimary = "minHeight";
			primary = "height";
			secondary = "width";
			marginPrimary = "marginTop";
			maxSecondary = "maxWidth";
			axisPrimary = "y";
			axisSecondary = "x";
		}
		for (var i=0; i<regions.length; i++) {
			r = regions[i];
			if (!r.object || !r.object.getBounds()) {zog("zim controls - Layout(): each region object must have an object with setBounds() set"); return;}
			if (!r[minPrimary]) r[minPrimary] = 0;
			if (!r[primary]) r[primary] = 0;
			if (!r.backgroundColor) r.backgroundColor = "";
			r.given = 0;
			r.maxGiven = 0;
			if (!r[marginPrimary]) r[marginPrimary] = 0;
			if (!r[maxSecondary]) r[maxSecondary] = 100;
			if (vertical) {
				// default alignment differs for orientation
				if (!r.align) r.align = "middle";
				if (!r.valign) {
					if (i==0) {r.valign = "top";}
					else if (i==regions.length-1) {r.valign = "bottom";}
					else {r.valign = "middle";}
					if (regions.length == 1) {r.valign = "middle"}
				}
			} else {
				if (!r.valign) r.valign = "top";
				if (!r.align) {
					if (i==0) {r.align = "left";}
					else if (i==regions.length-1) {r.align = "right";}
					else {r.align = "middle";}
					if (regions.length == 1) {r.align = "middle"}
				}
			}
			if (r[primary]) r[minPrimary] = 0; // primary overrides minPrimary
			totalAbsolute += r[primary] + r[marginPrimary];
		}

		// primaries (not minPrimaries) are absolute percentage and are kept no matter what
		// margins are absolute percentage and are kept no matter what
		// check if primaries and margins are more than 100%
		totalAbsolute += lastMargin;
		if (totalAbsolute > 100) {zog("zim controls - Layout(): cannot fit regions into 100% bounds"); return;}
		var leftOverPrimary = 100-totalAbsolute;

		distribute(); // also called from within resize function
		function distribute() {
			// distribute leftOverPrimary to any regions without a primary or a given (primary)
			// proportion based on primary dimension of objects in regions
			// apply this primary to given (primary)
			var totalPrimaries = 0;
			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				r.given = 0;
				if (r[primary] == 0) totalPrimaries += r.object.getBounds()[primary];
			}
			// now we know total raw heights of objects needing height applied
			// loop back through and give these objects their proportion of what is left
			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				if (r[primary] == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary;
			}
		}

		this.resize = function() {
			if (!that.active) return;
			bounds = scalingObject.getBounds();
			holder.setBounds(0,0,bounds.width,bounds.height);
			backing.graphics.clear();
			if (backgroundColor!="") backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);

			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				r.maxGiven = 0;
				r.marginGiven = 0;
			}
			// all the primaries are applied
			// but some objects might not need the primary because they have maxed out on maxSecondary
			// we need to give this extra primary back to the pool
			// and keep doing it until there are no more maxed objects

			var keepGoing = true; var allCheck; var giveBack;
			var p; var s; var boundsP; var boundsS; var maxGiven;
			var leftOverPrimary2 = leftOverPrimary;
			while (keepGoing) {
				// check for objects maxed in width
				giveBack = 0;
				keepGoing = false; allCheck = true;
				// we want to keep going unless all objects are maxed
				// or none of the objects are maxed
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					if (r.given > 0 && r.maxGiven == 0) {
						p = r.object.getBounds()[primary];
						s = r.object.getBounds()[secondary];
						boundsP =  r.given * bounds[primary]/100;
						boundsS =  r[maxSecondary] * bounds[secondary]/100; // convert to pixels
						maxGiven = s/p*boundsP;
						if (maxGiven > boundsS) {
							// maxed out so give back height
							// keepGoing=true;
							// store this as maxGiven property
							// might have to take it away if later minHeights are not met
							r.maxGiven = p/s*boundsS * 100/bounds[primary]; // convert back to percentage
							giveBack += r.given - r.maxGiven;
							leftOverPrimary2 -= r.maxGiven;
						} else {
							allCheck = false;
						}
					}
				}

				// !keepGoing was missing when secondary affects primary so took check out
				// if (!keepGoing) break;
				if (allCheck) break;

				// redistribute the extra stuff too all that are not maxed out and not with primary values
				// proportion based on primary dimension of objects in regions
				// apply this primary to given (primary)
				totalPrimaries = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					if (r[primary] == 0 && r.maxGiven == 0) totalPrimaries += r.object.getBounds()[primary];
				}
				// now we know total raw heights of objects needing height applied
				// loop back through and give these objects their proportion of what is left
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					if (r[primary] == 0 && r.maxGiven == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary2;
				}
			}

			// if end regions have not met their minPrimaries
			// set those minPrimaries to primaries and resize again
			// divide leftover primary to regions with no set primary
			// maximize middle regions as this is usually content
			// if the edge regions have minPrimaries set them to minPrimary
			// if they do not have minPrimaries then proportion them equally with the rest

			var scaleCheck = true;
			r = regions[0];
			if (r.maxGiven > 0) {
				 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
			} else if (r.given > 0) {
				 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
			}
			r = regions[regions.length-1];
			if (r.maxGiven > 0) {
				 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
			} else if (r.given > 0) {
				 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
			}
			if (!scaleCheck) {
				// recalculate leftOverPrimary
				totalAbsolute = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					totalAbsolute += r[primary] + r[marginPrimary];
				}
				totalAbsolute += lastMargin;
				if (totalAbsolute > 100) {zog("zim display - Layout(): cannot fit regions into 100% bounds"); return;}

				leftOverPrimary = 100-totalAbsolute;
				distribute();
				that.resize();
				return;
			}

			// if specified all primaries or all maxed in secondary
			// then distribute based on inner margins
			// watch out - may need to revert to original margins if page is resized
			// so introduce a new marginGiven property

			var allHeights = true; var marginTotal = 0; var primaryTotal = 0;
			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				marginTotal += r[marginPrimary];
				if (r[primary] > 0) primaryTotal += r[primary];
				else if (r.maxGiven > 0) primaryTotal += r.maxGiven;
				else if (r.given > 0) primaryTotal += r.given;
				if (r[primary] == 0) {
					allHeights = false;
				}
			}
			if (allHeights || allCheck) {
				marginTotal += lastMargin;
				var extra = 100-primaryTotal-marginTotal;
				// remove two outer margins
				marginTotal -= (lastMargin + regions[0][marginPrimary]);
				if (extra != 0 && marginTotal != 0) { // divide up extra margin space
					for (var i=0; i<regions.length; i++) {
						if (i==0) continue;
						r = regions[i];
						r.marginGiven = r[marginPrimary]/marginTotal*(marginTotal+extra);
					}
				}
			}

			// ready to fit objects into regions, align and draw any bounds and background colors
			var pPos=0; // primary position (x for horizontal, y for vertical)
			var sPos=0; // secondary position
			var p;  	// primary dimension (width for horizontal, height for vertical)
			var s;		// secondary dimension
			var f; 		// fit variable will receive a handy object with new data and original region bounds data
						// {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}

			var addedW; var addedH;	// just a little offscreen coloring to help page transitions
			if (regionShape && regionShape.graphics) {
				var g = regionShape.graphics;
				g.c();
			}
			for (var i=0; i<regions.length; i++) {
				r = regions[i];

				// calculate primary data
				if (r.marginGiven > 0) pPos += r.marginGiven * bounds[primary]/100; // convert to pixels
				else pPos += r[marginPrimary] * bounds[primary]/100;
				if (r[primary] > 0) {p = r[primary];}
				else if (r.maxGiven > 0) {p = r.maxGiven;}
				else if (r.given > 0) {p = r.given;}
				else {p = 0;}
				p = p * bounds[primary]/100;

				// calculate secondary data
				s = r[maxSecondary] * bounds[secondary]/100;
				sPos = (bounds[secondary]-s)/2;

				// fit the objects into the region, align and draw any regionShape
				// this is slightly different for different orientations
				if (vertical) f = zim.fit(r.object,sPos,pPos,s,p);
				else f = zim.fit(r.object,pPos,sPos,p,s);

				// handle alignment
				if (r.valign == "top") r.object.y = f.bY;
				else if (r.valign == "bottom") r.object.y = f.bY+f.bHeight-f.height;
				if (r.align == "left") r.object.x = f.bX;
				else if (r.align == "right") r.object.x = f.bX+f.bWidth-f.width;
				if (regionShape && regionShape.graphics) {
					g.s("white").ss(2).r(f.bX,f.bY,f.bWidth,f.bHeight);
					g.s("#ff8203").sd([20,20]).r(f.bX,f.bY,f.bWidth,f.bHeight).sd();
				}

				// draw any backing colors for region
				// transitions in ZIM Pages need a little extra overlap on page edges
				addedH = addedW = 0;
				if (pPos == 0 || (pPos+p) == bounds[primary]) if (vertical) {addedH=1} else {addedW=1};
				if (s == bounds[secondary]) if (vertical) {addedW=1} else {addedH=1};
				if (r.backgroundColor != "") backing.graphics.f(r.backgroundColor).r(f.bX, f.bY, f.bWidth+addedW, f.bHeight+addedH);

				// increase our primary position
				pPos += p;
			}
		}

		this.resize();

		// add regionShape if there is one and backing shape
		if (regionShape) holder.addChild(regionShape);
		holder.addChildAt(backing,0);

		// key listener and other methods:

		// add key listener to hide and show the bounds
		window.addEventListener("keydown", keyEvent);
		function keyEvent(e) {
			if (!e) e=event;

			if (regionShape) {
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // B
					regionShape.visible = !regionShape.visible;
					if (regionShape.stage) regionShape.stage.update();
				}
			}
		}

		this.disable = function() {
			that.active = false;
			window.removeEventListener("keydown", keyEvent);
			if (regionShape) regionShape.alpha = 0;
		}

		this.enable = function() {
			that.active = true;
			window.addEventListener("keydown", keyEvent);
			that.resize();
			if (regionShape) regionShape.alpha = 1;
		}

		this.removeShape = function() { // use for final app
			if (regionShape) {
				regionShape.graphics.clear();
				holder.removeChild(regionShape);
				regionShape = null;
				regionShape = false;
			}
			window.removeEventListener("keydown", keyEvent);
		}

		this.addShape = function(shape, target) {
			that.removeShape();
			regionShape = shape;
			window.addEventListener("keydown", keyEvent);
			holder.addChild(regionShape);
			that.resize();
		}

		this.dispose = function() {
			// does not really dispose in case a resize is needed
			// it has no events aside from the keydown
			// which gets removed when we removeShape below
			that.removeShape();
			return true;
		}
	}
	zim.extend(zim.Layout, createjs.EventDispatcher, null, "cjsEventDispatcher", false);
	//-80

/*--
zim.LayoutManager = function()

LayoutManager
zim class

DESCRIPTION
Add Zim Layout objects to a LayoutManager object and update them all at once.
You can remove all layout region bound shapes at once
as well as remove the B key to show the region bound shapes.
For a final project, call the dispose().
This will remove all shapes and key events.
The layouts will remain in place to handle multiple screen sizes.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// these would be containers with your content
// make sure that bounds are set on containers
// you may want to hard code bounds for clarity
var header = new zim.Rectangle(500, 200, "blue");
var content = new zim.Rectangle(600, 500, "green");
var footer = new zim.Rectangle(500, 200, "blue");
stage.addChild(header, content, footer);

// make the Layout - more useful for FULL scale mode
var layout = new zim.Layout({
	holder:stage,
	regions:[
		{object:header, marginTop:10, maxWidth:80, minHeight:10, valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:footer, marginTop:5, maxWidth:80, height:10}
	],
	lastMargin:5
});

// add to LayoutManager to resize or dispose all layouts together
// disposing only removes keyboard events to show boundaries
var manager = new zim.LayoutManager();
manager.add(layout);

frame.on("resize", function() {
	manager.resize();
	stage.update();
});

stage.update();
END EXAMPLE

METHODS
add(layout) - registers a layout with the LayoutManager
resize() - resizes all the layouts in the LayoutManager
disable() - disables all the layouts in the LayoutManager (shapes and sizing)
enable() - enables all the layouts in the LayoutManager (shapes and sizing)
dispose() - only removes bounds shapes and keyboard events (does not really dispose)

NOTE: to just hide bounds, you use the B key

PROPERTIES
items - an array of all Layout objects added with add()
--*///+81
	zim.LayoutManager = function() {
		z_d("81");
		var that = this;
		this.items = [];
		this.add = function(layout) {
			that.items.push(layout);
		}
		this.resize = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].resize();
			}
		}
		this.disable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].disable();
			}
		}
		this.enable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].enable();
			}
		}

		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].removeShape(); // also removes key events
			}
			return true;
		}
	}//-81

/*--
zim.Parallax = function(stage, damp, layers, auto)

Parallax
zim class

DESCRIPTION
Takes objects as layers and sets properties based on an input,
for instance, each layer could move a different x based on position of mouseX
or each layer could scale a different amount based on scroll of y.
The types of input are mouseX, mouseY, scrollX, scrollY or custom.
The types of properties to change could be x, y, scaleX, scaleY, rotation, alpha, frameNumber, etc.
Parallax allows scale to be a property which scales scaleX and scaleY together.
Parallax allows frame to be a property and calls gotoAndStop() on a Sprite frame.
Parallax really just manages multiple ProportionDamp objects.
For proper parallax, the objects closer move more than the objects farther back.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// make assets to move around
// these could be pictures, shapes, containers, etc.
var backing = new zim.Rectangle(800, 200, "yellow");
backing.center(stage);
var mid = new zim.Rectangle(400, 200, "green");
mid.center(stage).y += 20;
var front = new zim.Circle(60, "red");
front.center(stage).y += 80;

// make Parallax object - here we move with stage mouseX and mouseY
var parallax = new zim.Parallax(stage, .1, [
	{obj:backing, prop:"x", propChange:50}, {obj:backing, prop:"y", propChange:40, input:"mouseY"},
	{obj:mid, prop:"x", propChange:100}, {obj:mid, prop:"y", propChange:80, input:"mouseY"},
	{obj:front, prop:"x", propChange:150}, {obj:front, prop:"y", propChange:100, input:"mouseY"}
]);

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
stage - the stage
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
layers - (default null) an array of layer objects, the format as below
	Example: to move an obj 200 px in the x as the window scrolls from 100 to 300 px in the y
		[{obj:obj, prop:"x", propChange:200, input:"scrollY", inMin:100, inMax:300, factor:1, integer:false}, etc.]
	obj - the object whose property is being changed
	prop - the property that is being changed
	propChange - how much you want the property to change
	input - (default mouseX) but can also be mouseY, scrollX, scrollY
	inMin - (default 0) minimum input range
	inMax - (default stageW (for x prop) stageH (for y prop)) maximum input range
	factor - (default 1) set factor to -1 to change in the opposite direction
	integer - (default false) set to true to round the value to an integer
	Example 2: a traditional mouse move parallax for one object
		[{obj:obj, prop:"x", propChange:100}, {obj:obj, prop:"y", propChange:50, input:"mouseY"}, etc.]
	you would probably have more objects to follow
	or you can add these one at a time with the p.addLayer({layer object properties});
auto - (default true) uses the specified input
	if auto is set to false, you must make your own Ticker and use the step(input) method
NOTE: ticker and fps parameters have been removed - see zim.Ticker to set

METHODS
addLayer({layer object properties}) - adds a layer
removeLayer(index) - removes a layer based on order added
step(input) - used when auto is false to send in custom input data
immediate([]) - immediately sets the target value for each layer object (no damping)
dispose() - removes listeners

PROPERTIES
damp - allows you to dynamically change the damping
--*///+68
	zim.Parallax = function(stage, damp, layers, auto) {

		var sig = "stage, damp, layers, auto";
		var duo; if (duo = zob(zim.Parallax, arguments, sig, this)) return duo;
		z_d("68");
		if (zot(stage) || !stage.getBounds) {zog("zim display - Parallax(): please pass in the stage with bounds as first parameter"); return;}
		if (!stage.getBounds()) {zog("zim display - Parallax(): Please give the stage bounds using setBounds()");	return;}
		if (zot(auto)) auto = true;

		var stageW = stage.getBounds().width;
		var stageH = stage.getBounds().height;

		var that = this;

		// public properties
		var _damp = (zot(damp)) ? .1 : damp;

		// public methods (do not get hoisted so define early)
		// addLayer works as a public method
		// and also is called from the object in case we add layers via the Parallax object parameters
		// the function prepares ProportionDamp objects for two values
		// and stores them on the layer object
		// and also stores the desired amounts on the layer objects themselves
		// finally, the layer object is added to the myLayers private property
		// the timer then loops through these layers and handles things from there
		// obj, distanceX, distanceY, minX, minY, maxX, maxY, factor, targetRound
		this.addLayer = function(layer) {
			//{obj, prop, propChange, input, inMin, inMax, factor, integer}
			if (zot(layer.obj) || zot(layer.prop) || zot(layer.propChange)) return;
			var obj = {obj:layer.obj, prop:layer.prop};
			obj[obj.prop] = layer.propChange;
			if (zot(layer.input)) layer.input = "mouseX";
			obj.input = layer.input;

			var inMin = (zot(layer.inMin)) ? 0 : layer.inMin;
			var inMax = (zot(layer.inMax)) ? stageW : layer.inMax;
			var factor = (zot(layer.factor)) ? 1 : layer.factor;
			var integer = (zot(layer.integer)) ? false : layer.integer;

			// baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound
			obj["p_"+obj.prop] = new zim.ProportionDamp(inMin, inMax, 0, obj[obj.prop], _damp, factor, integer);
			if (obj.prop == "scale") {
				obj["s_"+obj.prop] = obj.obj.scaleX; // helper to allow scale to be property
			} else if (obj.prop == "frame") {
				obj["s_"+obj.prop] = obj.obj.currentFrame;
			} else {
				obj["s_"+obj.prop] = obj.obj[obj.prop]; // obj.s_x = obj.obj.x for example
			}
			myLayers.push(obj);
			return myLayers.length-1;
		}

		this.removeLayer = function(index) {
			if (zot(index)) return;
			var layer = myLayers[index];
			layer["p_"+layer.prop].dispose();
			myLayers.splice(index,1);
		}

		this.immediate = function(array) {
			var o;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];
				o["p_"+o.prop].immediate(array[i]);
			}
		}

		this.dispose = function() {
			myLayers = null;
			if (auto) zim.Ticker.remove(zimTicker);
			return true;
		}

		// private properties
		// here are any layers that come in from Parallax object parameters
		layers = (zot(layers)) ? [] : layers;

		// we now are going to process these layers with the public addLayer method
		// this will add the processed layers to the private property, myLayers
		var myLayers = [];
		for (var i=0; i<layers.length; i++) {
			this.addLayer(layers[i]);
		}

		if (auto) {
			var zimTicker = zim.Ticker.add(animate, stage);
		}

		// loop though our layers and apply the converted proportion damping
		function animate(e) {
			that.step();
		}

		this.step = function(custom) {
			var o; var input;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];
				if (zot(custom)) {
					if (o.input == "mouseX") input = stage.mouseX;
					else if (o.input == "mouseY") input = stage.mouseY;
					else if (o.input == "scrollX") input = zim.scrollX();
					else if (o.input == "scrollY") input = zim.scrollY();
				} else {
					input = custom;
				}
				// damp object at property to start value + converted goal based on input
				if (o.prop == "scale") {
					o.obj.scaleX = o.obj.scaleY = o["s_"+o.prop] + o["p_"+o.prop].convert(input);
				} else if (o.prop == "frame") {
					o.obj.gotoAndStop(o["s_"+o.prop] + o["p_"+o.prop].convert(input));
				} else {
					o.obj[o.prop] = o["s_"+o.prop] + o["p_"+o.prop].convert(input);
					// for x on mouseX we split the destination range in two for a centered parallax
					if (o.input == "mouseX" && auto) o.obj[o.prop] -= o[o.prop] / 2;
				}
			}
		}

		Object.defineProperty(that, 'damp', {
			get: function() {
				return _damp;
			},
			set: function(value) {
				_damp = value;
				var o;
				for (var i=0; i<myLayers.length; i++) {
					o = myLayers[i];
					o["p_"+o.prop].damp = _damp;
				}
			}
		});

	}//-68


/*--
zim.Scroller = function(backing, speed, direction, horizontal, gapFix, stage, container)

Scroller
zim class extends a createjs.EventDispatcher

DESCRIPTION
Scroller animates a backing either horizontally or vertically (not both).
The Scroller object will create a clone of the backing
and animate and swap the backgrounds when needed.

NOTE: A scroller can be added to a zim.Accelerator object
this will allow the percentSpeed to be synched with other Scroller and Dynamo objects
See http://zimjs.com/code/zide/

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var one = new zim.Rectangle(1200, 400, "red");
frame.makeCircles().center(one);
stage.addChild(one);

var scroller = new zim.Scroller(one);

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
background - an object to animate (make start and end edges match to be seemless)
speed - (default 1) how fast in pixels per second the animation is going
direction - (default 1) set to -1 for left or down
horizontal - (default true) set to false to animate vertically
	you can adjust the speed and direction properties dynamically
	you cannot adjust the backings and horizontal dynamically
	to change your animation, dispose() of the Scroller object and make a new one
	disposing just removes the ticker - you have to remove the backings
	NOTE: the gapFix and ticker parameters have been removed - see zim.Ticker
gapFix - (default 0) if a thin line appears when changing speed - try setting to 1 or 2
stage - (default background.stage) if the backround is not on the stage then need to pass the stage it will be on
container - (default stage) what bounds are used for wrapping the background

METHODS
pause(state) - state defaults to true and pauses the scroller (sets speed to 0)
	set state to false to unpause the scroller (sets speed to speed before pausing)
dispose() - get rid of the event listeners - you need to remove the backings (see backing properties)

PROPERTIES
backing1 - the original backing passed in
backing2 - the cloned backing made from the original backing
speed - how fast the animation is going in pixels per frame
baseSpeed - the scroller speed when it was first made (or can override)
	used to determine percentage speed for percentSpeed property
percentSpeed - get or set the percentage of the baseSpeed
	this allows you to animate multiple scrollers relative to one another
	See ScrollerManager class
direction - either left or right if horizontal or up or down if not horizontal
pause - read only - true if paused and false if not - must be set with pause() method

EVENTS
Dispatches a pause event when paused is complete (sometimes a delay to slow to pause)
--*///+69
	zim.Scroller = function(backing, speed, direction, horizontal, gapFix, stage, container) {
		var sig = "backing, speed, direction, horizontal, gapFix, stage, container";
		var duo; if (duo = zob(zim.Scroller, arguments, sig, this)) return duo;

		z_d("69");
		this.cjsEventDispatcher_constructor();
		var b1 = this.backing1 = backing;
		if (zot(b1) || !b1.getBounds) return;
		var b2 = this.backing2 = backing.clone();
		b1.parent.addChild(b2);
		if (zot(horizontal)) horizontal = true;
		if (zot(gapFix)) gapFix = 0;
		var that = this; // we keep animate protected but want to access public properties

		// here are the public properties that can be changed
		this.speed = (zot(speed)) ? 1 : speed;
		var lastSpeed = this.baseSpeed = this.speed;
		this.direction = (zot(direction)) ? 1 : direction;
		var scale = horizontal ? b1.scaleX : b1.scaleY;

		if (!b1.getBounds()) {
			zog("zim display - Scroller(): please setBounds() on backing objects");
			return;
		}
		if (!stage && !b1.stage) {
			zog("zim display - Scroller(): please pass in stage parameter or add backing objects to stage to start");
			return;
		}
		stage = stage||b1.stage;
		if (zot(container)) container = stage;
		if (!container.getBounds()) {zog("zim display - Scroller(): please setBounds() on container or stage if no container"); return;}

		var w = b1.getBounds().width*scale-gapFix;
		var h = b1.getBounds().height*scale-gapFix;

		var viewW;
		var viewH;

		if (horizontal) {
			b2.x = w;
		} else {
			b2.y = h;
		}

		var pausing = false; // for in the act of pausing
		var zimTicker = zim.Ticker.add(animate, stage);

		function animate(e) {
			if (!viewW) {
				viewW = container.getBounds().width;
				viewH = container.getBounds().height;
			}
			// pausing the ticker does not really pause the ticker (weird)
			if (that.speed == 0 || that.direction == 0) {return;}

			if (horizontal) {
				b1.x -= that.speed*that.direction;
				if (b1.x < b2.x) {
					b2.x = b1.x + w;
				} else {
					b2.x = b1.x - w;
				}
				if (that.direction * that.speed > 0) {
					if (b2.x < 0 && b1.x < b2.x) {
						b1.x = b2.x + w;
					} else if (b1.x < 0 && b2.x < b1.x) {
						b2.x = b1.x + w;
					}
				} else {
					if (b2.x > viewW && b2.x > b1.x) {
						b2.x = b1.x - w;
					} else if (b1.x > viewW && b1.x > b2.x) {
						b1.x = b2.x - w;
					}
				}
			} else {
				b1.y -= that.speed*that.direction;
				if (b1.y < b2.y) {
					b2.y = b1.y + h;
				} else {
					b2.y = b1.y - h;
				}
				if (that.direction * that.speed > 0) {
					if (b2.y < 0 && b1.y < b2.y) {
						b1.y = b2.y + h;
					} else if (b1.y < 0 && b2.y < b1.y) {
						b2.y = b1.y + h;
					}
				} else {
					if (b2.y > viewH && b2.y > b1.y) {
						b2.y = b1.y - h;
					} else if (b1.y > viewH && b1.y > b2.y) {
						b1.y = b2.y - h;
					}
				}
			}
		}

		this.paused = false;
		this.pause = function(state, time) {
			if (zot(state)) state = true;
			if (zot(time)) time = 0;
			if (state) {
				lastSpeed = that.speed;
				if (time > 0) {
					pausing = true;
					zim.animate({target:that, obj:{pausingSpeed:0}, ticker:false, time:time, call:function() {
						that.speed = 0;
						that.paused = true;
						pausing = false;
						that.dispatchEvent("pause");
					}});
				} else {
					pausing = false;
					that.speed = 0;
					that.paused = true;
					setTimeout(function() {that.dispatchEvent("pause");}, 10);
				}
			} else {
				pausing = false;
				if (time > 0) {
					zim.animate({target:that, obj:{pausingSpeed:lastSpeed}, ticker:false, time:time, call:function() {
						that.speed = lastSpeed;
						that.paused = false;
						pausing = false;
					}});
				} else {
					that.speed = lastSpeed;
					that.paused = false;
				}
			}
			return that;
		}

		Object.defineProperty(that, 'percentSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				if (pausing || that.paused) return;
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		Object.defineProperty(that, 'pausingSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		this.dispose = function() {
			if (zon) zog("bye from Scroller");
			zim.Ticker.remove(zimTicker);
			return true;
		}
	}
	zim.extend(zim.Scroller, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69


/*--
zim.Dynamo = function(sprite, speed, label, startFrame, endFrame, update, reversable)

Dynamo
zim class - extends a createjs EventDispatcher

DESCRIPTION
A Dynamo can run any zim.Sprite animation at varying speeds
You pass in an optional label, or start and end frames to define the animation frames
You can animate a Dynamo using speed or percentSpeed
percentSpeed is handy for animating at speeds relative to other animations and scrollers
You can control Dynamo speeds with mouse position - or in a Parallax object
A Dynamo loops automatically - you can pause it (with optional slowing or optional frame) and unpause it (with optional quickening)
You can also get or set its frame property at which point, it will loop from there (unless paused)
A Dynamo dispatches a change event everytime the frame changes
and a loop event everytime it loops to the start and a paused event when paused

NOTE: A Dynamo can be added to a zim.Accelerator object
this will allow the percentSpeed to be synched with other Scroller and Dynamo objects
See http://zimjs.com/code/zide/

NOTE: Dynamo is an alternative to a zim.Sprite.run() where you provide a set time for animation
but you can pause a Dynamo and then use run() and then unpause the Dynamo when the run is done
If you are controlling the Dynamo in a zim.Ticker.add() function,
then make sure to remove() the Ticker function when the Dynamo is paused

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// we have a sprite of a guy and it has a "walk" animation
// we can make this run faster and slower with an accelerator:
// we pass in a speed of 30 fps and this becomes the baseSpeed

var dynamo = new zim.Dynamo(sprite, 30, "walk");
zim.Ticker.add(function() {
	// the sprite will run at 0 speed when the cursor is at the left of the stage
	// and get faster as the cursor moves to the right
	// at the middle it will be 30 fps and at the right it will be 60 fps
	dynamo.percentSpeed = stage.MouseX/stageW*100*2;
}, stage);

Here we apply damping and make the sprite play backwards at the left of half stage
var dynamo = new zim.Dynamo(sprite, 30, "walk");
zim.Ticker.add(function() {
	// will play backwards at 30 fps at left and forwards at 30 fps at right
	// it will stop at half the stage width
	dynamo.percentSpeed = stage.mouseX/stageW*200 - 100;
}, stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
sprite - the sprite to control
speed - (default 30) the frames per second at which to animate the sprite
label - (default null) the label of the sprite to play (see zim.Sprite)
startFrame - (default 0) the frame to start the animation (ignored if a label is provided)
endFrame - (default sprite.totalFrames) the frame to end the animation (ignored if a label is provided)
update - (default false) set to true to update the stage (only do this if you are not already updating the stage!)
reversable - (default true) will allow percentSpeed to be negative and reverse the animation.  Set to false to use absolute value.

METHODS
pause(state, time, frame) - the way to pause or unpause a Dynamo affecting the sprite animating
	state - (default true) true pauses and setting the state to false will unpause the animation
	time - (default 0) time in milliseconds to slow the animation down if pausing or speed it up if unpausing
	frame - (default null) which frame to pause on - overrides time (unless you want to do the calculation...)
dispose() - cancels the requestAnimationFrame

PROPERTIES
frames - an array of frame numbers the Dynamo is acting on according to label, or startFrame, endFrame
frame - the current frame of the Dynamo - this is sequential relative to frames
	whereas the actual Sprite frame may be different as labels can specify non-consecutive frame numbers
totalFrames - the total frames in frames (may be different than the Sprite's total frames)
percentSpeed - get or set the percentage of the baseSpeed
	this is what you should animate to speed up and slow down the sprite
	this allows you to set the speed relative to other Sprites and Scrollers
speed - get or set the speed of the sprite in frames per second
baseSpeed - the start speed given in frames per second unless changed with this property
	this affects the percentSpeed so usually it is not adjusted - but it can be
paused - read only - whether the Dynamo is paused or not (by using the pause() method)

EVENTS
dispatches a change event when the Dynamo changes frame
dispatches a loop event when the Dynamo loops (possibly in reverse)
dispatches a pause event when the Dynamo is paused - could be delayed
--*///+69.2
	zim.Dynamo = function(sprite, speed, label, startFrame, endFrame, update, reversable) {
		var sig = "sprite, speed, label, startFrame, endFrame, update, reversable";
		var duo; if (duo = zob(zim.Dynamo, arguments, sig, this)) return duo;

		z_d("69.2");
		this.cjsEventDispatcher_constructor();

		var frames = this.frames = sprite.parseFrames(label, startFrame, endFrame, true); // last true is fromDynamo
		if (frames.length == 0) return;
		this.totalFrames = frames.length;
		var _frame = 0; // frame for getter and setter methods
		if (zot(speed)) speed = 30;
		if (zot(reversable)) reversable = true;
		var lastSpeed = this.baseSpeed = this.speed = speed;
		if (zot(update)) update = false;

		var that = this;
		var requestID;
		var speedFactor;
		var lastTime = Date.now();
		var currentTime;
		var wait;
		var endFrameRequest;
		var pausing = false; // for in the act of pausing
		function doDynamo() {
			requestID = requestAnimationFrame(doDynamo);
			speedFactor = frames[_frame].s;
			if (that.speed == 0 || speedFactor == 0) return;
			wait = 1000/Math.abs(that.speed)*speedFactor;
			currentTime = Date.now();
			if (currentTime - lastTime > wait) {
				lastTime = currentTime;
				var nextFrame = that.frame+((that.speed>0 || !reversable)?1:-1);
				var loopCheck = false;
				if (nextFrame >= frames.length) {loopCheck = true; nextFrame = 0;}
				if (nextFrame < 0) {loopCheck = true; nextFrame = frames.length-1;}
				that.frame = nextFrame;
				if (loopCheck) that.dispatchEvent("loop");
				that.dispatchEvent("change");
				if (update && sprite.stage) sprite.stage.update();
				if (!zot(endFrameRequest) && endFrameRequest == that.frame) {
					pausing = false;
					that.speed = 0;
					that.paused = true;
					that.dispatchEvent("pause");
				}
			}
		}
		doDynamo();

		this.paused = false;
		this.pause = function(state, time, frame) {
			if (zot(state)) state = true;
			if (zot(time)) time = 0;
			if (state) {
				lastSpeed = that.speed;
				if (zot(frame)) {
					if (time > 0) {
						pausing = true;
						zim.animate({target:that, obj:{pausingSpeed:0}, ticker:false, time:time, call:function() {
							pausing = false;
							that.speed = 0;
							that.paused = true;
							that.dispatchEvent("pause");
						}});
					} else {
						pausing = false;
						that.speed = 0;
						that.paused = true;
						setTimeout(function() {that.dispatchEvent("pause");}, 10);
					}
				} else {
					pausing = true;
					endFrameRequest = frame;
				}
			} else {
				endFrameRequest = null;
				if (time > 0) {
					pausing = true;
					zim.animate({target:that, obj:{pausingSpeed:lastSpeed}, ticker:false, time:time, call:function() {
						pausing = false;
						that.speed = lastSpeed;
						that.paused = false;
					}});
				} else {
					pausing = false;
					that.speed = lastSpeed;
					that.paused = false;
				}
			}
			return that;
		}

		Object.defineProperty(that, 'frame', {
			get: function() {
				return _frame;
			},
			set: function(frame) {
				_frame = Math.round(frame) % frames.length;
				var f = frames[_frame];
				if (zot(f)) return;
				sprite.frame = f.f;
			}
		});

		Object.defineProperty(that, 'percentSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				if (pausing || that.paused) return;
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		Object.defineProperty(that, 'pausingSpeed', {
			get: function() {
				if (that.baseSpeed == 0) return NaN;
				return that.speed / that.baseSpeed * 100;
			},
			set: function(percent) {
				that.speed = that.baseSpeed * percent / 100;
			}
		});

		this.dispose = function() {
			cancelAnimationFrame(requestID);
		}
	}
	zim.extend(zim.Dynamo, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69.2

/*--
zim.Accelerator = function(objects)

Accelerator
zim class extends a createjs.EventDispatcher

DESCRIPTION
An Accelerator lets you set percentSpeed properties of multiple objects
such as zim.Scroller and zim.Dynamo objects
A Dynamo object is a dynamic controller for a zim.Sprite object
Both the Scroller and the Dynamo can be controlled with percentSpeed
They can also be paused and paused over time
An Accelerator object lets you control these from one place

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// assuming we have scroller1, scroller2 and a sprite
// each of these would have a speed set so the scene animates nicely
var accelerator = new zim.Accelerator([scroller1, scroller2, sprite]);

// here we increase the speed then decrease the speed of the whole scene:
zim.animate({target:accelerator, obj:{percentSpeed:200}, time:1000, rewind:true, ticker:false});

// here we change the speed of the whole scene based on the x position of the mouse
// at the very left, the speed is -200 percent and at the right the speed is 200 percent
// in the center, the speed is 0 - damping is optional but always looks better!
var damp = new zim.Damp(accelerator.percentSpeed);
zim.Ticker.add(function() {
	var newSpeed = (stage.mouseX-stageW/2)/(stageW/2)*100*2;
	accelerator.percentSpeed = damp.convert(newSpeed);
}, stage);
END EXAMPLE

PARAMETERS
objects - (default null) registers zim.Scroller or zim.Dynamo objects the Accelerator
	pass in a single object or an array of multiple objects

METHODS
add(objects) - registers zim.Scroller or zim.Dynamo objects with the Accelerator
	pass in a single object or an array of multiple objects
	returns the Accelerator object for chaining
remove(objects) - unregisters a zim.Scroller or zim.Dynamo
	pass in a single object or an array of multiple objects
	returns the Accelerator object for chaining
pause(state, time, frameNumber) - pause (default) or unpause all the objects added to the Accelerator
	state - (default true) set to false to unpause the objects added to the Accelerator
	time - (default 0) time in milliseconds to slow down to a speed of 0 and pause
		the pause event and paused property will be set after the time has passed
		time is ignored if a frameNumber is provided
	frameNumber - (default null) get sprites to animate to the frameNumber (probably good for one sprite!)
		setting this will make the scene ignore the time parameter above
dispose() - calls dispose() on all the objects

PROPERTIES
percentSpeed - adjusts the speed relative to the baseSpeed of each items in the Accelerator
	this can be dynamically changed to change all speeds relatively
paused - whether the Accelerator is paused or not - only tracks if the pause() method is used
items - an array of all objects added with add()
--*///+69.3
	zim.Accelerator = function(objects) {
		z_d("69.3");
		this.cjsEventDispatcher_constructor();

		var that = this;
		this.paused = false;
		this.items = [];
		this.paused = false;
		this._percentSpeed = 100;
		this.add = function(objects) {
			var list;
			if (Array.isArray(objects)) {list = objects;} else {list = [objects];}
			var ind;
			for (var i=0; i<list.length; i++) {
				ind = that.items.indexOf(list[i]);
				if (ind < 0 && list[i].pause) that.items.push(list[i]);
			}
			return that;
		}
		if (objects) this.add(objects);
		this.remove = function(objects) {
			var list;
			if (Array.isArray(objects)) {list = objects;} else {list = [objects];}
			var ind;
			for (var i=0; i<list.length; i++) {
				ind = that.items.indexOf(list[i]);
				if (ind >= 0) that.items.splice(ind,1);
			}
			return that;
		}
		this.pause = function(state, time, frameNumber) {
			if (zot(state)) state = true;
			var pausingItems = [];
			if (state) {
				if (!zot(frameNumber)) time = null;
				// if we pause the scene with a time delay or frameNumber
				// then the pause may not happen right away
				// so leave the other animations going like scrollers until the pause
				var waiting = false;
				for (var i=0; i<that.items.length; i++) {
					// if time and not totalFrames and scroller - or - dynamo and (time or frameNumber)
					if ((!zot(time) && zot(frameNumber) && !that.items[i].totalFrames) || that.items[i].totalFrames && (!zot(time) || !zot(frameNumber))) {
						that.items[i].pause(true, time, frameNumber); // frameNumber ignored by scroller
						waiting = true;
						pausingItems[i] = 1;
						that.items[i].on("pause", function(){
							if (!that.paused) {
								pauseAll(true);
								that.paused = true;
								that.dispatchEvent("pause");
							}
						}, null, true);
					}
				}
				// not waiting so pause all
				if (!waiting) {
					pauseAll();
					that.paused = true;
					setTimeout(function() {that.dispatchEvent("pause");}, 10);
				}
			} else {
				that.paused = false;
				pauseAll();
			}
			function pauseAll(fromDelay) {
				for (var i=0; i<that.items.length; i++) {
					// pauseAll does not need to pause the ones we were waiting for and are now done...
					if (pausingItems[i] != 1) {
						that.items[i].pause(state);
					}
				}
			}
		}
		Object.defineProperty(that, 'percentSpeed', {
			get: function() {
				return that._percentSpeed;
			},
			set: function(percent) {
				that._percentSpeed = percent;
				for (var i=0; i<that.items.length; i++) {
					that.items[i].percentSpeed = percent;
				}
			}
		});
		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].dispose();
			}
			return true;
		}
	}
	zim.extend(zim.Accelerator, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69.3

/*--
zim.Swiper = function(swipeOn, target, property, sensitivity, horizontal, min, max, damp, integer)

Swiper
zim class - extends a createjs EventDispatcher

DESCRIPTION
Swiper lets you change a property of any object (with damping) by swiping.
In a sense, it is like an invisible Slider.
You pass in the DisplayObject to swipe on - stage, Container, Bitmap, etc.
You pass in which object holds the property to animate and the property name.
Then Swiper will change this property with damping based on a sensitivity you set.
You can use horizontal or vertical but to do both, you need to make two Swiper objects.
Originally made for controlling 3D objects like rotation and scale
based on swiping a rectangle beneath the 3D object that is the same color as the stage.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle(100, frame.green).center(stage);
// will move circle twice as fast as swipe
var swiper = new zim.Swiper(stage, circle, "x", 2);

var man = new zim.Rectangle(50, 100, frame.brown).center(stage);
// will move man up an down slowly within vertical bounds of stage
var swiper = new zim.Swiper(man, man, "y", .5, false, 0, stageH-man.height);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
swipeOn - the DisplayObject to swipe on such as the stage or a Rectangle or Bitmap, etc.
target - the object that holds the property that you want to change
property - the property name as a String to change when swiping
sensitivity - (default 1) the change in property is equal to the change in distance times the sensitivity
	set to 2 to change the property twice as fast as the swipe
	set to .5 to change the property half as fast as the swipe
	set to .001 to change the property very little while swiping
	set to -1 to go the opposite way (or -2, -.5, -.001, etc.)
horizontal - default(true) set to false for vertical swiping (y)
min - (default null) if specified, the property value will not go below this number
max - (default null) if specified, the property value will not go above this number
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
integer - (default false) set to true to round the property value

METHODS
immediate(val) - set the damping immediately to this value to avoid damping to value
dispose() - remove listeners and Ticker

PROPERTIES
target - get or set the target for the property that you are changing
property - get or set the String property name that is being damped
desiredValue - the current value that the swiper is damping towards
enabled (default true) - set to false to disable the Swiper and visa versa

EVENTS
dispatches a swipedown event when swipe is started
dispatches a swipemove event when swipe is moving
dispatches a swipeup event when swipe is ended
--*///+69.5
	zim.Swiper = function(swipeOn, target, property, sensitivity, horizontal, min, max, damp, integer) {
		var sig = "swipeOn, target, property, sensitivity, horizontal, min, max, damp, integer";
		var duo; if (duo = zob(zim.Swiper, arguments, sig, this)) return duo;
		z_d("69.5");

		this.cjsEventDispatcher_constructor();

		if (zot(swipeOn) || !swipeOn.getStage || !swipeOn.stage) {zog("zim.Swiper() - please provide container on stage"); return;}
		if (zot(target)) return;
		if (zot(sensitivity)) sensitivity = 1;
		if (zot(horizontal)) horizontal = true;
		if (zot(damp)) damp = .1;
		if (zot(integer)) integer = false;

		var that = this;
		var container = swipeOn;
		var startPos;
		var startVal;
		var desiredVal = that.desiredValue = target[property];
		var stage;
		this.target = target;
		this.property = property;
		var downEvent;
		var moveEvent;
		var upEvent;
		if (container.canvas) {
			downEvent = container.on("stagemousedown", function() {
				downHandler();
				moveEvent = container.on("stagemousemove", pressHandler);
				upEvent = container.on("stagemouseup", function() {
					container.off("stagemousemove", moveEvent);
					container.off("stagemouseup", upEvent);
					that.dispatchEvent("swipeup");
				});
			});
			stage = container;
		} else {
			stage = container.stage;
			downEvent = container.on("mousedown", downHandler);
			moveEvent = container.on("pressmove", pressHandler);
			upEvent = container.on("pressup", function() {
				that.dispatchEvent("swipeup");
			});
		}
		function downHandler() {
			startPos = horizontal?stage.mouseX:stage.mouseY;
			startVal = that.target[that.property];
			that.dispatchEvent("swipedown");
		}
		function pressHandler() {
			var diff = startPos-(horizontal?stage.mouseX:stage.mouseY);
			desiredVal = startVal - diff*sensitivity;
			if (!zot(min)) desiredVal = Math.max(desiredVal, min);
			if (!zot(max)) desiredVal = Math.min(desiredVal, max);
			that.desiredValue = desiredVal;
			that.dispatchEvent("swipemove");
		};
		var swiperDamp = new zim.Damp(that.target[that.property]);
		var ticker = zim.Ticker.add(function() {
			that.target[that.property] = integer?Math.round(swiperDamp.convert(desiredVal)):swiperDamp.convert(desiredVal);
		}, stage);

		this.immediate = function(val) {
			swiperDamp.immediate(val);
			that.target[that.property] = integer?Math.round(val):val;
			that.desiredValue = desiredVal = val;
		}

		var _enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return _enabled;
			},
			set: function(value) {
				if (_enabled == value) return;
				if (value) {
					enable();
				} else {
					disable();
				}
				_enabled = Boolean(value);
			}
		});

		function disable() {
			if (container.canvas) {
				container.off("stagemousedown", downEvent);
				container.off("stagemousemove", moveEvent);
				container.off("stagemouseup", upEvent);
			} else {
				container.off("mousedown", downEvent);
				container.off("pressmove", moveEvent);
				container.off("pressup", upEvent);
			}
			zim.Ticker.remove(ticker);
		}

		function enable() {
			if (container.canvas) {
				container.on("stagemousedown", downEvent);
			} else {
				container.on("mousedown", downEvent);
				container.on("pressmove", moveEvent);
				container.on("pressup", upEvent);
			}
			zim.Ticker.add(ticker, stage);
		}

		this.dispose = function() {
			disable();
			swiperDamp = null;
		}
	}
	zim.extend(zim.Swiper, createjs.EventDispatcher, null, "cjsEventDispatcher", false);
	//-69.5

/*--
zim.MotionController = function(container, target, type, speed, axis, rect, map, diagonal, damp, flip, moveThreshold, stickThreshold)

MotionController
zim class - extends a createjs EventDispatcher

DESCRIPTION
MotionController lets you control an object (target) in a container (like the stage)
with "mousedown", "mousemove", "keydown", "gamebutton", "gamestick" or "manual" modes (types)
For instance, you can control a player in a game or a butterfly in field

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new zim.Circle(40, frame.green).center(stage);
var controller = new zim.MotionController(stage, circle); // circle moves to mouse press position with damping

var rect = new zim.Rectangle(50, 30, frame.green).centerReg(stage);
var controller = new zim.MotionController({
	container:stage,
	target:rect,
	type:"keydown",
	diagonal:true,
	damp:.1,
	rotate:true
});

SEE: http://zimjs.com/code/controller for more examples
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - the Container the target is in - the stage is most likely fine
	this must be on the stage (or be the stage) when the MotionController is made
target - the object you want to control
	if you only want data from the MotionController you can leave the target parameter as null (don't include it)
type - (default "mousedown") by default will move to where you press in the container
	set to "mousemove" to have the target follow the mouse movement
	set to "keydown" to use keys to control the target (see map parameter)
	set to "gamebutton" to use gamepad buttons to control the target (see map parameter)
	set to "gamestick" to use gamepad stick(s) to control the target (see map parameter)
	set to "swipe" to use swipe to control the target
	set to "manual" to set your own with myController.convert() or myController.x and myController.y properties
speed - (default 7) pixels it will move each tick, keypress buttonpress, swipe, etc.
axis - (default "both") or "horizontal" or "vertical" (see diagonal parameter)
rect - (default null) a createjs.Rectangle or object with x, y, width and height properties
	the registration point of the target will stay within these bounds
map - (default null) an Array with left, right, up, down values (or array of values) as outlined below
 	- (default [[65,37], [68,39], [87,38], [83,40]] when type == "keydown") these are ADWS and arrows
	- (default [14, 15, 12, 13] when type == "gamebutton") these are DPAD_LEFT, DPAD_RIGHT, DPAD_UP, DPAD_DOWN on a gamepad
	- (default [14, 15, 7, 6] when type == "gamebutton" and firstPerson == true) these are DPAD_LEFT, DPAD_RIGHT, RT, LT on a gamepad
	- (default [0, 0, 1, 1] when type == "gamestick") these are LSX, LSX, LSY, LSY on a gamepad
	- (default [[0,2], [0,2], [1], [1]] when type == "gamestick" and firstPerson == true) turn with left or right stick X, advance with left stick Y
		use [[0,2], [0,2], [1,3], [1,3]] for both sticks (first stick motion overrides second stick)
		Note: MotionController will only use the 0 and the 2 index for speed as the sticks use -1 to 1 values
		so you could not go only left with one stick and only right with another
		Note: stick values may exceed -1 and 1 on occasion (see also stickThreshold)
diagonal - (default true) set to false to lock movement to horizontal or vertical only
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
flip - (default null) set to "horizontal", "vertical" or "both" to flip the target when in negative direction
rotate - (default false) set to true to rotate - starts facing right and rotates in direction of movement
constant - (default false) set to true to remove keyup or gamebutton up and always move in direction last key or button press
firstPerson - (default false) set to true for keydown, gamebutton and gamecontroller to go to first person mode
	in firstPerson, the direction starts facing up and by default up arrow is speed forward and left and right change rotation
	speed will be damped by damp parameter - also, map parameter changes if in firstPerson mode - see map parameter
turnSpeed - (default speed*.4) - the speed for turning in firstPerson mode - will be damped but damp parameter
moveThreshold - (default 5) pixels negative or positive to treat damped motion as stopped
stickThreshold - (default .2) gamepad stick axes values are from -1 to 1 but there is a lot of noise
	so consider within +- stickThreshold as no motion 0


METHODS
immediate(x, y) - set the damping immediately to this value to avoid damping to value
convert(x, y) - for manual mode, pass in x and y and damping and rotation will be calculated
dispose() - remove listeners and Ticker, Swiper and GamePad, where applicable

PROPERTIES
target - the target for the property that you are controlling
x - the desired x position of the target before damping is applied (use this for manual imput - or convert() method)
y - the desired y position of the target before damping is applied (use this for manual imput - or convert() method)
dirX - the x direction the player is moving
dirY - the x direction the player is moving
rotation - read only rotation of the player in degrees
scaleX - read only scaleX of player (to get flip data if only using controller for data)
scaleY - read only scaleY of player (to get flip data if only using controller for data)
dampX - reference to the horizonal Damp object
dampY - reference to the vertical Damp object
speed - the speed setting which will be multiplied by direction
turnSpeed - the turn speed for firstPerson mode
axis - the axis (horizontal, vertical or both);
moving - get Boolean as to whether the target is moving (within moveThreshold)
movingX - get Boolean as to whether the target is moving in x direction (within moveThreshold)
movingY - get Boolean as to whether the target is moving in y direction (within moveThreshold)
gamepad - reference to GamePad object if applicable - allows you to use this for more events like jumping, shooting, etc.
moveThreshold - the maximum value (+-) within which movement is considered stopped
stickThreshold - the maximum value (+-) within which the gamepad stick axes values are considered 0
enabled - set to false to disable or true to enable MotionController - can toggle with enabled = !enabled

EVENTS
dispatches a change event with dir as property of event object
	that will hold "left", "right", "up", "down", null (no direction)
--*///+69.7

	zim.MotionController = function(container, target, type, speed, axis, rect, map, diagonal, damp, flip, rotate, constant, firstPerson, turnSpeed, moveThreshold, stickThreshold) {
		var sig = "container, target, type, speed, axis, rect, map, diagonal, damp, flip, rotate, constant, firstPerson, turnSpeed, moveThreshold, stickThreshold";
		var duo; if (duo = zob(zim.MotionController, arguments, sig, this)) return duo;
		z_d("69.7");

		this.cjsEventDispatcher_constructor();
		if (zot(container) || !container.getStage) {zog("zim Controller(): Please pass in a reference to a container as first parameter");	return;}
		if (zot(container.stage)) {zog("zim Controller(): The Container must be on the stage"); return;}
		var stage = container.stage;
		if (zot(target)) {target = new zim.Container(1,1);} // make a surrogate if only wanting controller data
		if (zot(speed)) speed = 7;
		if (zot(type) || (type != "mousemove" && type != "keydown" && type != "gamebutton" && type != "gamestick" && type != "swipe" && type != "manual")) type = "mousedown";
		if (zot(axis)) axis = "both"; // horizontal, vertical, both
		if (type == "keydown" && zot(map)) map = [[65,37], [68,39], [87,38], [83,40]] // left right up down
		if (type == "gamebutton" && zot(map)) {
			if (firstPerson) {
				map = [14, 15, zim.GamePad.RT, zim.GamePad.LT] // DPAD_LEFT, DPAD_RIGHT, RT, LT on gamepad
			} else {
				map = [14, 15, 12, 13] // DPAD_LEFT, DPAD_RIGHT, DPAD_UP, DPAD_DOWN on gamepad
			}
		}
		if (type == "gamestick" && zot(map)) {
			if (firstPerson) {
				map = [[0,2], [0,2], [1], [1]]; // TURN: LSX or RSX, LSX or RSX, SPEED: LSY, LSY - on gamepad
			} else {
				map = [0, 0, 1, 1]; // LSX, LSX, LSY, LSY - Left Stick on gamepad
			}
		}

		if (type == "gamestick" && zot(map)) map = [0, 0, 1, 1]; // LSX, LSX, LSY, LSY - Left Stick on gamepad
		if (zot(diagonal)) diagonal = true;
		if (axis == "horizontal" || axis == "vertical") diagonal = false;
		if (zot(damp)) damp = (type=="keydown" || type=="gamebutton") ? 1:.1;
		if (zot(firstPerson)) firstPerson = false;
		if (zot(turnSpeed)) turnSpeed = speed * .4;
		if (zot(moveThreshold)) moveThreshold = 4;
		if (zot(stickThreshold)) stickThreshold = .2;

		var that = this;
		this.dirX = 0;
		this.dirY = 0;
		this.speed = speed;
		this.turnSpeed = turnSpeed;
		this.axis = axis;
		this.target = target;
		this.moveThreshold = moveThreshold;
		this.stickThreshold = stickThreshold;

		var speedX = that.speed; // speedX and speedY hold proportioned speed based on angle
		var speedY = that.speed;
		var flipRotation = 0; // records if we need to adjust rotation if flipped
		that.rotation = 0; // holds the pre-damped angle of the target
		that.x = this.target.x; // holds the pre-damped x and y position of the target
		that.y = this.target.y;

		var originalScaleX = that.scaleX = target.scaleX;
		var originalScaleY = that.scaleY = target.scaleY;

		// INPUTS
		// set up collecting the desired x and y based on various inputs:
		// keydown, gamebutton
		// mousedown, mousemove
		// gamestick
		// swipe
		// otherwise the setting is manual and MotionController x and y can be provided through calculate(x,y) method

		if (type == "keydown" || type == "gamebutton") {

			// which keys or buttons handle left, right, up, down are provided by the map parameter
			// this can be either a number or an array of numbers
			// so normalize this to always hold an array
			for (var i=0; i<4; i++) {
				if (!Array.isArray(map[i])) map[i] = [map[i]];
			}
			var down = [0,0,0,0];
			var ord = []; // order the keys are pressed - so when we release, we can set to last currently pressed key
			var way = ["X","X","Y","Y"];
			var dir = [-1,1,-1,1];
			var names = ["left","right","up","down"];
			var rots = [-180,0,-90,90];
			var d = {dirX:0, dirY:0}; // local directions for key and button - this.dirX and this.dirY are used in Ticker

			if (type == "keydown") {
				var keydownEvent = frame.on("keydown", doDown);
			} else {
				var gamepad = that.gamepad = new zim.GamePad();
				var buttondownEvent = gamepad.on("buttondown", doDown);
			}
			function doDown(e) {
				var key = type=="keydown"?e.keyCode:e.buttonCode;
				var inOrd;
				for (i=0; i<4; i++) {
					if (map[i].indexOf(key) > -1) {
						if (!diagonal && that.axis=="both") d.dirX = d.dirY = 0;
						d["dir"+way[i]] = dir[i];
						down[i] = 1;
						inOrd = ord.indexOf(i);
						if (inOrd == 0) return; // already last pressed
						if (inOrd > 0) ord.splice(inOrd,1); // take key out if already down
						ord.unshift(i); // add index to start of ord array
						return;
					}
				}
			}
			if (zot(constant)) {
				if (type == "keydown") {
					var keyupEvent = frame.on("keyup", doUp);
				} else {
					var buttonupEvent = gamepad.on("buttonup", doUp);
				}
			}
			function doUp(e) {
				var key = type=="keydown"?e.keyCode:e.buttonCode;
				var inOrd;
				for (i=0; i<4; i++) {
					if (map[i].indexOf(key) > -1) {
						down[i] = 0;
						inOrd = ord.indexOf(i);
						if (inOrd >= 0) ord.splice(inOrd,1);
						if (that.axis != "both" || diagonal) { // either just one direction or can have both dirX and dirY
							d["dir"+way[i]] = -down[Math.floor(i/2)*2] +down[Math.floor(i/2)*2+1]; // the other might be down
						} else { // only use last pressed key for dirX or dirY but not both
							if (ord.length > 0) {
								d["dir"+way[i]] = 0;
								var iOrd = ord[0];
								d["dir"+way[iOrd]] = dir[iOrd];
							} else {
								d.dirX = d.dirY = 0;
							}
						}
						return;
					}
				}
			}
			// use a ticker to position the desired x and y properties
			// we will then tween to these properties in the mainTicker later
			var first = {rotation:0, speedX:that.speed, speedY:that.speed};
			var keyTicker = zim.Ticker.add(function() {
				if (firstPerson) {doFirstPerson(d); return;}
				var sX = that.speed;
				var sY = that.speed;
				if (that.axis == "both" && d.dirX != 0 && d.dirY != 0) {
					var trig = doTrig(d.dirX, d.dirY); // note - keys need to place desired x and y in a unit manner (or else target never goes anywhere)
					sX = trig.speedX;
					sY = trig.speedY;
				}
				if (that.axis == "horizontal" || that.axis == "both") {
					that.x += sX * d.dirX;
				}
				if (that.axis == "vertical" || that.axis == "both") {
					that.y += sY * d.dirY;
				}
				calculate();
			}, stage);
		} else if (type == "mousedown" || type == "mousemove") {
			var mouseEvent = stage.on("stage" + type, function(){
				var p = container.globalToLocal(stage.mouseX, stage.mouseY);
				that.x = p.x; that.y = p.y;
				calculate();
			});
		} else if (type == "gamestick") {
			var gamepad = this.gamepad = new zim.GamePad();
			for (var i=0; i<4; i++) { // make map hold arrays
				if (!Array.isArray(map[i])) map[i] = [map[i]];
			}
			var first = {rotation:0, speedX:that.speed, speedY:that.speed};
			var stickEvent = gamepad.on("data", function(e) {

				var d = {dirX:0, dirY:0};
				// map = [[0,2], [0,2], [1,3], [1,3]]
				for (var i=0; i<map[0].length; i++) {
					var a = e.axes[map[0][i]];
					if (Math.abs(a) > that.stickThreshold) {
						d.dirX = a;
						break;
					}
				}
				for (var i=0; i<map[2].length; i++) {
					var a = e.axes[map[2][i]];
					if (Math.abs(a) > that.stickThreshold) {
						d.dirY = a;
						break;
					}
				}

				if (firstPerson) {doFirstPerson(d); return;}

				that.x += that.speed*d.dirX;
				that.y += that.speed*d.dirY;
				calculate();
			});
		} else if (type == "swipe") {
			var swiperX = new zim.Swiper(stage, that, "x", .8);
			var swiperY = new zim.Swiper(stage, that, "y", .8, false);
			var swiperEvent = swiperX.on("swipemove", function() {
				calculate();
			});
		}

		function doFirstPerson(d) {
			first.rotation += d.dirX * that.turnSpeed;
			that.rotation = first.rotation;
			first.speedX = Math.sin(first.rotation*Math.PI/180) * that.speed * -d.dirY;
			first.speedY = - Math.cos(first.rotation*Math.PI/180) * that.speed * -d.dirY;
			that.x += first.speedX;
			that.y += first.speedY;
			return;
		}

		// CALCULATE
		// each input calls calculate to determine the angle of direction
		// and the speed along each axis, speedX and speedY
		function calculate() {

			// trig() returns an object with speedX, speedY and rotation properties
			var diffX = that.x-that.target.x;
			var diffY = that.y-that.target.y;
			var trig = doTrig(diffX, diffY);

			speedX = trig.speedX;
			speedY = trig.speedY;

			if (!rotate) return;
			that.rotation = trig.angle;
			if (zot(that.rotation)) {
				that.rotation = that.target.rotation;
				return; // when no motion purposely left null so stopped target keeps rotation
			}

			that.rotation += flipRotation; // if flipped we need to add 180 to rotation

			// make sure angle damps to shortest direction - this is tricky
			var newR = normalizeAngle(that.rotation);
			var oldR = that.target.rotation = normalizeAngle(that.target.rotation);
			if (Math.abs(newR-oldR) > 180) {
				if (oldR > newR) {
					oldR -= 360; // put current rotation behind new rotation so damps clockwise
				} else {
					newR -= 360; // put new rotation behind current rotation so damps counterclockwise
				}
			}
			that.dampR.immediate(oldR); // required otherwise damping equation has mind of its own
			that.target.rotation = oldR; // make sure to set this again as we may have changed oldR for proper rotational direction when damped
			that.rotation = newR;
		}
		function normalizeAngle(a) {
			return (a % 360 + 360) % 360;
		}
		function doTrig(diffX, diffY) {
			var sX = that.speed;
			var sY = that.speed;
			var sA; // keep angle null if no movement - so that last rotation during movement is kept when movement stops
			var hyp = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
			if (hyp > 0) {
				sX = Math.abs(diffX) / hyp * that.speed;
				sY = Math.abs(diffY) / hyp * that.speed;
				sA = 90 - Math.atan2(diffX, diffY)*180/Math.PI;
			}
			return {speedX:sX, speedY:sY, angle:sA};
		}


		// TICKER FOR ALL
		// damp movement and rotation to desired x and y

		var tempX = this.x = this.target.x;
		var tempY = this.y = this.target.y;
		this.dampX = new zim.Damp(tempX, damp);
		this.dampY = new zim.Damp(tempY, damp);
		this.dampR = new zim.Damp(this.target.rotation, damp);
		var lastDirX=0;
		var lastDirY=0;

		var mainTicker = zim.Ticker.add(function() {
			if (rect) {
				that.x = zim.constrain(that.x, rect.x, rect.x+rect.width);
				that.y = zim.constrain(that.y, rect.y, rect.y+rect.height);
			}
			// tempX and tempY head towards the desired x and y
			// at the speed set by calculate and in the direction it needs to go calculated here
			// we then damp the actual motion using the dampX or dampY zim.Damp object's convert method
			if (that.axis == "horizontal" || that.axis == "both") {
				that.dirX = zim.sign(that.x-tempX);
				if (Math.abs(that.x-tempX) < speedX) {
					tempX = that.x;
				} else {
					tempX += that.dirX*speedX;
				}
				that.target.x = that.dampX.convert(tempX);
			}
			if (that.axis == "vertical" || that.axis == "both") {
				that.dirY = zim.sign(that.y-tempY);
				if (Math.abs(that.y-tempY) < speedY) {
					tempY = that.y;
				} else {
					tempY += zim.sign(that.y-tempY)*speedY;
				}
				that.target.y = that.dampY.convert(tempY);
			}

			// check for last direction change and dispatch event and flip if necessary
			if (that.dirX != lastDirX || that.dirY != lastDirY) {
				var e = new createjs.Event("change");
				if (that.dirX != lastDirX) {
					var options = ["left", null, "right"];
					e.dir = options[that.dirX+1];
					lastDirX = that.dirX;
					if (flip == "horizontal" || flip == "both") {
						that.scaleX = target.scaleX = that.dirX?Math.abs(target.scaleX)*that.dirX:target.scaleX;
						if (originalScaleX != 0 && Math.round(that.scaleX/originalScaleX) == -1) {
							flipRotation = 180;
						} else {
							flipRotation = 0;
						}
					}
				} else {
					var options = ["up", null, "down"];
					e.dir = options[that.dirY+1];
					lastDirY = that.dirY;
					if (flip == "vertical" || flip == "both") {
						that.scaleY = target.scaleY = that.dirY?Math.abs(target.scaleY) * that.dirY:target.scaleY;
						// not sure why this breaks flip?
						// if (originalScaleY != 0 && Math.round(that.scaleY/originalScaleY) == -1) {
						// 	flipRotation = 180;
						// } else {
						// 	flipRotation = 0;
						// }
					}
				}
				that.dispatchEvent(e);
			}

			// set moving properties
			that.movingX = Math.abs(tempX-that.target.x) > that.moveThreshold;
			that.movingY = Math.abs(tempY-that.target.y) > that.moveThreshold;
			that.moving = that.movingX || that.movingY

			// damp the rotation - but not if the angle is null which happens when no movement
			// this keeps the last angle during movement rather than setting it to 0 which is not right
			if (rotate && !zot(that.rotation)) {
				that.target.rotation = that.dampR.convert(that.rotation);
			}

		}, stage);


		this.immediate = function(x,y,r) {
			if (!zot(x) && that.dampX) {
				that.dampX.immediate(x);
				that.x = that.target.x = tempX = x;
				if (swiperX) swiperX.immediate(x);
			}
			if (!zot(y) && that.dampY) {
				that.dampY.immediate(y);
				that.y = that.target.y = tempY = y;
				if (swiperY) swiperY.immediate(y);
			}
			if (!zot(r) && that.dampR) {
				that.dampR.immediate(r);
				that.rotation = that.target.rotation = r;
			}
		}

		this.convert = function(x,y) {
			if (!zot(x)) that.x = x;
			if (!zot(y)) that.y = y;
			calculate();
		}

		var _enabled = true;
		Object.defineProperty(that, 'enabled', {
			get: function() {
				return _enabled;
			},
			set: function(value) {
				if (_enabled == value) return;
				if (value) {
					enable();
				} else {
					disable();
				}
				_enabled = Boolean(value);
			}
		});
		function enable() {
			if (type == "keydown") {
				frame.on("keydown", keydownEvent);
				frame.on("keyup", keyupEvent);
				zim.Ticker.add(keyTicker, stage);
			} else if (type == "gamebutton") {
				gamepad.on("buttondown", buttondownEvent);
				gamepad.on("buttonup", buttonupEvent);
				zim.Ticker.add(keyTicker, stage);
			} else if (type == "gamestick") {
				gamepad.on("data", stickEvent);
			} else if (type == "swipe") {
				swiperX.enabled = true;
				swiperY.enabled = true;
				swiperX.on("swipemove", swiperEvent);
			} else if (type == "mousedown" || type == "mousemove") {
				stage.on("stage" + type, mouseEvent);
			}
			zim.Ticker.add(mainTicker, stage);
		}
		function disable() {
			if (type == "keydown") {
				frame.off("keydown", keydownEvent);
				frame.off("keyup", keyupEvent);
				zim.Ticker.remove(keyTicker);
			} else if (type == "gamebutton") {
				gamepad.off("buttondown", buttondownEvent);
				gamepad.off("buttonup", buttonupEvent);
				zim.Ticker.remove(keyTicker);
			} else if (type == "gamestick") {
				gamepad.off("data", stickEvent);
			} else if (type == "swipe") {
				swiperX.enabled = false;
				swiperY.enabled = false;
				swiperX.off("swipemove", swiperEvent);
			} else if (type == "mousedown" || type == "mousemove") {
				stage.off("stage" + type, mouseEvent);
			}
			zim.Ticker.remove(mainTicker);

		}
		this.dispose = function() {
			disable();
			if (gamepad) gamepad.dispose();
			if (swiperX) swiperX.dispose();
			if (swiperY) swiperX.dispose();
		}

	}
	zim.extend(zim.MotionController, createjs.EventDispatcher, "enabled", "cjsEventDispatcher");
	//-69.7

/*--
zim.GamePad = function()

GamePad
zim class - extends a createjs EventDispatcher

DESCRIPTION
GamePad connects to Game Controllers as inputs using the HTML navigator.getGamepads API
Dispatches buttondown and buttonup events for the following common buttons:

"A","B","X","Y", (or for Triangle, Circle, Cross and Square)
"LB","RB","LT","RT", (for left bumper, right bumper, left trigger, right trigger)
"BACK","START",
"LS","RS", (for left stick press, right stick press)
"DPAD_UP","DPAD_DOWN","DPAD_LEFT","DPAD_RIGHT"

The event object will have a button property telling which button is pressed using the string values above
Dispatches a data event constantly to get axes data for the sticks (and constant data for the buttons)
The event object in this case will have axes and buttons properties
The axes property is an array of four numbers for the left and right stick's x and y properies (-1 to 1)

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var gamepad = new zim.GamePad();
gamepad.on("buttondown", function(e) {
	// only fires once per button press (unlike constant keydown event)
	zog(e.button); // LT for instance for Left trigger
	if (e.button == "LT") {
		zog("left trigger is down");
	}
	zog(e.buttonCode); // 6
	if (e.buttonCode == zim.GamePad.LT) {
		zog("another way to do catch left trigger down");
	}
});

gamepad.on("buttonup", function(e) {
	zog(e.button); // LT for instance for Left trigger
}

gamepad.on("data", function(e) {
	// fires constantly in a requestAnimationFrame
	zog(e.axes[0]); // left stick x or horizontal data from -1 to 1 (lots of decimal noise)
	zog(e.axes[zim.GamePad.LTX]); // another way of accessing left stick x
	zog(e.buttons[9]); // true or false depending on if the START button is pressed
	zog(e.buttons[zim.GamePad.START]); another way to find if the START button is pressed
});
END EXAMPLE

METHODS
dispose() - removes all listeners and cancels requestAnimationFrame

PROPERTIES
connected - Boolean true if connected and false if not connected (may need to press key, etc)
currentIndex - get or set the index of the controller
	gives multiple controller support - make two GameController objects and set different indexes
data - object that holds buttons (raw data - slightly different than buttons below) and axes properties
buttons - an array of Booleans as to whether the button is pressed
	the order of the buttons match the order of the constants below
constants: A,B,X,Y,LB,RB,LT,RT,BACK,START,LS,RS,DPAD_UP,DPAD_DOWN,DPAD_LEFT,DPAD_RIGHT
	zim.GamePad.A == 0
	zim.GamePad.B == 1, etc. up to
	zim.GamePad.DPAD_RIGHT == 15
axes - an array of four stick values from -1 to 1
	for left x and y and right x and y values (or horizontal and vertical values)
constants: LSX,LSY,RSX,RSY
	zim.GamePad.LSX == 0
	zim.GamePad.LSY == 1
	zim.GamePad.RSX == 2
	zim.GamePad.RSY == 3

EVENTS
dispatches a gamepadconnected and gamepaddisconnected when connected and disconnected
	these have an event object with index and id properties - the index and id may not work in chrome
dispatches a buttondown event with button and buttonCode properties
dispatches a buttonup event with button and buttonCode properties
dispatches a data event with axes and buttons array properties
	these can be handled as outlined in the description and examples
--*///+69.8

	zim.GamePad = function() {
		z_d("69.8");

		this.cjsEventDispatcher_constructor();
		if (!navigator.getGamepads) {this.error = true; if (zon) {zog("zim.GamePad() - no browswer support");} return;} // if no gamepad support
		var processPad;
		window.addEventListener("gamepadconnected", init);
		this.currentIndex = 0;
		var that = this;
		function init(eventObject) {
			that.connected = true;
			dispatch("gamepadconnected", eventObject);
			var startData = navigator.getGamepads()[that.currentIndex];
			that.lastData = [];
			for (var i=0; i<startData.buttons.length; i++) {
				that.lastData[i] = startData.buttons[i].pressed;
			}
			function doPad() {
				processPad = requestAnimationFrame(doPad);
				that.data = navigator.getGamepads()[that.currentIndex];
				if (!that.data) return;
				var pressed = false;
				var currentData = that.buttons = [];
				for (var i=0; i<that.data.buttons.length; i++) {
					currentData[i] = that.data.buttons[i].pressed;
					if (currentData[i] != that.lastData[i]) {
						that.lastData[i] = currentData[i];
						if (currentData[i]) {
							// button was up and now is down
							// chose to dispatch only once unlike a keydown
							// if we want constant data then use data event and e.buttons
							var e = new createjs.Event("buttondown");
						} else {
							var e = new createjs.Event("buttonup");
						}
						e.buttonCode = i;
						e.button = gamePadButtons[i];
						that.dispatchEvent(e);
					}
				}
				var e = new createjs.Event("data");
				e.axes = that.axes = that.data.axes;
				e.buttons = that.buttons;
				that.dispatchEvent(e);
			}
			doPad();
		}
		var gamepadCheck = setInterval(function() { // for chrome
			if (navigator.getGamepads && navigator.getGamepads()[0]) {
				if (!that.connected) init();
				clearInterval(gamepadCheck);
			}
		}, 500);
		function dispatch(type, eventObject) {
			var e = new createjs.Event(type);
			e.index = eventObject.gamepad.index;
			e.id = eventObject.gamepad.id;
			e.buttons = eventObject.gamepad.buttons;
			e.axes = eventObject.gamepad.axes;
			that.dispatchEvent(e);
		}
		var disconnectEvent = window.addEventListener("gamepaddisconnected", function(e) {
			if (e.gamepad.index == that.currentIndex) {
				cancelAnimationFrame(processPad);
				connected = false;
				that.dispatchEvent("gamepaddisconnected");
			}
		});
		this.dispose = function() {
			window.removeEventListener("gamepadconnected", init);
			window.addEventListener("gamepaddisconnected", disconnectEvent);
			cancelAnimationFrame(processPad);
			clearInterval(gamepadCheck);
			that.connected = false;
		}
	}
	var gamePadButtons = ["A","B","X","Y","LB","RB","LT","RT","BACK","START","LS","RS","DPAD_UP","DPAD_DOWN","DPAD_LEFT","DPAD_RIGHT"];
	for (var i=0; i<gamePadButtons.length; i++) zim.GamePad[gamePadButtons[i]] = i;
	var gamePadAxes = ["LSX","LSY","RSX","RSY"];
	for (i=0; i<gamePadAxes.length; i++) zim.GamePad[gamePadAxes[i]] = i;
	zim.extend(zim.GamePad, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-69.8

/*--
zim.Emitter = function(obj, width, height, interval, num, life, fade, shrink, decayTime, decayStart, trace, traceFadeTime, traceShiftX, traceShiftY, angle, force, gravity, wind, layers, animation, random, horizontal, vertical, sink, sinkForce, cache, events, startPaused, pool, poolMin)

Emitter
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A particle emitter - so this makes and animates display objects like shapes or bitmaps
Particle emitters are often used for things like fireworks, fire, smoke, sparks, falling objects, etc.
The zim.Emitter is filled with options so have a look at the doc parameters
Here are some examples:
http://zimjs.com/code/particles/

NOTE: consider the Emitter as somewhat experimental and pushing the bounds of the canvas
In future versions we will look into addin CreateJS StageGL (WebGL) examples / support (it might work already)
The Emitter certainly can make excellent and workable effects
But it can also bog the browser if pushed to extremes or sometimes if left going
This possibly means there are memory leaks - we have been doing our best to track things down
The Emitter is reporting an expected number of children so any leaks might be beyond ZIM control

NOTE: each particle starts at the center of the container width and height
If the trace parameter is true then the particle is put in a container that does not move
and the particle moves inside that container as the container is cached with the source-over composite operation
The currentParticle property and all the event objects' particle parameter is the moving particle
However, the children of the Emitter, will be slightly different in each case:
when trace is false, the children of the Emitter container are any active particles
when trace is true, the children of the Emitter container are the containers that hold the active particles
If you have moved, scaled or rotated the Emitter or its container,
then you will want to use var point = myEmitter.localToGlobal(particle.x, particle.y)
and get point.x and point.y to find the location of the particle relative to the stage coordinates

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// eg.1 make a bunch of spewing pink circles affected by gravity
var emitter = new zim.Emitter(new zim.Circle(5, frame.pink))
	.centerReg(stage);

// eg.2 use a sink to attract the particles
var sink = new zim.Circle(10, frame.pink).centerReg(stage).alp(0);
// make one of three types of particles and randomize the colors
var particles = new zim.Emitter({
	obj:[
		new zim.Circle(20,null,frame.darker,2),
		new zim.Rectangle(30,30,null,frame.darker,2),
		new zim.Triangle(40,40,40,null,frame.darker,2)
	],
	random:{color:[frame.blue, frame.green, frame.pink, frame.yellow, frame.orange]},
	interval:20, // default
	life:5000,
	decayTime:1000, // default
	sink:sink,
	sinkForce:.5,
	gravity:0,
	force:1,
	cache:zim.mobile(), // default
})
	.centerReg(stage)
	.scale(2);

// eg. 3 use a StageGL Frame and createjs.SpriteSheetBuilder for circles:
var frame = new zim.Frame({scale:"fit", width:1024, height:768, gpu:true});
frame.on("ready", function() {
	var stage = frame.stage;
	// if we pass in just a zim.Circle then we would have to turn on cache
	// and cache on WebGL counts as an image for each one
	// whereas a SpriteSheet just counts as an image for all of the particles
	// so build a SpriteSheet from the Circle
	var builder = new createjs.SpriteSheetBuilder();
	builder.addFrame(new zim.Circle(50, frame.purple));
	builder.build();
	var emitter = new zim.Emitter({
		obj:new zim.Sprite({spriteSheet:builder.spriteSheet}),
		num:10, // ten Sprites made every 20 ms for about 1000 particles
		life:2000,
		interval:20,
		gravity:0,
		force:2
	}).centerReg(stage);
});


// see more examples at http://zimjs.com/code/particles
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
** some parameters below support ZIM VEE values that use zik() to pick a random option
The ZIM VEE value can be the following:
1. an Array of values to pick from - eg. ["red", "green", "blue"]
2. a Function that returns a value - eg. function(){return Date.now();}
3. a ZIM RAND object literal - eg. {min:10, max:20, integer:true, negative:true} max is required
4. any combination of the above - eg. ["red", function(){x>100?["green", "blue"]:"yellow"}] zik is recursive
5. a single value such as a Number, String, zim.Rectangle(), etc. this just passes through unchanged

obj - |ZIM VEE| a display object to clone - eg. new zim.Circle(10, frame.green);
	can also specify a shape config object with the following properties to draw inside a shape as an alternative to the trace property
	{type:"shape", s:"white", ss:1, f:"red", sd:[20, 10], offset:3}
	the parameters accept ZIM VEE values except the type and sd as it requires an array as a final value
	type:"shape" is required.  s is setStroke, ss is setStrokeStyle, sd and offset are setStrokeDash in CreateJS
	line thickness (ss) is currently not staying in the latest CDN CreateJS - this is working in the NEXT build
width - (default 300) the width of the Emitter container - used as cache bounds for trace if trace is true
height - (default 300) the height of the Emitter container - used as cache bounds for trace if trace is true
	these dimensions will affect performance if the trace parameter is true so use carefully
	also see the traceShiftX and traceShiftY to specify the caching rectangle position
interval - |ZIM VEE| (default 300) the time in ms between imitting particles
num - |ZIM VEE| (default 1) the number of particles emitted each interval
life - (default 1000) the time in ms the particle will exist
fade - (default true) Boolean to fade the particle (alpha 0) - set to false to not fade out the particle over the decayTime
shrink - (default true unless trace is true) Boolean to shrink the particle (scale 0) - set to false to not shrink the particle over the decayTime
decayTime - (default 1000) time in ms to fade and / or shrink the particle - ends animation at the life time unless decayStart is set
decayStart - (default null) time in ms to start the decayTime otherwise decay (fade and shrink) ends at the end of life time
trace - (default false) Boolean set to true to leave trails by caching each particle with source-over composite operation
traceFadeTime - (default decayTime) time in ms to fade out traced particle to 0 alpha at the end of the particle life time
traceShiftX - (default 0) x amount to shift the cache rectangle for the traced particle
traceShiftY - (default 0) y amount to shift the cache rectangle for the traced particle
	the particle starts centered in the width and height of the Emitter container
	if you have particles falling - for instance fireworks, you can shift the cache rectangle down to see more trails
	and then place the Emitter up higher on the stage
angle - |ZIM VEE| (default {min:0, max:360}) the angle the particle will emit (0 is along the positive x axis)
	if you want to shoot particles in one direction just use angle = 20
	if you want something shooting up on either side of the y axis you can use:
	angle = {min:-90-20, max:-90+20}; this may be easier to visualize
	if you want to emit at 45 or 90 then use [45, 90]
force - |ZIM VEE| (default 5) the force for the emitter to shoot the partice at an angle
	if you want to shoot a variety use force = {min:2, max:10} etc.
gravity - (default 9.8) the force of gravity going down - can be negative to make particles float up
wind - (default 0) a force you can apply in the horizontal direction either negaitive for left or positive for right
layers - (default "top") where to place the current particle being emitted - values are "top", "bottom", "random"
animation - |ZIM VEE| (default null) a zim animate config object to apply to the particle
	This is the whole zim DUO object to pass to animate - including an obj parameter that holds the animation object (different than the animate object)
random - (default null) an object holding properties to animate, each property holding a ZIM VEE Value object for zik to pick from per particle
	eg: {color:["red", "white", "green"], scale:{min:1, max:2}} // scale is a convienence property for both scaleX and scaleY
horizontal - (default false) start the particles across the emitter's width at the top of the emitter (unless vertical is set to true)
vertical - (default false) start the particles across the emitter's height at the left of the emitter (unless horizontal is set to true)
sink - (default null) an object with x and y properties (can be a display object) that the particles will be pulled to (or pushed if sinkForce is negative)
sinkForce - (default 10 if sink) the force particles are moved towards the sink location
cache - (default zim.mobile() or false if gpu) Boolean to cache each particle - helpful if complex shape or text (do not use for Bitmap or SpriteSheet)
events - (default false) Boolean - set to true to receive events from Emitter
startPaused - (default false) Boolean - set to true to start the Emitter in the paused state
pool - (default true) Boolean if true, makes as many particles as it needs before recycling particles
	this improves performance as new particles do not need to be made and old ones remove
	see also the clearPool() method to start collecting a new type of particle, etc.
poolMin - (default 0) a minimum number of pooled particles before new particles are no longer made (if pool is true)
	eg. setting poolMin to 100 would make 100 particles and then start reusing these particles for performance
	if you set pool to true and do not specify a poolMin then ZIM will calculate the needed number to properly recycle
	but you can override this number if you want a larger pool for more selection

METHODS
spurt(num, time, restart) - shoots particles (usually would pause Emitter before doing this)
	supports ZIM DUO config object
	num - |ZIM VEE| (default null) number of particles to emit according to Emitter settings
	time - |ZIM VEE| (default null) alternatively, time to emit particles according to Emitter settings
		if both num and time are provided the faster one will stop the emitting
		dispatches three different spurt events - see events
	restart (default false) set to true to restart the particles when spurted (removes old particles)
pause(state, restart, freeze, immediate) - pause or unpause the Emitter
	state (default true) will pause the emitter or set to false to unpause the emitter
		this will set the read only paused property to true or false accordingly
	restart (default false) set to true to restart the particles when unpaused
		otherwise continues the particles from where they were
	freeze (default false) set to true to freeze the particles
		othewise pause just stops emitting and existing particles continue their life
	immediate (default false) set to true to emit right away after unpausing
		otherwise just emits on normal schedule
clearPool() - clear the pool of particles - use if you change the obj or its properties (no effect if pool parameter is false)
resize(width, height) - resizes the Emitter container and any cache bounds for new particles
clone() - makes a copy with properties such as x, y, etc. also copied
	all current properties will be cloned except for startPaused for which the initial paramter value is cloned
dispose() - removes event listeners from Window and content and removes any Ticker functions

ALSO: ZIM 4TH adds all the methods listed under zim.Container (see above), such as:
drag(), hitTestRect(), move(), animate(), scale(), center(), centerReg(),
addTo(), removeFrom(), loop(), outline(), place(), pos(), alp(), rot(), setMask(), etc.
ALSO: See the CreateJS Easel Docs for Container methods, such as:
on(), off(), getBounds(), setBounds(), cache(), uncache(), updateCache(), dispatchEvent(),
addChild(), removeChild(), addChildAt(), getChildAt(), contains(), removeAllChildren(), etc.

PROPERTIES
type - holds the class name as a String
** All the PARAMETERS are available as PROPERTIES to get and set (except for the cache parameter - and width and height act differently)
paused - read only Boolean as to whether the Emitter is paused or not - see also pause() method
currentParticle - the latest particle emitted
	if trace is false then this is myEmitter.getChildAt(myEmitter.numChildren-1);
	if trace is true then this is myEmitter.getChildAt(myEmitter.numChildren-1).getChildAt(0);
particlesEmitted - the number of particles that have been made / emitted
spurtNum - total number of particles to spurt (when spurt() is called)
spurtCount - number of particles spurted so far (when spurt() is called)
zimInterval - the interval used to create particles
zimTicker - the ticker used to animate particles
** CHILD PROPERTIES - each child has a particle (if trace is true) or is a particle (if trace is false)
particle -  a reference to the particle for the child (could be to itself)
particleNormal - true or false if particle is not decaying or fizzing
particleDecaying - true or false if decaying - particle is currently animating to either scale 0 or alpha 0
particleFizzing - true or false if fizzing - trace container is currently animating to alpha 0
** setting widths and heights adjusts scale not bounds and getting these uses the bounds dimension times the scale
** these will not remake the cache bounds, etc. - they just scale the Emitter - see resize()
width - gets or sets the width. Setting the width will scale the height to keep proportion (see widthOnly below)
height - gets or sets the height. Setting the height will scale the width to keep proportion (see heightOnly below)
widthOnly - gets or sets the width.  This sets only the width and may change the aspect ratio of the object
heightOnly - gets or sets the height.  This sets only the height and may change the aspect ratio of the object
blendMode - how the object blends with what is underneath - such as "difference", "multiply", etc. same as CreateJS compositeOperation

ALSO: See the CreateJS Easel Docs for Container properties, such as:
x, y, rotation, scaleX, scaleY, regX, regY, skewX, skewY,
alpha, cursor, shadow, mouseChildren, mouseEnabled, parent, numChildren, etc.

EVENTS
** the below events all have a particle property that gives access to the particle (not the particle container for a traced particle - ask for the particle.parent for that)
dispatches a "spurted" event once the spurt() method is finished emitting particles
dispatches a "spurtdecayed" event once the last spurted particle decays (fade / shrink)
dispatches a "spurtfizzed" event once the last spurted particle's life ends
** the below events only trigger if the events parameter is set to true (default is false for slight performance edge)
dispatches an "emitted" event when a particle is made
dispatches a "decayed" event when the particle's decayStart + decayTime ms has elapsed
dispatches a "fizzed" event when the particle's life ms has elapsed

ALSO: See the CreateJS Easel Docs for Container events, such as:
added, click, dblclick, mousedown, mouseout, mouseover, pressmove, pressup, removed, rollout, rollover
--*///+69.9
	zim.Emitter = function(obj, width, height, interval, num, life, fade, shrink, decayTime, decayStart, trace, traceFadeTime, traceShiftX, traceShiftY, angle, force, gravity, wind, layers, animation, random, horizontal, vertical, sink, sinkForce, cache, events, startPaused, pool, poolMin) {
	    var sig = "obj, width, height, interval, num, life, fade, shrink, decayTime, decayStart, trace, traceFadeTime, traceShiftX, traceShiftY, angle, force, gravity, wind, layers, animation, random, horizontal, vertical, sink, sinkForce, cache, events, startPaused, pool, poolMin";
	    var duo; if (duo = zob(zim.Emitter, arguments, sig, this)) return duo;
		z_d("69.9");

	    if (zot(obj)) obj = [];
		if (zot(width)) width = 300;
		if (zot(height)) height = 300;
	    if (zot(interval)) interval = 20;
	    if (typeof interval == "number") interval = Math.max(10, interval);
		if (zot(num)) num = 1;
		if (zot(trace)) trace = false;
		if (zot(traceFadeTime)) traceFadeTime = decayTime;
		if (zot(traceShiftX)) traceShiftX = 0;
		if (zot(traceShiftY)) traceShiftY = 0;
	    if (zot(life)) life = 1000;
	    if (zot(fade)) fade = true;
		if (zot(shrink)) shrink = trace?false:true;
	    if (zot(decayTime)) decayTime = 1000;
	    if (zot(angle)) angle = {min:0, max:360};
	    if (zot(force)) force = 5;
	    if (zot(gravity)) gravity = 9.8
	    if (zot(wind)) wind = 0;
	    if (zot(layers)) layers = "top"; // bottom, random
	    if (zot(width)) width = 100;
	    if (zot(height)) height = 100;
	    if (zot(horizontal)) horizontal = false;
	    if (zot(vertical)) vertical = false;
	    if (!zot(sink) && zot(sinkForce)) sinkForce = 10;
		if (zot(events)) events = false;
		if (zot(startPaused)) startPaused = false;
		if (zot(pool)) pool = true;
		if (zot(poolMin)) poolMin = 0;

	    this.zimContainer_constructor(width, height);
		this.type = "Emitter";
	    var that = this;

	    // might want many of these as dynamic properties - sigh.
	    that.obj = obj; that.interval = interval; that.num = num;
	    that.life = life; that.fade = fade; that.shrink = shrink;
		that.decayTime = decayTime;  that.decayStart = decayStart;
		that.trace = trace; that.traceFadeTime = traceFadeTime,
		that.traceShiftX = traceShiftX; that.traceShiftY = traceShiftY;
	    that.angle = angle, that.force = force;
		that.gravity = gravity; that.wind = wind;
	    that.layers = layers; that.animation = animation; that.random = random;
		that.horizontal = horizontal; that.vertical = vertical;
	    that.sink = sink; that.sinkForce = sinkForce;
		that.events = events; that.startPaused = startPaused;
		that.pool = pool; that.poolMin = poolMin;

		that.particlesEmitted = 0;
		var poolList = [];
		var poolIndex = 0;
		var poolCount = 0;

		var emitterTicker;
		var stage;
		zim.added(that, addedToStage);
	    function addedToStage(s) {
	        stage = s;
			if (zot(cache)) {
				if (stage.isWebGL) {
					cache = false;
				} else {
					cache = zim.mobile();
				}
			}
			if (cache) stage.snapToPixelEnabled = true;
	        if (stage) {
				if (!horizontal && !vertical) that.centerReg();

				//-------------   INTERVAL

	            that.zimInterval = zim.interval(that.interval, function() {

					if (that.startPaused) {that.pause(); return;}
					// want to leave that.obj as it was provided
					// but for creation we will normalize it as an Array
					obj = Array.isArray(that.obj)?that.obj:[that.obj];
	                if (obj.length <= 0) return;

					var minInterval; // used to calculate max pool
					var maxNum;
					function sortNumber(a,b) {return a - b;}
					if (Array.isArray(that.interval)) {
						that.interval.sort(sortNumber);
						minInterval = that.interval[0];
					} else if (that.interval.constructor == {}.constructor){
						minInterval = that.interval.min;
					} else {
						minInterval = that.interval;
					}
					if (Array.isArray(that.num)) {
						that.num.sort(sortNumber);
						maxNum = that.num[that.num.length-1];
					} else if (that.num.constructor == {}.constructor){
						maxNum = that.num.max;
					} else {
						maxNum = that.num;
					}

					zim.loop(zik(that.num), function() {
		                if (that.decayTime > 0) {
		                    var decay = {};
		                    if (that.shrink) decay.scale=0;
		                    if (that.fade) decay.alpha=0;
		                }
						if (that.pool && poolList.length > 0 && poolCount >= Math.max(that.poolMin, (that.life/minInterval+5)*maxNum)) { // USE POOL... throw in an extra 5 for good measure
							var container = poolList[(poolIndex++)%poolList.length];
							container.visible = true;
							var particle = container.trace?container.getChildAt(0):container;
							if (particle.emitShape) {
								var t = particle.template;
								particle.graphics.c().s(t.s?zik(t.s):null).ss(t.ss?zik(t.ss):null).sd(t.sd?zik(t.sd):null, t.offset?zik(t.offset):null);
							}
							if (container.trace) container.updateCache();
							if (that.layers == "top") {
								if (particle.emitShape) container.addTo(that);
								else container.centerReg(that);
							} else {
								if (particle.emitShape) container.addTo(that, true, that.layers=="bottom"?0:zim.rand(that.numChildren));
								else container.centerReg(that, that.layers=="bottom"?0:zim.rand(that.numChildren));
							}
							container.alpha = 1;
							container.scaleX = 1;
							container.scaleY = 1;
							particle.alpha = particle.originalAlpha;
							particle.scaleX = particle.originalScaleX;
							particle.scaleY = particle.originalScaleY;
							particle.endSpurt = false;

						} else { // END POOL, START NOT POOL
							poolCount++;
							var container;
							if (that.trace) {
								container = new zim.Container(width,height);
								container.trace = true;
							}

							var template = zik(zim.shuffle(obj)[0]);
							if (template.type == "shape") { // shape needs to be top left whereas others need to be centerReg
								var t = template;
								// {type:"shape", s:"white", ss:2, f:null, sd:[20, 10], offset:3}
								// line thickness is currently not staying in the latest CDN CreateJS - this is working in the NEXT build
								var particle = new zim.Shape(1,1);
								particle.emitShape = true;
								particle.template = t;
								particle.graphics.s(t.s?zik(t.s):null).ss(t.ss?zik(t.ss):null).sd(t.sd?zik(t.sd):null, t.offset?zik(t.offset):null);
								if (that.trace) {
									particle.addTo(container)
								} else {
									if (that.layers == "top") {
										particle.addTo(that);
									} else {
										particle.addTo(that, that.layers=="bottom"?0:zim.rand(that.numChildren));
									}
								}
							} else { // others need to be centerReg
								var particle = template.clone();
								if (!particle.centerReg) zimify(particle);
								if (that.trace) {
									particle.centerReg(container).pos(-1000,-1000); // cache was drawing this in center - perhaps missing an update so just move it away
								} else {
									if (that.layers == "top") {
										particle.centerReg(that);
									} else {
										particle.centerReg(that, that.layers=="bottom"?0:zim.rand(that.numChildren));
									}
								}
							}

							if (that.trace) { // still need to add the container if there is one
								if (that.layers == "top") {
									container.addTo(that);
								} else {
									container.addTo(that, that.layers=="bottom"?0:zim.rand(that.numChildren));
								}
								container.cache(traceShiftX,traceShiftY,width,height);
							}

							if (!that.trace) container = particle;
							container.particle = particle;
							particle.originalAlpha = particle.alpha;
							particle.originalScaleX = particle.scaleX;
							particle.originalScaleY = particle.scaleY;

						} // END NOT POOL

						that.currentParticle = particle;
						that.particlesEmitted++;

						container.particleNormal = true;
						container.particleDecaying = false;
						container.particleFizzing = false;

						var angle = zik(that.angle);
		                var speed = zik(that.force);
		                var speedX = speed*Math.cos(angle*Math.PI/180);
		                var speedY = speed*Math.sin(angle*Math.PI/180);
		                particle.info = {
		                    position: {x:width/2, y:height/2},
		                    velocity: {x:speedX, y:speedY},
		                }
						if (that.horizontal) particle.info.position = {x:zim.rand(0, width), y:that.vertical?height/2:0};
		                if (that.vertical) particle.info.position = {x:that.horizontal?width/2:0, y:zim.rand(0, height)};
						if (particle.emitShape) {
							particle.graphics.mt(particle.info.position.x, particle.info.position.y);
						} else {
							particle.pos(particle.info.position.x, particle.info.position.y);
						}

						if (that.random) {
		                    // {color:[frame.blue, frame.pink, frame.yellow, frame.orange]}
		                    zim.loop(that.random, function(property, options) {
		                        val = zik(options);
		                        if (property == "scale") {
		                            particle.scale(val);
		                        } else {
									if (property == "x") {
										particle.info.position.x = (that.horizontal || that.vertical)?val:val+width/2;
									} else if (property == "y") {
										particle.info.position.y = (that.horizontal || that.vertical)?val:val+height/2;
									}
		                            particle[property] = val;
									if (particle.emitShape) particle.pos(0,0); // just adjust info for x and y of shape
		                        }
		                    });
		                }

				        if (cache && !particle.emitShape) particle.cache(particle.getBounds().x-10,particle.getBounds().y-10,particle.getBounds().width+20,particle.getBounds().height+20);

						//-------------    DECAY, FADE, SHRINK, FIZZ

						// do not shrink shapes as registration is at 0,0 not at the particle
						var shrinkMe = particle.emitShape?false:that.shrink;

		                if (that.decayTime > 0 && (that.fade || shrinkMe || (that.trace && that.traceFadeTime > 0))) {


							if (that.trace && that.traceFadeTime > 0) {
								container.animate({
									obj:{alpha:0},
									time:that.traceFadeTime,
									wait:that.life-that.traceFadeTime,
									waitedCall:function(t) {
										t.particleNormal = false;
										t.particleFizzing = true;
									},
									call:fizz,
									override:false,
									id:"decay"
								});
							}
							if (that.fade || shrinkMe) {
								var o = {};
								if (that.fade) o.alpha = 0;
								if (shrinkMe) {
									o.scaleX = 0;
									o.scaleY = 0;
								}
			                    particle.animate({
									obj:o,
									time:that.decayTime,
									wait:zot(that.decayStart)?that.life-that.decayTime:that.decayStart,
									waitedCall:function(t) {
										if (t.parent != that) t = t.parent; // access container if there is one
										t.particleNormal = false;
										t.particleDecaying = true;
									},
									call:function(t) {
										if (that.events) sendEvent("decayed", t);
										if (t.endSpurt) sendEvent("spurtDecayed", t);
										if (!(that.trace && that.traceFadeTime > 0)) {
											if (zot(that.decayStart) || that.decayStart+that.decayTime>that.life) {
												fizz(t.parent.trace?t.parent:t); // only want to call fizz once
											} else {
												-function() {
						                            var c = container;
						                            zim.timeout(that.life-(that.decayStart+that.decayTime), function(){fizz(c);})
						                        }();
											}
										}
									},
									override:false,
									id:"decay"
								});
							}
		                } else {
		                    if (that.life > 0) {
		                        -function() {
		                            var c = container;
		                            c.timeOut = zim.timeout(that.life, function(){fizz(c);})
		                        }();
		                    }
		               	}
						if (that.events) sendEvent("emitted", container);
						spurtCheck(particle);
		                if (that.animation) {
							var a = zik(that.animation);
		                    if (zot(a.override)) a.override = false;
		                    particle.animate(zim.copy(a));
		                }
					});
	            }, null, true); // true for immediate


				//-------------  TICKER

				var framerate = 0; // need a Ticker before can get the framerate so set this after Ticker
				emitterTicker = that.emitterTicker = zim.Ticker.add(function() {
	                zim.loop(that, function(particle) {
						if (particle.trace) {
							var particleContainer = particle;
							particle = particle.getChildAt(0);
						}
	                    var p = particle.info;
	                    var sinkX = 0;
	                    var sinkY = 0;
	                    // will add multiple sinks in the future
	                    // also - try sink with negative force to deflect
	                    if (!zot(that.sink)) {
	                        var b = that.localToGlobal(p.position.x, p.position.y);
							var s;
							if (that.sink.parent && that.sink.parent.localToGlobal) {
								var s = that.sink.parent.localToGlobal(that.sink.x, that.sink.y);
							} else {
								s = new createjs.Point(zik(that.sink.x), zik(that.sink.y));
							}
	                        var sinkAngle = zim.angle(b.x, b.y, s.x, s.y);
	                        var sinkX = that.sinkForce*Math.cos(sinkAngle*Math.PI/180)
	                        var sinkY = that.sinkForce*Math.sin(sinkAngle*Math.PI/180)
	                    }
	                    var ax = that.wind + sinkX;
	                    var ay = that.gravity + sinkY;
	                    p.velocity.x += ax*frameRate;
	                    p.velocity.y += ay*frameRate;
						p.position.x += p.velocity.x*frameRate*100;
	                   	p.position.y += p.velocity.y*frameRate*100;
						if (particle.emitShape) {
							particle.graphics.lt(p.position.x, p.position.y);
						} else {
		                    particle.x = p.position.x;
		                    particle.y = p.position.y;
						}
						if (that.trace && particleContainer) particleContainer.updateCache(particle.emitShape?null:"source-over");

					});
	            }, stage);
	            frameRate = 1 / zim.Ticker.framerate;
	        }
	    };

		//-------------    FUNCTIONS

		function fizz(p) {

			if (that.events) sendEvent("fizzed", p);
			if (p.trace?p.getChildAt(0).endSpurt:p.endSpurt) {
				sendEvent("spurtFizzed", p);
				that.spurting = false;
			}
			if (that.pool) {
				if (p.pooled == "end") {
					// already removed from poolList by clearPool
					// go through and removeChild
				} else if (p.pooled) { // already in the pool
					p.visible = false;
					return;
				} else { // add to pool and return so does not get removed
					p.pooled = true;
					poolList.push(p);
					p.visible = false;
					return;
				}
			}
			that.removeChild(p);
			if (that.trace) p.uncache();
			p = null;
		}

		function sendEvent(type, object) {
			var e = new createjs.Event(type);
			e.particle = object.trace?object.getChildAt(0):object;
			that.dispatchEvent(e);
		}

		function spurtCheck(p) {
			if (zot(that.spurtCount) && zot(that.spurtNum)) return;
			that.spurtCount++;
			if (that.spurtCount >= that.spurtNum) {
				lastSpurt(p);
			}
		}

		function lastSpurt(p) {
			that.pause();
			that.spurtCount = that.spurtNum = null;
			sendEvent("spurted", p);
			p.endSpurt = true;

		}

		//-------------    PROPERTIES

		Object.defineProperty(that, 'interval', {
			get: function() {
				return interval;
			},
			set: function(theInterval) {
				interval = theInterval;
				if (that.zimInterval) that.zimInterval.time = interval;
			}
		});

		//-------------    METHODS

		this.spurting = false;
		this.spurt = function(num, time, restart) {
			var sig = "num, time, restart";
	   	 	var duo; if (duo = zob(that.spurt, arguments, sig)) return duo;

			if (!zot(time)) {
				zim.timeout(zik(time), function() {
					lastSpurt(that.currentParticle);
				});
				that.spurting = true;
			}
			if (!zot(num)) {
				// handled by checkSpurt() function
				that.spurtNum = zik(num);
				that.spurtCount = 0;
				that.spurting = true;
			}
			that.pause(false, restart, null, true); // unpause and immediately call call interval function
		}

		this.clearPool = function() {
			zim.loop(that, function(p) {
				p.pooled="end";
				if (!p.visible) that.removeChild(p);
			},true);
			poolCount = 0;
			poolIndex = 0;
			poolList = [];
		}

		if (!that.startPaused) this.paused = false; // do not set to false - as it will be done below if needed
		this.pause = function(state, restart, freeze, immediate) {
			that.startPaused = null;
			if (zot(state)) state = true;
			if (zot(restart)) restart = false;
			if (zot(freeze)) freeze = false;
			if (state) { // pausing
				if (that.paused) return that;
				if (freeze) {
					if (emitterTicker) zim.Ticker.remove(emitterTicker);
			        zim.loop(that, function(particle) {
			            particle.pauseZimAnimate();
						if (particle.trace) particle.getChildAt(0).pauseZimAnimate();
						if (particle.timeOut) {
							particle.timeOut.pause();
						}
			        });
				}
		        that.zimInterval.pause();
				that.paused = true;
			} else { // unpausing
				if (!that.paused) return that;
				if (restart) {
					zim.loop(that, function(particle) {
			            particle.stopZimAnimate();
						if (particle.timeOut) particle.timeOut.clear();
						if (particle.trace) particle.getChildAt(0).pauseZimAnimate();
			        });
					that.removeAllChildren();
				}
				if (stage && emitterTicker && !zim.Ticker.has(stage, emitterTicker)) {
					zim.Ticker.add(emitterTicker, stage);
			        zim.loop(that, function(particle) {
			            particle.pauseZimAnimate(false);
						if (particle.timeOut) particle.timeOut.pause(false);
						if (particle.trace) particle.getChildAt(0).pauseZimAnimate(false);
			        });
				}
		        that.zimInterval.pause(false, immediate);
				that.paused = false;
			}
			return that;
		}

		this.resize = function(w, h) {
			if (!zot(w)) width = w;
			if (!zot(h)) height = h;
			that.setBounds(0,0,width,height);
			if (!horizontal && !vertical) that.centerReg();
			that.clearPool();
		}

	    this.clone = function() {
			var objClone;
			if (Array.isArray(that.obj) || that.obj.constructor == {}.constructor) {
				objClone = zim.copy(that.obj);
			} else if (that.obj.clone) {
				objClone = that.obj.clone();
			} else {
				objClone = that.obj;
			}
			// note that all will clone the current property except for startPaused which clones the initial parameter value
			return that.cloneProps(new zim.Emitter(objClone, width, height, that.interval, that.num, that.life, that.fade, that.shrink, that.decayTime, that.decayStart, that.trace, that.traceFadeTime, that.traceShiftX, that.traceShiftY, that.angle, that.force, that.gravity, that.wind, that.layers, that.animation, zim.copy(that.random), that.horizontal, that.vertical, that.sink, that.sinkForce, cache, that.events, startPaused, that.pool, that.poolMin));
	    }

	    this.dispose = function() {
	        if (emitterTicker) {
				zim.Ticker.remove(emitterTicker);
			}
	        zim.loop(that, function(particle) {
	            particle.stopZimAnimate();
	        });
	        that.zimInterval.clear();
	        return true;
	    }
	}
	zim.extend(zim.Emitter, zim.Container, "clone", "zimContainer", false);
	//-69.9

/*--
zim.SoundWave = function(num, input, include, smoothing, min, max, operation, baseline, magnify, reduce)

SoundWave
zim class - extends a CreateJS EventDispatcher

DESCRIPTION
Receives a sound input and calculates frequency data using HTML AudioContext createAnalyser()
The input can be the mic or the result of a zim.asset("someSound").play() or an <audio> tag
You can specify the number of data points and then use the calculate() method to animate to sound

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var soundWave = new zim.SoundWave(50, "mic");
soundWave.on("ready", function() {
	zim.Ticker.add(function() {
		var data = soundWave.calculate();
		// data is an array with 50 frequency amplitudes from low to high based on Microphone input
	})
});

// or pass in a sound instance:

// before loading the sound with frame.loadAssets() use the following:
// this forces CreateJS to use an <audio> tag format
// we are trying to get things to work with WebAudio and will remove this message when we do!
createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);

// later when we the loading is complete:
var soundWave = new zim.SoundWave(50, frame.asset("mySound.mp3").play());

// or pass in an <audio> tag reference:
var soundWave = new zim.SoundWave(50, zid("tagID"));
zid("tagID").play();

// see more examples at
// http://zimjs.com/code/soundwave/bars.html
// http://zimjs.com/code/soundwave/circles.html
// http://zimjs.com/code/soundwave/mouth.html
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
num - (default 120) Number of data points returned by the calculate() method
input - (default "mic") or can set to the results of a zim.asset("someSound").play()
	or can set to an <audio> tag reference zid("tagID") make sure to zid("tagID").play()
include - (default 120/1024 = .117) a decimal range to include (0-1) - the full range (1) includes 90% very high frequencies
smoothing - (default .85) a decimal range for smoothing with 0 being choppy and .9 being slow to respond, etc.
min - (default -80 mic -100 song) minimum decibel number to pick up
max - (default -40 mic -10 song) maximum decibel number to pick up
operation - (default function below) a function that is applied to each result in the original bufferLength (1024)
	the natural results are very bass heavy with roughly a straight line heading down as frequency gets higher
	the default function reduces the bass by half and slowly rises towards the original values for higher frequency
		function(amplitude, i) {
			return amplitude * (.5+i*1/Math.pow(zim.SoundWave.bufferLength, .95));
		})
	you can pass in a different function to take the place of the default function
	the function receives the original amplitude and index as parameters
	you can use zim.SoundWave.bufferLength to get the total number of values in the original data (1024)
	Note: the data returned by the calculate() method will be only the included range - eg. .117 of the total original values (starting at low frequency)
baseline - (default 0 for mic and 30 for sound) removes this amount of amplitude from each data point (after operation is applied)
magnify - (default 1 for mic and 10 for sound) multiplies the data point by this much (after the baseline is removed)
	by removing the baseline amount and multiplying what's left the difference in wave data is increased
reduce - (default 0) subtracts this amount from each data point (after magnified)

METHODS
calculate() - returns an array of amplitudes at various frequencies from low to high
	the array will have a length that matches the num parameter
	the range of frequencies used will be 1024 multiplied by the include factor - eg. .117 = 120
	this 120 will be divided by the num parameter and average results over the range will be used
	this means the num parameter must be less than the 1024 times the range otherwise there is a warning

PROPERTIES
num - read only num of frequency data
smoothing - a decimal range for smoothing with 0 being choppy and .9 being slow to respond, etc.
analyser - the HTML analyser object https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
	with minDecibels, maxDecibels, smoothingTimeConstant and some others - see link
baseline - removes this amount of amplitude from each data point (after operation is applied)
magnify - multiplies the data point by this much (after the baseline is removed)
reduce - subtracts this amount from each data point (after magnified)

EVENTS
dispatches a ready event when the sound source is connectedc and the calculate() method is ready
--*///+69.95
	zim.SoundWave = function(num, input, include, smoothing, min, max, operation, baseline, magnify, reduce) {
		var sig = "num, input, include, smoothing, min, max, operation, baseline, magnify, reduce";
		var duo; if (duo = zob(zim.SoundWave, arguments, sig, this)) return duo;
		z_d("69.95");

		if (zot(num)) num = 120;
		if (zot(input)) input = "mic";
		if (zot(include)) include = 120/1024;
		if (zot(smoothing)) smoothing = .85;
		if (zot(min)) min = input=="mic"?-80:-100;
		if (zot(max)) max = input=="mic"?-40:-10;
		if (zot(operation)) operation = function(amplitude, i) {
			return amplitude * (.5+i*1/Math.pow(zim.SoundWave.bufferLength, .95));
		}
		if (zot(baseline)) baseline = (input=="mic"?0:30); // subtracts this much from value
		if (zot(magnify)) magnify = (input=="mic"?1:10); // multiplies amount by this much
		if (zot(reduce)) reduce = 0; // after calculating, subtract this much

		zim.SoundWave.bufferLength = 1024;
		_num = num;
		var that = this;
		that.baseline = baseline;
		that.magnify = magnify;
		that.reduce = reduce;

		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		var analyser = that.analyser = audioCtx.createAnalyser();
		analyser.minDecibels = min;
		analyser.maxDecibels = max;
		analyser.smoothingTimeConstant = smoothing;

		Object.defineProperty(this, 'smoothing', {
			get: function() {
				return analyser.smoothingTimeConstant;
			},
			set: function(s) {
				analyser.smoothingTimeConstant = s;
			}
		});

		Object.defineProperty(this, 'num', {
			get: function() {
				return _num;
			},
			set: function(n) {
				_num = n;
				steps = Math.floor(include*zim.SoundWave.bufferLength / _num);
				if (steps < 1) zog("ZIM SoundWave: num is too big");
			}
		});

		if (input == "mic") {
			navigator.getUserMedia = (navigator.getUserMedia ||
									  navigator.webkitGetUserMedia ||
									  navigator.mozGetUserMedia ||
									  navigator.msGetUserMedia);

			if (navigator.getUserMedia) {
				navigator.getUserMedia (
					{audio: true},
					function(stream) {
						var source = that.source = audioCtx.createMediaStreamSource(stream);
						connectSource(source);
					},
					function(err) {
						zog("ZIM SoundWave: Error occured: " + err);
					}
				);
			} else {
				zog("ZIM SoundWave: Sorry, mic not supported");
			}
			return;
		} else {
			if (input.type && input.type == "sound") {zog("ZIM SoundWave: pass in the result of a zim.asset('somesound').play() for the input"); return;}
			if (input.playbackResource) {
				// zog(input.playbackResource)
				// var source = audioCtx.createBufferSource(input.playbackResource);
				// source.connect(audioCtx.destination);
				// audioCtx.decodeAudioData(
				// 	input.playbackResource,
				// 	function(buffer) {
				// 		source.buffer = buffer;
				// 		source.connect(audioCtx.destination);
				// 		source.loop = true;
				// 	},
				// 	function(e){console.log("Error with decoding audio data" + e.err);}
				// );
				// var source = that.source = audioCtx.createBufferSource(input.playbackResource);
				var audio = input.playbackResource; // a playing zim.asset("somesound").play()
				var source = audioCtx.createMediaElementSource(audio);
			} else {
				var audio = input; // a playing <audio> tag zid("soundTagID").play()
				var source = audioCtx.createMediaElementSource(audio);
			}
			connectSource(source)
		}
		var steps;
		function connectSource(source) {
			source.connect(analyser);
			if (input != "mic") analyser.connect(audioCtx.destination);

			analyser.fftSize = zim.SoundWave.bufferLength*2;
			steps = Math.floor(include*zim.SoundWave.bufferLength / _num);
			if (steps < 1) {zog("ZIM SoundWave: include param is too small or num param is too big"); return;}
			var bufferLength = analyser.frequencyBinCount;
			var dataArray = new Uint8Array(bufferLength);

			that.calculate = function() {
				analyser.getByteFrequencyData(dataArray);
				var adjustedArray = dataArray.map(operation);
				if (steps == 1) return adjustedArray;
				var array = [];
				var tot = 0;
				for (var i=0; i<=include*zim.SoundWave.bufferLength; i++) {
					tot += adjustedArray[i];
					if (i==0) continue;
					if (i%steps==0) {
						array.push(Math.max(0,(tot/steps-that.baseline)*that.magnify-that.reduce));
						tot = 0;
					}
				}
				// array.push((tot/steps-30)*10);
				if (input != "mic") {
					array[0] *= .75;
					array[1] *= .85;
					array[2] *= .9;
					array[array.length-2] *= .8;
					array[array.length-1] *= .75;
				}
				array[array.length-1] *= 1.3;
				array[array.length-2] *= 1.2;
				array[array.length-3] *= 1.1;
				return array;
			}
			setTimeout(function(){that.dispatchEvent("ready");}, 50);
		}

	}

	zim.extend(zim.SoundWave, createjs.EventDispatcher, null, "cjsEventDispatcher", false);
	//-69.95

////////////////  ZIM FRAME  //////////////

// Zim Frame provides code to help you set up your coding environment

	if (zon) zog("ZIM FRAME");

/*--
zim.Frame = function(scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID, rollPerSecond, delay, canvasCheck, gpu, gpuObj, nextFrame, nextStage, allowDefault)

Frame
zim class - extends a createjs EventDispatcher

DESCRIPTION
Frame creates a canvas and stage.
Frame lets you decide how you want your stage to scale.
It also provides events for ready, resizing and orientation change
as well as a way to remake the canvas if necessary.
Frame handles loading Bitmap and Sound assets by wrapping PreloadJS
see http://zimjs.com/code/frame.html for sample templates using Frame.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var frame = new zim.Frame("fit", 1024, 768, "#CCC");
frame.on("ready", function() {
	var stage = frame.stage;
	var stageW = frame.width;
	var stageH = frame.height;

	// code here - or optionally load assets

	frame.loadAssets("image.png");
	frame.on("complete", function() {

		// app code goes here if waiting for assets
		var image = frame.asset("image.png");
		image.center(stage);
		stage.update();

	}); // end asset complete

	// OR for multiple assets in an assets folder:

	frame.loadAssets(["sound.mp3", "spriteData.json", "spriteImage.png"], "assets/");
	frame.on("complete", function() {

		// app code goes here if waiting for assets
		var soundInstance = frame.asset("sound.mp3").play();
		// later soundInstance.paused = true; // etc.

		var sprite = new zim.Sprite({json:frame.asset("spriteData.json")});
		sprite.center(stage).run(2000);
		// the image for the sprite is specified in the JSON
		// but we still want to load it so it is in the loadAssets()
		// and the JSON data will take care of adding it to the sprite

		stage.update();

	}); // end asset complete

}); // end of ready


END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
scaling - (default "full") can have values as follows
	"fit"      sets canvas and stage to dimensions and scales to fit inside window size
	"outside"  sets canvas and stage to dimensions and scales to fit outside window size
	"full"     sets stage to window size with no scaling
	"tagID"    add canvas to HTML tag of ID - set to dimensions if provided - no scaling

FIT and OUTSIDE: width and height will set the stage width and height and the canvas is then scaled
this is handy because all your dimensions are set to start
FULL: width and height are ignored when scaling as these are set to the window width and height
TAG: if width and height are provided then the canvas and stage will be these dimensions
if width and height are not provided in tag mode, the canvas and stage will take the dimensions of the tag
this means, the tag must have some sort of width and height dimensions set or it will be really big!
NOTE: in tag mode, the tag must exist before running Frame - so use a window DOMContentLoaded event

color - (default null) the background color of the frame (any CSS value) - or just set in styles
rollover - (default true) activates rollovers
touch - (default true) activates touch on mobile
scrollTop - (default true) activates scrolling on older apple devices to hide the url bar
align - (default "center") for fit and outside, the horizontal alignment "left", "center/middle", "right"
valign - (default "center") for fit and outside, the vertical alignment "top", "center/middle", "bottom"
canvasID - (default "myCanvas") will be set to tagIDCanvas if a tagID is provided - eg. scaling=test, canvasID=testCanvas
rollPerSecond - (default 20) times per second rollover is activated (if rollover parameter is true)
delay - (default 500) time in milliseconds to resize ONCE MORE after a orientation change
	unfortunately, some older devices may have a delay (after a window resize event) in reporting screen sizes
	so a time of 500 or so might catch the dimension change then call the frame resize event with the proper dimensions
	setting this may cause a flash on faster devices that do not need it - so it is a no win situation
	this effects only full mode with the Layout class and they can always refresh a screen if it is not quite right in the changed orientation
canvasCheck - (default true) check to see if there is canvas support - uses !!window.HTMLCanvasElement
gpu - (default false) set to true to use a CreateJS StageGL stage for GPU renderer
 	See: http://blog.createjs.com/stagegl-faster-better-stronger-webgl-update-easeljs/ (written before version 1 release)
	Use CreateJS 1.0.0 or later to get StageGL.
	https://github.com/CreateJS/Combined/tree/master/builds/1.0.0
	Can use http://d309knd7es5f10.cloudfront.net/createjs.min.js (CreateJS 1.0.0 until they host it on their CDN)
gpuObj - (default null) object with following properties (with defaults) See CreateJS docs on GITHUB:
	preserveBuffer (false), antialias (false), transparent (false), premultiply (false), autoPurge (1200)
nextFrame - (default null) set to zim Frame object of Frame underneath current Frame to pass events to nextFrame
nextStage - (default null) alternative to nextFrame if the stage beneath current Frame is not a ZIM Frame but just a CreateJS Stage
allowDefault - (default false) set to true to allow default mouse, key and scrollwheel events on canvas
	see also the zil property of frame that allows you to add and remove these events dynamically (except for mouse swipe scroll and zoom on mobile)

PROPERTIES
stage - read only reference to the createjs stage - to change run remakeCanvas()
	frame gives the stage read only stage.width and stage.height properties
canvas - a reference to the frame's canvas tag
tag - the containing tag if scaling is set to an HTML tag id (else null)
isLoading - a Boolean to indicate whether loadAssets() is currently loading assets
width - read only reference to the stage width - to change run remakeCanvas()
height - read only reference to the stage height - to change run remakeCanvas()
scale - read only returns the scale of the canvas - will return 1 for full and tag scale modes
orientation - "vertical" or "horizontal" (updated live with orientation change)
zil - reference to zil events that stop canvas from shifting or scrolling - also see allowDefaults parameter
	can set allowDefault property to false then allow specific defaults by removing zil events - see zil global function
	example: window.removeEventListener("keydown", listenersArray[0]); removes keydown preventions (for page up, page down, home, end, etc)
colors: orange, green, pink, blue, brown, yellow, silver, tin, grey, lighter, light, dark, darker, purple, white, black, clear (0 alpha), faint (.01 alpha)
altKey - true if the alt key is being pressed otherwise false
ctrlKey - true if the ctrl key is being pressed otherwise false
metaKey - true if the meta key (⌘ command on Mac or ⊞ windows key) is being pressed otherwise false
shiftKey - true if the shift key is being pressed otherwise false

METHODS
loadAssets(file||[file, file, etc.], path, xhr, time)
	pass in an file (String) or an array of files to assets,
	pass in an optional path to directory and XHR (default false)
	asset types (from CreateJS PreloadJS): Image, JSON, Sound, SVG, Text, XML
	time defaults to 0 and is the minimum number of milliseconds for the complete event to trigger
	use this for testing or to always have time to show a loading message
	RETURNS: a zim.Queue object that can be used for control with multiple loadAssets calls
	Each zim.Queue will trigger progress, assetload and complete events
	Each zim.Queue will have a preload property to the CreateJS LoadQueue and an isLoading property
	The frame also has these events and properties but acts for all loading - so be careful!
	It is recommended to use the zim.Queue any time you use multiple LoadAssets() calls at the same time
	You still access assets with frame.asset() as outlined below whether you use the zim.Queue or not
asset(file) - access a loaded asset based on file string (not including path)
	if the asset is an image then this is a zim.Bitmap and you add it to the stage
	if the asset is a sound then use asset(file).play();
	or can pass in a configuration object in play
	with the following properties (see CreateJS SoundJS docs)
	delay, offset, loop, volume, pan, startTime, interrupt and duration
	asset(file).play({volume:.5, pan:-1, loop:2});
	this returns createjs sound instance which can also be manipulated
	to stop the sound or set its volume dynamically, etc.
	if the asset is anything else, then it is what it is!
makeCircles(radius) - returns a createjs.Shape with the ZIM Circles (centered reg)
remakeCanvas(width, height) - removes old canvas and makes a new one and a new stage
	will have to set your local stage, stageW and stageH variables again
dispose() - removes canvas, resize listener and stage

EVENTS
"ready" - fired when the stage is made
"failed" - fired if no canvas support (and canvasCheck parameter is set to true - which is the default)
"progress" - fires constantly as assets are loaded with loadAssets() to represent overall load progress
"assetload" - fired when an asset loaded with loadAssets() has loaded (use asset property of event object - with type and id properties)
"complete" - fired when all assets loaded with loadAssets() are loaded (then use frame.asset())
"error" - fired when there is a problem loading an asset with loadAssets()
"resize" - fired on resize of screen
"orientation" - fired on orientation change
"keydown" - fires on keydown - just like the window keydown event with eventObject.keyCode, etc.
	also stores frame.altKey, frame.ctrlKey, frame.metaKey, frame.shiftKey
"keyup" - fires on keyup - just like the window keyup event with eventObject.keyCode, etc.
--*///+83
	zim.Frame = function(scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID, rollPerSecond, delay, canvasCheck, gpu, gpuObj, nextFrame, nextStage, allowDefault) {

		var sig = "scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID, rollPerSecond, delay, canvasCheck, gpu, gpuObj, nextFrame, nextStage, allowDefault";
		var duo; if (duo = zob(zim.Frame, arguments, sig, this)) return duo;
		z_d("83");
		this.cjsEventDispatcher_constructor();
		var that = this;

		// global variables to help reference the frame in some cases
		// not currently used for stage critical functions
		// just used to get key events or colors internally
		// also, as of zim 5.1.0 used for Ticker.add(function(){});
		// will use the zimDefaultFrame.stage if stage is not supplied as second parameter
		// this may lead to problems if a second frame is used
		// and the second frame stage is not used for the Ticker.add()
		// but two frames are rarely used and this simplifies 99% of the tickers
		if (typeof zimDefaultFrame == 'undefined') zimDefaultFrame = this;

		if (zot(canvasCheck)) canvasCheck = true;
		var canvasSupported = !!window.HTMLCanvasElement;
		if (!canvasSupported && canvasCheck) { // no canvas support
			setTimeout(function() {
				that.dispatchEvent("failed");
			}, 100);
			return;
		}
		var mobile = zim.mobile();
		if (zot(scaling)) scaling = "full";
		if (zot(rollover)) rollover = !mobile;
		if (zot(touch)) touch = true;
		if (zot(scrollTop)) scrollTop = true;
		if (zot(align)) align = "center";
		if (zot(valign)) valign = "center";
		if (zot(canvasID)) canvasID = "myCanvas";
		if (zot(rollPerSecond)) rollPerSecond = 20;
		if (zot(delay)) delay = 0;
		if (zot(gpu)) gpu = false;
		if (zot(allowDefault)) allowDefault = false;

		// setting a scaling of something other than this list will set the scaling to tag mode
		// where the scaling parameter value is assumed to be the ID of an HTML tag to contain the Frame
		var types = ["fit","outside","full"];

		this.scale = 1;
		this.x = 0;
		this.y = 0;

		var stage;
		var stageW = width;
		var stageH = height;
		var largest; // automatically set
		var appOrientation; // watch out - orientation keyword is used by apple - sigh
		var lastOrientation; // used to detect orientation change
		var appReady = false; // check variable (watch - "ready" is reserved)
		var tagID;
		var tag;

		var initCheck = false;
		if (document.readyState === 'interactive' || document.readyState === 'complete' ) { // DOM has loaded
			setTimeout(function() {init();}, 200); // can't dispatch directly from a constructor
		} else {
			document.addEventListener('DOMContentLoaded', init);
		}

		// Firefox has a glitch when setting the canvas to a new dimension
		// this only happens in full mode if a Ticker is updating the stage
		// so set the Ticker update to false - unfortunately for 500ms
		// which means animations will pause a little during resize
		// the resize event triggers pretty quickly and that will update the stage
		var lastTicker;
		var pauseTicker = false;
		var checkResize = (scaling == "full" && typeof InstallTrigger !== 'undefined'); // firefox check
		window.addEventListener('resize', function() {
			if (checkResize) {
				if (!pauseTicker) {
					pauseTicker = true;
					lastTicker = zim.Ticker.update;
					zim.Ticker.update = false;
					setTimeout(function() {
						pauseTicker = false;
						// only have one Frame set this...
						if (stage == zimDefaultFrame.stage) zim.Ticker.update = lastTicker;
					}, 40);
					setTimeout(function() {
						sizeCanvas();
						dispatchResize();
					}, 20);
				}
			} else {
				sizeCanvas();
				dispatchResize();
				if (delay > 0) {
					if (mobile) setTimeout(function() {
						sizeCanvas();
						dispatchResize();
					}, delay); // to catch delayed screen sizes
				}
			}
		});

		function init() {
			if (initCheck) return;
			initCheck = true;
			if (types.indexOf(scaling) == -1) {
				tagID = scaling;
				if (zot(zid(tagID))) {zog("zim.Frame - scaling: HTML tag with id="+scaling+" must exist"); return;};
				tag = this.tag = zid(tagID);
				scaling = (zot(width) || zot(height)) ? "tag" : "inline"; // tag with no dimensions or dimensions
				if (canvasID == "myCanvas") canvasID = tagID + "Canvas";
			}

			// now assign default width and height (ignored by full and tag)
			if (zot(width)) width = 500;
			if (zot(height)) height = 500;

			makeCanvas();
			makeStage();

			if (mobile) {
				// for older mobile - pan hides the location bar
				if (scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 50);}
				setTimeout(function() {
					// on all mobile devices
					// note, this is a second sizing as there is a sizing in makeStage
					sizeCanvas();
					that.dispatchEvent("ready");
					appReady = true;
					dispatchResize();
				}, 100);
				// for extra delay
				if (delay > 100) setTimeout(function() {sizeCanvas(); dispatchResize();}, delay); // to catch delayed screen sizes
			} else {
				that.dispatchEvent("ready");
				appReady = true;
				dispatchResize();
			}
		}

		function makeCanvas() {
			// note the width and height of a canvas
			// are separate from from the width and height styles
			// so beware of unintentionally stretching the canvas with styles

			var canvas = that.canvas = document.createElement("canvas");
			canvas.setAttribute("id", canvasID);
			canvas.setAttribute("tabindex", 0);
			// canvas.setAttribute("title", "application");
			if (scaling == "full" || scaling == "tag") {
				canvas.setAttribute("width", zim.windowWidth());
				canvas.setAttribute("height", zim.windowHeight());
			} else {
				canvas.setAttribute("width", stageW);
				canvas.setAttribute("height", stageH);
			}
			if (scaling == "tag" || scaling  == "inline") {
				tag.appendChild(canvas);
			} else {
				document.body.appendChild(canvas);
			}
			if (!zot(color)) canvas.style.backgroundColor = color;
			if (scaling == "full" || scaling == "fit" || scaling == "outside") {
				canvas.style.position = "absolute";
				document.body.style.overflow = "hidden";
			}
		}

		function makeStage() {
			sizeCanvas();
			if (types.indexOf(scaling) != -1 && !allowDefault) {that.zil = zil();} // keep canvas still (from arrows, scrollwheel, etc.) (fit, outside and full only)
			stage = gpu?new createjs.StageGL(canvasID, gpuObj):new createjs.Stage(canvasID);
			if (!zot(color) && gpu) stage.setClearColor(zim.convertColor(color));
			stage.setBounds(0, 0, stageW, stageH);
			stage.width = stageW;
			stage.height = stageH;
			if (rollover) stage.enableMouseOver(10); // if you need mouse rollover
			if (touch) createjs.Touch.enable(stage, false, allowDefault); // added for mobile
			if (nextFrame) stage.nextStage = nextFrame.stage;
			if (nextStage) stage.nextStage = nextStage;
		}


		function sizeCanvas() {
			var can = zid(canvasID);
			var w = zim.windowWidth();
			var h = zim.windowHeight();
			var newW; var newH;
			appOrientation = that.orientation = (w > h) ? "horizontal" : "vertical";
			if (appOrientation != lastOrientation) { // new orientation
				lastOrientation = appOrientation;
				that.dispatchEvent("orientation");
			}
			if (mobile && scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 100);}
			if (!can) return;

			if (scaling == "fit") {
				// scales canvas to fit dimensions inside screen
				that.scale = (w/h >= stageW/stageH) ? h/stageH : w/stageW;
			} else if (scaling == "outside") {
				// scales canvas so screen inside dimensions
				that.scale = (w/h >= stageW/stageH) ? w/stageW : h/stageH;
			} else if (scaling == "full") {
				// does not scale canvas but sets width and height to screen
				can.style.left = can.style.top = "0px";
				can.width = stageW = w;
				can.height = stageH = h;
				if (stage) {
					stage.setBounds(0,0,stageW,stageH); // need this
					stage.width = stageW;
					stage.height = stageH;
					if (gpu) stage.updateViewport(stageW, stageH);
				}
				return;
			} else if (scaling == "tag") {
				// does not scale canvas but sets width and height to tag
				stageW = tag.offsetWidth;
				stageH = tag.offsetHeight;
				if (stage) {
					stage.setBounds(0,0,stageW,stageH); // need this
					stage.width = stageW;
					stage.height = stageH;
					if (gpu) stage.updateViewport(stageW, stageH);
				}
				tag.style.overflow = "hidden";
				can.width = stageW;
				can.height = stageH;
				can.style.left = can.style.top = "0px";
				return;
			} else if (scaling == "inline") {
				// does not scale canvas but sets width and height
				if (stage) {
					stage.setBounds(0,0,stageW,stageH); // need this
					stage.width = stageW;
					stage.height = stageH;
					if (gpu) stage.updateViewport(stageW, stageH);
				}
				can.style.left = can.style.top = "0px";
				return;
			}
			// scaling and positioning for fit and outside
			newH = stageH * that.scale;
			newW = stageW * that.scale;
			can.style.width = newW + "px";
			can.style.height = newH + "px";
			// note, changing the canvas width and height and scaling the stage
			// does not look as shart at smaller scales - so decided to scale with styles
			// which is like scaling down an image
			// scaling up does not look as good - so just make your canvas as big as you will scale

			if (align=="left") that.x = 0;
			else if (align=="right") that.x = (w-newW);
			else that.x = ((w-newW)/2);
			if (valign=="top") that.y = 0;
			else if (valign=="bottom") that.y = (h-newH);
			else that.y = ((h-newH)/2);
			can.style.left = that.x + "px";
			can.style.top = that.y + "px";
		}

		function dispatchResize() {
			if (!appReady) return;
			that.dispatchEvent("resize");
			if (!zim.OPTIMIZE && stage && scaling == "full") stage.update();
		}

		// ASSETS
		this.loadAssetsCount = 0;
		this.assets = {}; // store asset Bitmap or play function for sound
		this.loadAssets = function(arr, path, xhr, time) {
			if (zot(arr)) return;
			if (zot(xhr)) xhr = false;
			if (!Array.isArray(arr)) arr = [arr];
			if (zot(time)) time = 0;
			var soundCheck = false;
			var manifest = [];
			var a; var ext; var i; var j;
			var re = /\.([^.]+)$/i; // get extension
			for (i=0; i<arr.length; i++) {
				a = arr[i];
				ext = a.match(re);
				if (createjs.Sound.SUPPORTED_EXTENSIONS.indexOf(ext[1]) >= 0) soundCheck = true;
				manifest.push({src:a});
			}
			var queue = new zim.Queue();
			that.loadAssetsCount++;
			that.isLoading = true;
			var preload = queue.preload = that.preload = new createjs.LoadQueue(xhr, path);
			if (soundCheck) preload.installPlugin(createjs.Sound);
			preload.on("progress", function(e) {queue.dispatchEvent(e); that.dispatchEvent(e);});
			preload.on("error", function(e) {queue.dispatchEvent(e); that.dispatchEvent(e);});
			preload.on("fileload", function(e) {
				var item = e.item;
				var type = e.item.type;
				var ext = item.id.match(re);
				var asset;
				if (type && type == "sound") {
					asset = that.assets[item.id] = {
                        type:"sound",
                        id:item.id,
                        play:function(added){
                            var instance = createjs.Sound.play(item.id, added);
                            instance.getStage = function(){return stage;}
                            return instance;
                        }
                    };
				} else if (type == "image") {
					asset = that.assets[item.id] = new zim.Bitmap(e.result, e.result.width, e.result.height, item.id);
				} else {
					asset = that.assets[item.id] = e.result;
				}
				var ev = new createjs.Event("assetload");
				ev.item = item; // createjs preload item
				ev.asset = asset;
				queue.dispatchEvent(e);
				that.dispatchEvent(ev);
			});
			// setting a time will force the preload to wait at least this amount of time
			// this can be used for testing or if you always want time to show a loading message
			var startLoad = Date.now();
			that.preloadEvent = preload.on("complete", function(e) {
				var endLoad = Date.now();
				time = Math.max(0, time-(endLoad-startLoad));
				setTimeout(function() {
					that.loadAssetsCount--;
					if (that.loadAssetsCount <= 0) that.isLoading = false;
					queue.isLoading = false;
					queue.dispatchEvent(e);
					that.dispatchEvent(e);
				}, time);
			});
			preload.loadManifest(manifest);
			return queue;
		}

		this.asset = function(n) {
			if (zot(n)) return;
			return that.assets[n] || {play:function(){if (zon) {zog("zim.Frame - asset("+n+") not found"); return {};}}};
		}

		Object.defineProperty(that, 'stage', {
			get: function() {
				return stage;
			},
			set: function(s) {
				zog("zim.Frame(): stage is read only - see remakeCanvas(), perhaps");
			}
		});

		Object.defineProperty(that, 'width', {
			get: function() {
				return stageW;
			},
			set: function(w) {
				zog("zim.Frame(): width is read only - see remakeCanvas(), perhaps");
			}
		});

		Object.defineProperty(that, 'height', {
			get: function() {
				return stageH;
			},
			set: function(h) {
				zog("zim.Frame(): height is read only - see remakeCanvas(), perhaps");
			}
		});

		Object.defineProperty(this, 'color', {
			get: function() {
				return color;
			},
			set: function(value) {
				color = value;
				if (!zot(value)) {
					zid(canvasID).style.backgroundColor = color;
					if (!zot(color) && gpu) stage.setClearColor(zim.convertColor(color));
				} else {
					zid(canvasID).style.backgroundColor = "default";
				}
			}
		});

		var eDown = new createjs.Event("keydown");
		this.eventRemove = eDown.remove;
		window.addEventListener("keydown", function(e) {
			e.remove = that.eventRemove;
			that.altKey = e.altKey;
			that.ctrlKey = e.ctrlKey;
			that.metaKey = e.metaKey;
			that.shiftKey = e.shiftKey;
			that.dispatchEvent(e);
		});
		window.addEventListener("keyup", function(e) {
			that.altKey = e.altKey;
			that.ctrlKey = e.ctrlKey;
			that.metaKey = e.metaKey;
			that.shiftKey = e.shiftKey;
			e.remove = that.eventRemove;
			that.dispatchEvent(e);
		});

		this.remakeCanvas = function(width, height) {
			if (scaling == "full") return;
			if (zot(width)) width = stageW;
			if (zot(height)) height = stageH;
			if (zid(canvasID)) zid(canvasID).parentNode.removeChild(zid(canvasID));
			stageW = width;
			stageH = height;
			makeCanvas();
			makeStage();
		}

		this.dispose = function() {
			window.removeEventListener('resize', sizeCanvas);
			stage.removeAllChildren();
			stage.removeAllEventListeners();
			if (zid(canvasID)) zid(canvasID).parentNode.removeChild(zid(canvasID));
			stage = null;
			that = null;
			return true;
		}

		// zim colors
		this.orange		= "#f58e25";
		this.green  	= "#acd241";
		this.pink  		= "#e472c4";
		this.blue   	= "#50c4b7";
		this.brown  	= "#d1a170";
		this.yellow   	= "#ebcb35";
		this.silver		= "#999999";
		this.tin		= "#777777";
		this.grey   	= "#555555"
		this.gray 		= "#555555";
		this.lighter 	= "#eeeeee";
		this.light 		= "#cccccc";
		this.dark 		= "#333333";
		this.darker 	= "#111111";
		this.purple		= "#993399";
		this.black 		= "#000000";
		this.white		= "#FFFFFF";
		this.clear 		= "rgba(0,0,0,0)";
		this.faint 		= "rgba(0,0,0,.01)";

		this.makeCircles = function(radius) {
			if (zot(radius)) radius = 100;
			var colors = [that.orange, that.green, that.pink, that.blue, that.brown, that.dark];
			var c = new zim.Shape();
			var g = c.graphics;
			c.radius = radius;
			for (var i=0; i<colors.length; i++) {
				g.f(colors[i]).dc(0,0,(c.radius/colors.length)*(colors.length-i));
			}
			c.setBounds(-c.radius,-c.radius,c.radius*2,c.radius*2);
			return c;
		}



	}
	zim.extend(zim.Frame, createjs.EventDispatcher, null, "cjsEventDispatcher", false);

	zim.Queue = function() {
		// internal usage only by Frame
		this.cjsEventDispatcher_constructor();
		this.isLoading = true; // thanks Frank Los for the suggestion.
	}
	zim.extend(zim.Queue, createjs.EventDispatcher, null, "cjsEventDispatcher");
	//-83


////////////////  ZIM META  //////////////

// the Meta section is for overall classes that operate on ZIM
// for instance zim.Distill and zim.Wonder

/*--
zim.DISTILL

distill
zim constant

DESCRIPTION
Distill allows you to track which functions you are using in your app
and create a custom minified js file with just those functions.
Set zim.DISTILL to true to record which functions your are using in your app -
default is false.  While running your app, call the zim.distill() function
take the results to http://zimjs.com/code/distill to create a minified distilled file.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// at the start of your code
zim.DISTILL = true;

// at the end of your code (once everything has run)
// this means we may have to wait for events to happen, etc.
zim.distill();

// this will log to the console a series of numbers
// separated by spaces representing the functions used

1 6 81 81 79 75 77 75 55 54 52 53 55 54 52 53 55 54 52
53 42 80 74 46 46 46 80 74 46 46 46 55 54 52 53 55 54
52 53 55 54 52 53 42 80 74

// copy these into the zim DISTILL form field
// to get the minified JavaScript for these functions
// NOTE: Distill will not duplicate the functions
// data duplication is left in for statistical purposes
END EXAMPLE
--*///+83.1
	zim.DISTILL = false;
	zim.distillery = [];
//-83.1

/*--
zim.distill = function()

distill
zim function

DESCRIPTION
Call the distill function to display which zim functions you are using in your app.
You must set zim.DISTILL constant to true before using (set at the start of your app).
After running through your app, call zim.distill() and see the console (F12).
Take the results to http://zimjs.com/code/distill to create a minified distilled js file.
You would then host this js file yourself or include it in your mobile files, etc.
NOTE: zim.distill() only records functions that have been used
so you may have functions still to be used in your app.
You will want to make sure you call distill() after you have used all your functions,
for instance, on a restart event, etc.
NOTE: zim.distill() will not be available from your distilled file.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// at the start of your code
zim.DISTILL = true;

// at the end of your code (once everything has run)
// this means we may have to wait for events to happen, etc.
zim.distill();

// this will log to the console a series of numbers
// separated by spaces representing the functions used

1 6 81 81 79 75 77 75 55 54 52 53 55 54 52 53 55 54 52
53 42 80 74 46 46 46 80 74 46 46 46 55 54 52 53 55 54
52 53 55 54 52 53 42 80 74

// copy these into the zim DISTILL form field
// to get the minified JavaScript for these functions
// NOTE: Distill will not duplicate the functions
// data duplication is left in for statistical purposes
END EXAMPLE
--*///+83.2
	zim.distill = function() {
	 	if (!window.zns && zim && zim.DISTILL) {zim.distillery.push("83.3","83.35")} // zimplify runs before we can set zim.DISTILL
		zog("zim.distill() - go to http://zimjs.com/code/distill and enter the following:");
		zog((zim.distillery.length>0)?zim.distillery.join(" "):"must set zim.DISTILL = true;");
	}//-83.2

	return zim;
} (zim || {});

// internal global function for the distill process
function z_d(n) {if (zim && zim.DISTILL) zim.distillery.push(n);}

// internal global function for adding DisplayMembers to zim Display Objects

/*--
zimify = function(obj, list)

zimify
global function

DESCRIPTION
Function to add display methods like drag, hitTests, move, animate, center, etc. to an object.
Also adds width, height, widthOnly and heightOnly properties.
The term "members" is used because we are adding both methods and properties.
All the ZIM 4TH display objects come with these members
BUT... the native CreateJS display objects do not.
When we import assets from Adobe Animate, these are native CreateJS objects.
So we can use zimify() to add these members to a CreateJS Shape, Container, etc.

NOTE: this was formerly zim.addDisplayMembers (which has been replaced by zimify)

ZIM uses zimify internally to add the members
to the ZIM shapes and components (Rectangle, Circle, Triangle, Label, Button, etc.)
as applied through the ZIM Container inheritance
as well as to the ZIM wrappers for CreateJS Container, Shape, Sprite, MovieClip objects.
The display methods call the original ZIM functions
passing the object parameter as the first parameter
or if DUO is being used then adds the object to the configuration object.

EXAMPLE
var cjsShape = new lib.Shape1(); // include the js from Adobe Animate
zimify(cjsShape);
cjsShape.center(stage);
cjsShape.drag();

// otherwise would have to use:
zim.center(cjsShape, stage);
zim.drag(cjsShape); // etc.
END EXAMPLE

EXAMPLE
var shape = new createjs.Shape();
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.setBounds(0,0,200,200); // need to set bounds to be able to center
zimify(shape); // add methods like center, drag, etc.
shape.center(stage); // ZIM 4TH method format
stage.update();

// note: even without using zimify()
// we can use the traditional zim.center() function
var shape = new createjs.Shape();
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.setBounds(0,0,200,200); // need to set bounds to center
zim.center(shape, stage); // use the zim function rather than the method
stage.update();

// of course we can just use a zim.Shape
// then the methods like center, drag, etc. are already added
var shape = new zim.Shape(200, 200); // passing params sets bounds
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.center(stage);
stage.update();

// in this case, we may have well used a zim.Rectangle ;-)
var shape = new zim.Rectangle(200, 200, "red");
shape.center(stage);
stage.update();
END EXAMPLE

PARAMETERS
obj - the object to add the methods and properties to (probably a CreateJS display object)
list - used internally by zimplify to exclude zim methods (makes zimify return list of methods)

RETURNS - obj for chaining
--*///+83.3

function zimify(obj, list) {
	z_d("83.3");

	var displayMethods = {
		drag:function(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.drag(arguments[0]);}
			else {return zim.drag(this, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens);}
		},
		noDrag:function() {
			return zim.noDrag(this);
		},
		dragRect:function(rect) {
			return zim.dragRect(this, rect);
		},
		setSwipe:function(swipe) {
			return zim.setSwipe(this, swipe);
		},
		gesture:function(move, scale, rotate, rect, minScale, maxScale, snapRotate, slide, slideDamp) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.gesture(arguments[0]);}
			else {return zim.gesture(this, move, scale, rotate, rect, minScale, maxScale, snapRotate, slide, slideDamp);}
		},
		noGesture:function(move, scale, rotate) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.noGesture(arguments[0]);}
			else {zim.noGesture(this, move, scale, rotate);}
		},
		gestureRect:function(rect) {
			return zim.gestureRect(this, rect);
		},
		hitTestPoint:function(x, y) {
			return zim.hitTestPoint(this, x, y);
		},
		hitTestReg:function(b) {
			return zim.hitTestReg(this, b);
		},
		hitTestRect:function(b, num) {
			return zim.hitTestRect(this, b, num);
		},
		hitTestCircle:function(b, num) {
			return zim.hitTestCircle(this, b, num);
		},
		hitTestBounds:function(b, boundsShape) {
			return zim.hitTestBounds(this, b, boundsShape);
		},
		boundsToGlobal:function(rect, flip) {
			return zim.boundsToGlobal(this, rect, flip);
		},
		hitTestGrid:function(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
			return zim.hitTestGrid(this, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type);
		},
		move:function(x, y, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, ticker, props, protect, override, from, id) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.move(arguments[0]);}
			else {return zim.move(this, x, y, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, ticker, props, protect, override, from, id);}
		},
		animate:function(obj, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, ticker, props, css, protect, override, from, id) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.animate(arguments[0]);}
			else {return zim.animate(this, obj, time, ease, call, params, wait, waitedCall, waitedParams, loop, loopCount, loopWait, loopCall, loopParams, loopWaitCall, loopWaitParams, rewind, rewindWait, rewindCall, rewindParams, rewindWaitCall, rewindWaitParams, sequence, sequenceCall, sequenceParams, ticker, props, css, protect, override, from, id);}
		},
		pauseZimAnimate:function(){},
		stopZimAnimate:function(){},
		wiggle:function(property, baseAmount, minAmount, maxAmount, minTime, maxTime, type, ease, integer, id) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.wiggle(arguments[0]);}
			else {return zim.wiggle(this, property, baseAmount, minAmount, maxAmount, minTime, maxTime, type, ease, integer, id);}
		},
		loop:function(call, reverse, step, start, end) {
			return zim.loop(this, call, reverse, step, start, end);
		},
		copyMatrix:function(source) {
			return zim.copyMatrix(this, source);
		},
		pos:function(x, y) {
			return zim.pos(this, x, y);
		},
		mov:function(x, y) {
			return zim.mov(this, x, y);
		},
		alp:function(alpha) {
			return zim.alp(this, alpha);
		},
		rot:function(rotation) {
			return zim.rot(this, rotation);
		},
		siz:function(width, height, only) {
			return zim.siz(this, width, height, only);
		},
		ske:function(skewX, skewY) {
			return zim.ske(this, skewX, skewY);
		},
		reg:function(regX, regY) {
			return zim.reg(this, regX, regY);
		},
		sca:function(scale, scaleY) {
			return zim.sca(this, scale, scaleY);
		},
		// not sure what is happening here - perhaps conflicting with CreateJS Shape and Canvas scale() method?
		// scale:function(scale, scaleY) {
		// 	return zim.scale(this, scale, scaleY);
		// },
		scaleTo:function(boundObj, percentX, percentY, type, boundsOnly) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.scaleTo(arguments[0]);}
			else {return zim.scaleTo(this, boundObj, percentX, percentY, type, boundsOnly);}
		},
		fit:function(left, top, width, height, inside) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.fit(arguments[0]);}
			else {return zim.fit(this, left, top, width, height, inside);}
		},
		outline:function(color, size) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.outline(arguments[0]);}
			else {return zim.outline(this, color, size);}
		},
		addTo:function(container, index) {
			return zim.addTo(this, container, index);
		},
		removeFrom:function(container) {
			return zim.removeFrom(this, container);
		},
		added:function(call, interval, maxTime) {
			return zim.added(this, call, interval, maxTime);
		},
		centerReg:function(container, index, add) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.centerReg(arguments[0]);}
			else {return zim.centerReg(this, container, index, add);}
		},
		center:function(container, index, add) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.center(arguments[0]);}
			else {return zim.center(this, container, index, add);}
		},
		place:function(id) {
			return zim.place(this, id);
		},
		placeReg:function(id) {
			return zim.placeReg(this, id);
		},
		expand:function(padding, paddingVertical) {
			return zim.expand(this, padding, paddingVertical);
		},
		setMask:function(mask) {
			return zim.setMask(this, mask);
		},
		cloneProps:function(clone) { // from CreateJS DisplayObject
			clone.alpha = this.alpha;
			clone.rotation = this.rotation;
			clone.mouseEnabled = this.mouseEnabled;
			clone.tickEnabled = this.tickEnabled;
			clone.name = this.name;
			clone.regX = this.regX;
			clone.regY = this.regY;
			clone.visible = this.visible;
			clone.shadow = this.shadow;
			zim.copyMatrix(clone, this);
			clone.compositeOperation = this.compositeOperation;
			clone.snapToPixel = this.snapToPixel;
			clone.filters = this.filters==null?null:this.filters.slice(0);
			clone.mask = this.mask;
			clone.hitArea = this.hitArea;
			clone.cursor = this.cursor;
			clone._bounds = this._bounds;
			return clone;
		},
		cloneChildren:function(clone) {
			if (clone.children.length) clone.removeAllChildren();
			var arr = clone.children;
			for (var i=0, l=this.children.length; i<l; i++) {
				var childClone = this.children[i].clone();
				childClone.parent = clone;
				arr.push(childClone);
			}
			return clone;
		}
	}
	if (!zot(list)) {
		var list = []
		for (var m in displayMethods) {
			list.push(m);
		}
		return list;
	}
	for (var i in displayMethods) {
		if (displayMethods.hasOwnProperty(i)) {
			obj[i] = displayMethods[i];
		}
	}
	Object.defineProperty(obj, 'width', {
		enumerable: true,
		get: function() {
			// that.setBounds(null);
			var b = this.getBounds();
			return (zot(b))?null:b.width*this.scaleX;
		},
		set: function(value) {
			var b = this.getBounds();
			if (zot(b) || b.width==0) {zog("width needs bounds set with setBounds()"); return;}
			var s = value/b.width;
			this.scaleX = this.scaleY = s;
		}
	});
	Object.defineProperty(obj, 'height', {
		enumerable: true,
		get: function() {
			// that.setBounds(null);
			var b = this.getBounds();
			return (zot(b))?null:b.height*this.scaleY;
		},
		set: function(value) {
			var b = this.getBounds();
			if (zot(b) || b.height==0) {zog("height needs bounds set with setBounds()"); return;}
			var s = value/b.height;
			this.scaleX = this.scaleY = s;
		}
	});
	Object.defineProperty(obj, 'widthOnly', {
		enumerable: true,
		get: function() {
			// that.setBounds(null);
			var b = this.getBounds();
			return (zot(b))?null:b.width*this.scaleX;
		},
		set: function(value) {
			var b = this.getBounds();
			if (zot(b) || b.width==0) {zog("widthOnly needs bounds set with setBounds()"); return;}
			var s = value/b.width;
			this.scaleX = s;
		}
	});
	Object.defineProperty(obj, 'heightOnly', {
		enumerable: true,
		get: function() {
			// that.setBounds(null);
			var b = this.getBounds();
			return (zot(b))?null:b.height*this.scaleY;
		},
		set: function(value) {
			var b = this.getBounds();
			if (zot(b) || b.height==0) {zog("heightOnly needs bounds set with setBounds()"); return;}
			var s = value/b.height;
			this.scaleY = s;
		}
	});
	Object.defineProperty(obj, 'blendMode', {
		enumerable: true,
		get: function() {
			return this.compositeOperation;
		},
		set: function(value) {
			this.compositeOperation = value;
		}
	});
	return obj;

}//-83.3

/*--
zimplify = function(exclude)

zimplify
global function

DESCRIPTION
Removes requirement to use the zim namespace in code
Puts the ZIM code, display and controls into the global namespace
Does not put methods in the namespace as using methods as functions is discouraged

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
var circle = new Circle(50, frame.green);
// was:
var circle = new zim.Circle(50, frame.green);

var random = rand(500);

// note - do not use:
var rand = rand(500); // as you will overwrite the rand() reference
END EXAMPLE

PARAMETERS
exclude - (default null) a String command or an array of command strings to not remove the zim namespace

--*///+83.35
function zimplify(exclude) {
	z_d("83.35");

	if (zot(exclude)) exclude = [];
	if (!Array.isArray(exclude)) exclude = [exclude];
	var methods = zimify(null, true); // get list of zim methods
	var exceptions = ["loop", "stopZimAnimate", "pauseZimAnimate", "animate"]
	for (var command in zim) {
		if ((methods.indexOf(command) == -1 || exceptions.indexOf(command) >= 0) && exclude.indexOf(command) == -1) {
			window[command] = zim[command];
		}
	}

}//-83.35

// back into zim
var zim = function(zim) {

/*--
zim.Wonder = function(wid, client, app, notes, server)

Wonder
zim class

DESCRIPTION
Wonder sends counts, times, and orders to a server for user testing or statistical purposes.
Go to http://zimjs.com/code/wonder/ to get a Wonder ID (wid) and set up Wonder stats with ZIM
or make up your own wid and use your own server script to collect data.
See the zim Wonder site for a sample script to collect data.
NOTE: all records at ZIM are archived NEW YEARS DAY and kept for a year after that.
Service is provided as is and ZIM and Dan Zen are not responsible for lost data.

USAGE
count will count things like app loads, button clicks within an app, how many monsters they killed
time will tell you the time the user took to do something - like solve a puzzle, or locate the witch
order will record the order items were done - which section did they go to first, second, third, etc.

NOTE: as of ZIM 5.5.0 the zim namespace is no longer required (unless zns is set to true before running zim)

EXAMPLE
// make a Wonder object
// wonderID is e-mailed to you when you sign up
// client is your client's name that you provide
// app is the app for which you are recording data
// you can also pass an optional note
var wonder = new zim.Wonder("wonderID", "client", "app");

// COUNT EXAMPLE
// for this example we count times a button is pressed
var button = new zim.Button("CLICK");
button.center(stage);
button.on("click", function(){
	// records an entry for this keyword in your stats
	// along with date, time, session, etc.
	wonder.count("wow");
});

// TIME EXAMPLE
// assuming we have our Wonder object from above
// (you only need one Wonder object)
// start the timer counting for a keyword called "test"
// this will record nothing until you timeEnd()
// or you timeStart() again
// you can also timePause() and timeUnpause()
// see DOCS for more functionality and information
wonder.timeStart("test");

// add the circle
var circle = new zim.Circle(100, "red");
circle.center(stage);
circle.drag();
circle.on("pressup", function(){
	if (circle.hitTestRect(square)) {
		// if the shapes are hitting then end the timer
		// this will send data to your Wonder report
		wonder.timeEnd("test");
	}
});

// add the square to a random location on stage
var square = new zim.Rectangle(100, "yellow");
stage.addChild(square);
square.x = zim.rand(stageW-square.width);
square.y = zim.rand(stageH-square.height);

// ORDER EXAMPLE
// assuming we have our Wonder object from above
// (you only need one Wonder object)

// make tabs
var tabs = new zim.Tabs(400, 40, ["MOUSE", "CAT", "MONKEY"]);
tabs.selectedIndex = -1; // start with no selection
tabs.center(stage);
var count = 0; // perhaps get the first four presses
tabs.on("change", function(){
	// record which tab was pressed
	// this gets stored under keyword animal
	wonder.order("animal", tabs.text);
	count++;
	// turn the order recording off for "animal"
	if (count == 4) wonder.orderOff("animal");
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
wid - string with your company wonder ID for example z14i46m3z29
	  this is the ID you are e-mailed when you sign up or sign in with your company name
	  this is NOT your company name that you log into Wonder with
	  NOTE: recording to a non-registered wid on the ZIM server will not work and there is no error message
client - the client the app is for - if it is for your company, just put your company
app - the app or site the Wonder stats are for
server - a server with zim Wonder running
	Note: the default value for the server parameter has been removed as it risks being out-of-date
	If you have signed up for ZIM Wonder at http://zimjs.com/code/wonder/ then
	import http://d309knd7es5f10.cloudfront.net/zimserver_url.js in your code (script tag up top)
	this gives a global zimWonderURL variable to pass into the server parameter
	the zimserver_url.js script will always hold the latest domain:port for the zim server
notes - (default null) any extra notes like any user data (limit 256 characters as it is stored each record)

METHODS
count(keyword) - sends a line to the server script with the given keyword as well as date and time
timeStart(keyword) - starts timing for the specified keyword (nothing sent to server yet)
timePause(keyword) - pauses the timing for this keyword
timeUnpause(keyword) - unpauses the timing for this keyword
timeEnd(keyword) - ends timing for the specific keyword and sends the time to the server
	NOTE: if the user exits the app (or leaves page) nothing gets sent to the server
		  due to unreliable beforeUnload events in the HTML world (otherwise all this would be batched)
order(keyword, item) - sends a line to the server for this item along with a unique order id for the keyword for the user

countOff(keyword) - prevents counts from being sent for this keyword
countOn(keyword) - allows counts from being sent for this keyword (default)
timeOff(keyword) - prevents sending time to the server for this keyword
timeOn(keyword) - allows sending time to the server for this keyword (default)
orderOff(keyword) - prevents sending orders to the server for this keyword
orderOn(keyword) - allows sending orders for this keyword (default)

dispose() - clear any event listeners, etc.
--*///+82
	zim.Wonder = function(wid, client, app, notes, server) {

		var sig = "wid, client, app, notes, server";
		var duo; if (duo = zob(zim.Wonder, arguments, sig, this)) return duo;
		z_d("82");
		if (zot(wid)) {zog("zim.Wonder() - please provide Wonder ID (see http://zimjs.com/code/wonder/)"); return;}
		if (zot(server)) server = "http://54.237.229.197:3001/wonder"; // adjust to amazon server
		var that = this;
		if (zot(zim.wonderSession)) zim.wonderSession = "W"+zim.rand(100000,999999); // session id
		var data = [];
		// buffer to send at most every second
		var wonderInterval = setInterval(sendData,1000);
		var sendCount = 0;
		function sendData() {
			if (data.length > 0) {
				zim.async(server + "?wonder=" + JSON.stringify(data));
				data = [];
				sendCount++;
			}
		}
		var lastKeyword;
		var wonderCheck = setInterval(function(){
			if (sendCount > 28) {
				data.push({id:wid, c:client, a:app, n:notes, k:lastKeyword, t:"e", v:"frequency max - terminated", s:zim.wonderSession});
				zog("zim.Wonder() - frequency max - terminated");
				that.dispose();
			}
			sendCount=0;
		}, 30*1000); // 30 seconds
		this.countsOff = {};
		this.timesOff = {};
		this.ordersOff = {};
		function kw(k,t){
			if (zot(k)) {
				zog("zim.Wonder "+t+" - please provide a keyword"); return false;
			} else { // check if in off lists
				if (that[t+"sOff"][k]) return false;
				return true;
			}
		}
		this.count = function(keyword) {
			if (!kw(keyword, "count")) return;
			lastKeyword = keyword;
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"c", v:1, s:zim.wonderSession});
		}
		var times = {};
		this.timeStart = function(keyword) {
			if (!kw(keyword, "time")) return;
			that.timeEnd(keyword);
			lastKeyword = keyword;
			times[keyword] = new Date().getTime();
		}
		var pauseTimes = {};
		this.timePause = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (pauseTimes[keyword]) return; // already pausing
			pauseTimes[keyword] = new Date().getTime();
		}
		this.timeUnpause = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (!pauseTimes[keyword]) return; // no pauses
			var pausedTime = new Date().getTime() - pauseTimes[keyword];
			if (times[keyword]) times[keyword] += pausedTime;
			delete pauseTimes[keyword];
		}
		this.timeEnd = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (!times[keyword]) return;
			var t1 = (pauseTimes[keyword]) ? pauseTimes[keyword] : new Date().getTime();
			var time = Math.round((t1 - times[keyword])/1000);
			delete pauseTimes[keyword];
			delete times[keyword];
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"t", v:time, s:zim.wonderSession});
		}
		this.order = function(keyword, item) {
			if (!kw(keyword, "order")) return;
			lastKeyword = keyword;
			if (zot(item)) {zog("zim.Wonder order() - please provide an item"); return;}
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"o", v:item, s:zim.wonderSession});
		}
		this.countOff = function(keyword) {that.countsOff[keyword] = 1;}
		this.countOn = function(keyword) {delete that.countOff[keyword];}
		this.timeOff = function(keyword) {that.timesOff[keyword] = 1;}
		this.timeOn = function(keyword) {delete that.timesOff[keyword];}
		this.orderOff = function(keyword) {that.ordersOff[keyword] = 1;}
		this.orderOn = function(keyword) {delete that.ordersOff[keyword];}

		this.dispose = function() {
			sendData();
			clearInterval(wonderInterval);
			clearInterval(wonderCheck);
		}
	}//-82

	return zim;
} (zim || {});
if (!window.zns) zimplify();
