(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.r.aR === region.n.aR)
	{
		return 'on line ' + region.r.aR;
	}
	return 'on lines ' + region.r.aR + ' through ' + region.n.aR;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.c4,
		impl.dz,
		impl.dv,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


var _Benchmark_getTimestamp =
  typeof performance !== "undefined"
    ? performance.now.bind(performance)
    : Date.now;

// sample : Int -> Operation -> Task Error Float
var _Benchmark_sample = F2(function(n, fn) {
  return _Scheduler_binding(function(callback) {
    var start = _Benchmark_getTimestamp();

    try {
      for (var i = 0; i < n; i++) {
        fn();
      }
    } catch (error) {
      if (error instanceof RangeError) {
        callback(_Scheduler_fail($elm_explorations$benchmark$Benchmark$LowLevel$StackOverflow));
      } else {
        callback(_Scheduler_fail($elm_explorations$benchmark$Benchmark$LowLevel$UnknownError(error.message)));
      }
      return;
    }

    var end = _Benchmark_getTimestamp();

    callback(_Scheduler_succeed(end - start));
  });
});

// operation : (() -> a) -> Operation
function _Benchmark_operation(thunk) {
  return thunk;
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.v) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.x),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.x);
		} else {
			var treeLen = builder.v * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.y) : builder.y;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.v);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.x) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.x);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{y: nodeList, v: (len / $elm$core$Array$branchFactor) | 0, x: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm_explorations$benchmark$Benchmark$Benchmark$Group = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm_explorations$benchmark$Benchmark$describe = $elm_explorations$benchmark$Benchmark$Benchmark$Group;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$BenchmarkRunner$emit = _Platform_outgoingPort('emit', $elm$core$Basics$identity);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Benchmark$Runner$Node$ConsoleReport = 1;
var $author$project$Benchmark$Runner$Node$JsonReport = 0;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm_explorations$benchmark$Benchmark$Samples$count = function (_v0) {
	var samples = _v0;
	return A3(
		$elm$core$Dict$foldl,
		F3(
			function (_v1, times, acc) {
				return $elm$core$List$length(times) + acc;
			}),
		0,
		samples);
};
var $elm_explorations$benchmark$Benchmark$Status$numBuckets = 25;
var $elm_explorations$benchmark$Benchmark$Status$samplesPerBucket = 5;
var $elm_explorations$benchmark$Benchmark$Status$progress = function (status) {
	switch (status.$) {
		case 0:
			return 0;
		case 1:
			return 0;
		case 2:
			var samples = status.b;
			return A3(
				$elm$core$Basics$clamp,
				0,
				1,
				$elm_explorations$benchmark$Benchmark$Samples$count(samples) / ($elm_explorations$benchmark$Benchmark$Status$numBuckets * $elm_explorations$benchmark$Benchmark$Status$samplesPerBucket));
		case 3:
			return 1;
		default:
			return 1;
	}
};
var $elm_explorations$benchmark$Benchmark$done = function (benchmark_) {
	switch (benchmark_.$) {
		case 0:
			var status = benchmark_.c;
			return $elm_explorations$benchmark$Benchmark$Status$progress(status) === 1;
		case 1:
			var benchmarks = benchmark_.b;
			return A2(
				$elm$core$List$all,
				$elm$core$Basics$eq(1),
				A2(
					$elm$core$List$map,
					$elm_explorations$benchmark$Benchmark$Status$progress,
					A2(
						$elm$core$List$map,
						function (_v1) {
							var status = _v1.c;
							return status;
						},
						benchmarks)));
		default:
			var benchmarks = benchmark_.b;
			return A2($elm$core$List$all, $elm_explorations$benchmark$Benchmark$done, benchmarks);
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm_explorations$benchmark$Benchmark$Reporting$Group = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm_explorations$benchmark$Benchmark$Reporting$Series = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm_explorations$benchmark$Benchmark$Reporting$Single = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm_explorations$benchmark$Benchmark$Reporting$fromBenchmark = function (internal) {
	switch (internal.$) {
		case 0:
			var name = internal.a;
			var status = internal.c;
			return A2($elm_explorations$benchmark$Benchmark$Reporting$Single, name, status);
		case 1:
			var name = internal.a;
			var benchmarks = internal.b;
			return A2(
				$elm_explorations$benchmark$Benchmark$Reporting$Series,
				name,
				A2(
					$elm$core$List$map,
					function (_v1) {
						var childName = _v1.a;
						var status = _v1.c;
						return _Utils_Tuple2(childName, status);
					},
					benchmarks));
		default:
			var name = internal.a;
			var benchmarks = internal.b;
			return A2(
				$elm_explorations$benchmark$Benchmark$Reporting$Group,
				name,
				A2($elm$core$List$map, $elm_explorations$benchmark$Benchmark$Reporting$fromBenchmark, benchmarks));
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$Benchmark$Runner$Node$block = function (i) {
	switch (i) {
		case 1:
			return '▏';
		case 2:
			return '▎';
		case 3:
			return '▍';
		case 4:
			return '▌';
		case 5:
			return '▋';
		case 6:
			return '▊';
		case 7:
			return '▉';
		case 8:
			return '█';
		default:
			return '';
	}
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$String$length = _String_length;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $author$project$Benchmark$Runner$Node$progressBar = F2(
	function (width, progress) {
		var percentDone = $elm$core$Basics$floor(progress * 100);
		var doneWhen = $elm$core$Basics$floor((progress * 8) * width);
		var toGo = width - $elm$core$Basics$ceiling(doneWhen / 8);
		return $elm$core$String$concat(
			_List_fromArray(
				[
					'▕',
					A2($elm$core$String$repeat, (doneWhen / 8) | 0, '█'),
					$author$project$Benchmark$Runner$Node$block(
					A2($elm$core$Basics$modBy, 8, doneWhen)),
					A2($elm$core$String$repeat, toGo, '·'),
					'▏',
					A3(
					$elm$core$String$padLeft,
					4,
					' ',
					$elm$core$String$fromInt(percentDone) + '%')
				]));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Benchmark$Runner$Node$averageBy = F2(
	function (asFloat, list) {
		if (!list.b) {
			return 0;
		} else {
			return $elm$core$List$sum(
				A2($elm$core$List$map, asFloat, list)) / $elm$core$List$length(list);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Benchmark$Runner$Node$reportToProgress = function (report) {
	switch (report.$) {
		case 0:
			var status = report.b;
			return $elm_explorations$benchmark$Benchmark$Status$progress(status);
		case 1:
			var namedStatuses = report.b;
			return A2(
				$author$project$Benchmark$Runner$Node$averageBy,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm_explorations$benchmark$Benchmark$Status$progress),
				namedStatuses);
		default:
			var reports = report.b;
			return A2($author$project$Benchmark$Runner$Node$averageBy, $author$project$Benchmark$Runner$Node$reportToProgress, reports);
	}
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Benchmark$Runner$Node$running = function (benchmark) {
	var report = $elm_explorations$benchmark$Benchmark$Reporting$fromBenchmark(benchmark);
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('running')),
				_Utils_Tuple2(
				'data',
				$elm$json$Json$Encode$string(
					'\u000D' + A2(
						$author$project$Benchmark$Runner$Node$progressBar,
						72,
						$author$project$Benchmark$Runner$Node$reportToProgress(report))))
			]));
};
var $author$project$Console$bold = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[1m', str, '\u001B[22m']));
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Benchmark$Runner$Node$indent = function (level) {
	return $elm$core$Basics$append(
		A2($elm$core$String$repeat, level, '    '));
};
var $author$project$Benchmark$Runner$Node$makePrettyIntroLines = function (structure) {
	switch (structure.$) {
		case 0:
			var name = structure.a;
			return _List_fromArray(
				[name]);
		case 2:
			var thisGroup = structure.a;
			var reports = structure.b;
			return A2(
				$elm$core$List$cons,
				'↳ ' + thisGroup,
				A2(
					$elm$core$List$concatMap,
					A2(
						$elm$core$Basics$composeR,
						$author$project$Benchmark$Runner$Node$makePrettyIntroLines,
						$elm$core$List$map(
							$author$project$Benchmark$Runner$Node$indent(1))),
					reports));
		default:
			var name = structure.a;
			var variations = structure.b;
			return A2(
				$elm$core$List$cons,
				'Series - ' + name,
				A2(
					$elm$core$List$map,
					function (_v1) {
						var subname = _v1.a;
						return A2($author$project$Benchmark$Runner$Node$indent, 1, 'Variation: ' + subname);
					},
					variations));
	}
};
var $author$project$Benchmark$Runner$Node$makePrettyIntro = function (b) {
	return A2(
		$elm$core$String$join,
		'\n',
		$author$project$Benchmark$Runner$Node$makePrettyIntroLines(
			$elm_explorations$benchmark$Benchmark$Reporting$fromBenchmark(b)));
};
var $author$project$Benchmark$Runner$Node$start = function (report) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('start')),
				_Utils_Tuple2(
				'data',
				$elm$json$Json$Encode$string(
					$author$project$Console$bold('\n⏱  Running benchmarks...\n\n') + ($author$project$Benchmark$Runner$Node$makePrettyIntro(report) + '\n')))
			]));
};
var $author$project$Benchmark$Runner$Node$Update = $elm$core$Basics$identity;
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Benchmark$Runner$Node$breakForRender = function (task) {
	return A2(
		$elm$core$Task$andThen,
		$elm$core$Basics$always(task),
		$elm$core$Process$sleep(0));
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm_explorations$benchmark$Benchmark$Benchmark$Series = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm_explorations$benchmark$Benchmark$Benchmark$Single = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm_explorations$benchmark$Benchmark$Status$Failure = function (a) {
	return {$: 3, a: a};
};
var $elm_explorations$benchmark$Benchmark$Status$MeasurementError = function (a) {
	return {$: 0, a: a};
};
var $elm_explorations$benchmark$Benchmark$Status$Pending = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm_explorations$benchmark$Benchmark$Status$Unsized = {$: 1};
var $elm_explorations$benchmark$Benchmark$Status$bucketSpacingRatio = 2;
var $elm_explorations$benchmark$Benchmark$Samples$Samples = $elm$core$Basics$identity;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm_explorations$benchmark$Benchmark$Samples$empty = $elm$core$Dict$empty;
var $elm_explorations$benchmark$Benchmark$Status$AnalysisError = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$benchmark$Benchmark$Status$Success = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $BrianHicks$elm_trend$Trend$Linear$line = function (_v0) {
	var precalculated = _v0.a;
	return precalculated;
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $elm_explorations$benchmark$Benchmark$Samples$pointify = function (samples) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (sampleSize, values, acc) {
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (b) {
							return _Utils_Tuple2(sampleSize, b);
						},
						values),
					acc);
			}),
		_List_Nil,
		samples);
};
var $BrianHicks$elm_trend$Trend$Linear$predictY = F2(
	function (_v0, x) {
		var slope = _v0.by;
		var intercept = _v0.bs;
		return (slope * x) + intercept;
	});
var $BrianHicks$elm_trend$Trend$Math$AllZeros = {$: 1};
var $BrianHicks$elm_trend$Trend$Math$NeedMoreValues = function (a) {
	return {$: 0, a: a};
};
var $BrianHicks$elm_trend$Trend$Linear$Robust = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $BrianHicks$elm_trend$Trend$Linear$Trend = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					return $elm$core$Maybe$Just(
						A3(func, a, b, c));
				}
			}
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $BrianHicks$elm_trend$Trend$Linear$Line = F2(
	function (slope, intercept) {
		return {bs: intercept, by: slope};
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $BrianHicks$elm_trend$Trend$Math$mean = function (numbers) {
	if (!numbers.b) {
		return $elm$core$Result$Err(
			$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(1));
	} else {
		return $elm$core$Result$Ok(
			$elm$core$List$sum(numbers) / $elm$core$List$length(numbers));
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $BrianHicks$elm_trend$Trend$Linear$percentile = F2(
	function (k, xs) {
		var index = $elm$core$List$length(xs) * k;
		return (!(index - $elm$core$Basics$floor(index))) ? $elm$core$List$head(
			A2(
				$elm$core$List$drop,
				$elm$core$Basics$ceiling(index) - 1,
				xs)) : $elm$core$Result$toMaybe(
			$BrianHicks$elm_trend$Trend$Math$mean(
				A2(
					$elm$core$List$take,
					2,
					A2(
						$elm$core$List$drop,
						$elm$core$Basics$floor(index) - 1,
						xs))));
	});
var $BrianHicks$elm_trend$Trend$Linear$theilSenLine = F3(
	function (pct, slopes, points) {
		var slope = A2($BrianHicks$elm_trend$Trend$Linear$percentile, pct, slopes);
		var intercept = A2(
			$elm$core$Maybe$andThen,
			$BrianHicks$elm_trend$Trend$Linear$percentile(pct),
			A2(
				$elm$core$Maybe$map,
				$elm$core$List$sort,
				A2(
					$elm$core$Maybe$map,
					function (m) {
						return A2(
							$elm$core$List$map,
							function (_v0) {
								var x = _v0.a;
								var y = _v0.b;
								return y - (m * x);
							},
							points);
					},
					slope)));
		return A3($elm$core$Maybe$map2, $BrianHicks$elm_trend$Trend$Linear$Line, slope, intercept);
	});
var $BrianHicks$elm_trend$Trend$Linear$robust = function (values) {
	if (!values.b) {
		return $elm$core$Result$Err(
			$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(2));
	} else {
		if (!values.b.b) {
			return $elm$core$Result$Err(
				$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(2));
		} else {
			var slopes = $elm$core$List$sort(
				A3(
					$elm$core$List$foldl,
					F2(
						function (_v1, acc1) {
							var x = _v1.a;
							var y = _v1.b;
							return A3(
								$elm$core$List$foldl,
								F2(
									function (_v2, acc2) {
										var x1 = _v2.a;
										var y1 = _v2.b;
										var res = (y - y1) / (x - x1);
										return $elm$core$Basics$isNaN(res) ? acc2 : A2($elm$core$List$cons, res, acc2);
									}),
								acc1,
								values);
						}),
					_List_Nil,
					values));
			var finiteSlopes = A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Basics$isInfinite),
				slopes);
			return A2(
				$elm$core$Result$fromMaybe,
				$BrianHicks$elm_trend$Trend$Math$AllZeros,
				A4(
					$elm$core$Maybe$map3,
					F3(
						function (trendLine, lower, upper) {
							return A2(
								$BrianHicks$elm_trend$Trend$Linear$Trend,
								trendLine,
								A2($BrianHicks$elm_trend$Trend$Linear$Robust, lower, upper));
						}),
					A3($BrianHicks$elm_trend$Trend$Linear$theilSenLine, 0.5, finiteSlopes, values),
					A3($BrianHicks$elm_trend$Trend$Linear$theilSenLine, 0.975, slopes, values),
					A3($BrianHicks$elm_trend$Trend$Linear$theilSenLine, 0.025, slopes, values)));
		}
	}
};
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $elm_explorations$benchmark$Benchmark$Samples$groups = function (_v0) {
	var samples = _v0;
	return A2(
		$elm$core$Result$withDefault,
		_Utils_Tuple2(samples, $elm$core$Dict$empty),
		A2(
			$elm$core$Result$map,
			A2(
				$elm$core$Dict$foldl,
				F3(
					function (key, _v1, _v2) {
						var good = _v1.a;
						var outliers = _v1.b;
						var accGood = _v2.a;
						var accOutliers = _v2.b;
						return _Utils_Tuple2(
							A3($elm$core$Dict$insert, key, good, accGood),
							A3($elm$core$Dict$insert, key, outliers, accOutliers));
					}),
				_Utils_Tuple2($elm$core$Dict$empty, $elm$core$Dict$empty)),
			A2(
				$elm$core$Result$map,
				function (line) {
					return A2(
						$elm$core$Dict$map,
						F2(
							function (sampleSize, values) {
								var predicted = A2($BrianHicks$elm_trend$Trend$Linear$predictY, line, sampleSize);
								var upperBound = predicted * 1.1;
								var lowerBound = predicted / 1.1;
								return A2(
									$elm$core$List$partition,
									function (v) {
										return (_Utils_cmp(lowerBound, v) < 0) && (_Utils_cmp(v, upperBound) < 0);
									},
									values);
							}),
						samples);
				},
				A2(
					$elm$core$Result$map,
					$BrianHicks$elm_trend$Trend$Linear$line,
					$BrianHicks$elm_trend$Trend$Linear$robust(
						$elm_explorations$benchmark$Benchmark$Samples$pointify(samples))))));
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm_explorations$benchmark$Benchmark$Samples$points = function (samples) {
	return A2(
		$elm$core$Tuple$mapSecond,
		$elm_explorations$benchmark$Benchmark$Samples$pointify,
		A2(
			$elm$core$Tuple$mapFirst,
			$elm_explorations$benchmark$Benchmark$Samples$pointify,
			$elm_explorations$benchmark$Benchmark$Samples$groups(samples)));
};
var $BrianHicks$elm_trend$Trend$Linear$Quick = $elm$core$Basics$identity;
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $BrianHicks$elm_trend$Trend$Math$stddev = function (numbers) {
	var helper = function (seriesMean) {
		return A2(
			$elm$core$Result$map,
			$elm$core$Basics$sqrt,
			$BrianHicks$elm_trend$Trend$Math$mean(
				A2(
					$elm$core$List$map,
					function (n) {
						return A2($elm$core$Basics$pow, n - seriesMean, 2);
					},
					numbers)));
	};
	return A2(
		$elm$core$Result$andThen,
		helper,
		$BrianHicks$elm_trend$Trend$Math$mean(numbers));
};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $BrianHicks$elm_trend$Trend$Math$correlation = function (values) {
	if (!values.b) {
		return $elm$core$Result$Err(
			$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(2));
	} else {
		if (!values.b.b) {
			return $elm$core$Result$Err(
				$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(2));
		} else {
			var standardize = F3(
				function (meanResult, stddevResult, series) {
					return A3(
						$elm$core$Result$map2,
						F2(
							function (meanValue, stddevValue) {
								return A2(
									$elm$core$List$map,
									function (point) {
										return (point - meanValue) / stddevValue;
									},
									series);
							}),
						meanResult,
						stddevResult);
				});
			var _v1 = $elm$core$List$unzip(values);
			var xs = _v1.a;
			var ys = _v1.b;
			var summedProduct = A2(
				$elm$core$Result$map,
				$elm$core$List$sum,
				A3(
					$elm$core$Result$map2,
					F2(
						function (stdX, stdY) {
							return A3($elm$core$List$map2, $elm$core$Basics$mul, stdX, stdY);
						}),
					A3(
						standardize,
						$BrianHicks$elm_trend$Trend$Math$mean(xs),
						$BrianHicks$elm_trend$Trend$Math$stddev(xs),
						xs),
					A3(
						standardize,
						$BrianHicks$elm_trend$Trend$Math$mean(ys),
						$BrianHicks$elm_trend$Trend$Math$stddev(ys),
						ys)));
			return A2(
				$elm$core$Result$andThen,
				function (val) {
					return $elm$core$Basics$isNaN(val) ? $elm$core$Result$Err($BrianHicks$elm_trend$Trend$Math$AllZeros) : $elm$core$Result$Ok(val);
				},
				A2(
					$elm$core$Result$map,
					function (sum) {
						return sum / $elm$core$List$length(values);
					},
					summedProduct));
		}
	}
};
var $elm$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 1) {
					var x = rc.a;
					return $elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					return $elm$core$Result$Ok(
						A3(func, a, b, c));
				}
			}
		}
	});
var $BrianHicks$elm_trend$Trend$Linear$quick = function (values) {
	if (!values.b) {
		return $elm$core$Result$Err(
			$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(2));
	} else {
		if (!values.b.b) {
			return $elm$core$Result$Err(
				$BrianHicks$elm_trend$Trend$Math$NeedMoreValues(2));
		} else {
			var _v1 = $elm$core$List$unzip(values);
			var xs = _v1.a;
			var ys = _v1.b;
			var slopeResult = A4(
				$elm$core$Result$map3,
				F3(
					function (correl, stddevY, stddevX) {
						return (correl * stddevY) / stddevX;
					}),
				$BrianHicks$elm_trend$Trend$Math$correlation(values),
				$BrianHicks$elm_trend$Trend$Math$stddev(ys),
				$BrianHicks$elm_trend$Trend$Math$stddev(xs));
			var intercept = A4(
				$elm$core$Result$map3,
				F3(
					function (meanY, slope, meanX) {
						return meanY - (slope * meanX);
					}),
				$BrianHicks$elm_trend$Trend$Math$mean(ys),
				slopeResult,
				$BrianHicks$elm_trend$Trend$Math$mean(xs));
			return A2(
				$elm$core$Result$map,
				function (trendLine) {
					return A2($BrianHicks$elm_trend$Trend$Linear$Trend, trendLine, values);
				},
				A3($elm$core$Result$map2, $BrianHicks$elm_trend$Trend$Linear$Line, slopeResult, intercept));
		}
	}
};
var $elm_explorations$benchmark$Benchmark$Samples$trend = function (samples) {
	return $BrianHicks$elm_trend$Trend$Linear$quick(
		$elm_explorations$benchmark$Benchmark$Samples$points(samples).a);
};
var $elm_explorations$benchmark$Benchmark$finalize = function (samples) {
	var _v0 = $elm_explorations$benchmark$Benchmark$Samples$trend(samples);
	if (!_v0.$) {
		var trend = _v0.a;
		return A2($elm_explorations$benchmark$Benchmark$Status$Success, samples, trend);
	} else {
		var err = _v0.a;
		return $elm_explorations$benchmark$Benchmark$Status$Failure(
			$elm_explorations$benchmark$Benchmark$Status$AnalysisError(err));
	}
};
var $elm_explorations$benchmark$Benchmark$LowLevel$defaultMinimum = 1;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm_explorations$benchmark$Benchmark$LowLevel$StackOverflow = {$: 0};
var $elm_explorations$benchmark$Benchmark$LowLevel$UnknownError = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$benchmark$Benchmark$LowLevel$sample = F2(
	function (n, operation_) {
		return A2(_Benchmark_sample, n, operation_);
	});
var $elm$core$Basics$round = _Basics_round;
var $elm_explorations$benchmark$Benchmark$LowLevel$standardizeSampleSize = function (sampleSize) {
	var helper = F2(
		function (rough, magnitude) {
			helper:
			while (true) {
				if (rough > 10) {
					var $temp$rough = $elm$core$Basics$round(rough / 10),
						$temp$magnitude = magnitude * 10;
					rough = $temp$rough;
					magnitude = $temp$magnitude;
					continue helper;
				} else {
					return rough * magnitude;
				}
			}
		});
	return A2(helper, sampleSize, 1);
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm_explorations$benchmark$Benchmark$LowLevel$findSampleSizeWithMinimum = F2(
	function (minimumRuntime, operation_) {
		var sampleSize = function (i) {
			return i * 10;
		};
		var resample = F2(
			function (iteration, total) {
				return (_Utils_cmp(total, minimumRuntime) < 0) ? A2(
					$elm$core$Task$andThen,
					resample(iteration + 1),
					A2(
						$elm$core$Task$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$List$minimum,
							$elm$core$Maybe$withDefault(0)),
						$elm$core$Task$sequence(
							A2(
								$elm$core$List$repeat,
								3,
								A2(
									$elm_explorations$benchmark$Benchmark$LowLevel$sample,
									sampleSize(iteration),
									operation_))))) : $elm$core$Task$succeed(
					sampleSize(iteration));
			});
		return A2(
			$elm$core$Task$map,
			$elm_explorations$benchmark$Benchmark$LowLevel$standardizeSampleSize,
			A2(resample, 1, 0));
	});
var $elm_explorations$benchmark$Benchmark$LowLevel$findSampleSize = $elm_explorations$benchmark$Benchmark$LowLevel$findSampleSizeWithMinimum($elm_explorations$benchmark$Benchmark$LowLevel$defaultMinimum);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm_explorations$benchmark$Benchmark$Samples$record = F3(
	function (sampleSize, sample, _v0) {
		var samplesDict = _v0;
		return A3(
			$elm$core$Dict$update,
			sampleSize,
			function (value) {
				if (value.$ === 1) {
					return $elm$core$Maybe$Just(
						_List_fromArray(
							[sample]));
				} else {
					var samples_ = value.a;
					return $elm$core$Maybe$Just(
						A2($elm$core$List$cons, sample, samples_));
				}
			},
			samplesDict);
	});
var $elm_explorations$benchmark$Benchmark$LowLevel$warmup = function (operation_) {
	var toCollect = 1000;
	var sampleSize = 10000;
	var helper = function (soFar) {
		return (_Utils_cmp(soFar, toCollect) > -1) ? $elm$core$Task$succeed(0) : A2(
			$elm$core$Task$andThen,
			helper,
			A2(
				$elm$core$Task$map,
				$elm$core$Basics$add(soFar),
				A2($elm_explorations$benchmark$Benchmark$LowLevel$sample, sampleSize, operation_)));
	};
	return helper(0);
};
var $elm_explorations$benchmark$Benchmark$stepLowLevel = F2(
	function (operation, status) {
		switch (status.$) {
			case 0:
				return A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, $elm_explorations$benchmark$Benchmark$Status$Failure),
						$elm_explorations$benchmark$Benchmark$Status$MeasurementError),
					A2(
						$elm$core$Task$map,
						function (_v1) {
							return $elm_explorations$benchmark$Benchmark$Status$Unsized;
						},
						$elm_explorations$benchmark$Benchmark$LowLevel$warmup(operation)));
			case 1:
				return A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, $elm_explorations$benchmark$Benchmark$Status$Failure),
						$elm_explorations$benchmark$Benchmark$Status$MeasurementError),
					A2(
						$elm$core$Task$map,
						function (sampleSize) {
							return A2($elm_explorations$benchmark$Benchmark$Status$Pending, sampleSize, $elm_explorations$benchmark$Benchmark$Samples$empty);
						},
						$elm_explorations$benchmark$Benchmark$LowLevel$findSampleSize(operation)));
			case 2:
				var baseSampleSize = status.a;
				var samples = status.b;
				var sampleSize = baseSampleSize * (($elm_explorations$benchmark$Benchmark$Status$bucketSpacingRatio * A2(
					$elm$core$Basics$modBy,
					$elm_explorations$benchmark$Benchmark$Status$numBuckets,
					$elm_explorations$benchmark$Benchmark$Samples$count(samples))) + 1);
				return A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, $elm_explorations$benchmark$Benchmark$Status$Failure),
						$elm_explorations$benchmark$Benchmark$Status$MeasurementError),
					A2(
						$elm$core$Task$map,
						function (newSample) {
							var newSamples = A3($elm_explorations$benchmark$Benchmark$Samples$record, sampleSize, newSample, samples);
							return (_Utils_cmp(
								$elm_explorations$benchmark$Benchmark$Samples$count(newSamples),
								$elm_explorations$benchmark$Benchmark$Status$numBuckets * $elm_explorations$benchmark$Benchmark$Status$samplesPerBucket) > -1) ? $elm_explorations$benchmark$Benchmark$finalize(newSamples) : A2($elm_explorations$benchmark$Benchmark$Status$Pending, baseSampleSize, newSamples);
						},
						A2($elm_explorations$benchmark$Benchmark$LowLevel$sample, sampleSize, operation)));
			default:
				return $elm$core$Task$succeed(status);
		}
	});
var $elm_explorations$benchmark$Benchmark$step = function (benchmark_) {
	switch (benchmark_.$) {
		case 0:
			var name = benchmark_.a;
			var inner = benchmark_.b;
			var status = benchmark_.c;
			return A2(
				$elm$core$Task$map,
				A2($elm_explorations$benchmark$Benchmark$Benchmark$Single, name, inner),
				A2($elm_explorations$benchmark$Benchmark$stepLowLevel, inner, status));
		case 1:
			var name = benchmark_.a;
			var benchmarks = benchmark_.b;
			return A2(
				$elm$core$Task$map,
				$elm_explorations$benchmark$Benchmark$Benchmark$Series(name),
				$elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var name_ = _v1.a;
							var inner = _v1.b;
							var status = _v1.c;
							return A2(
								$elm$core$Task$map,
								function (status_) {
									return _Utils_Tuple3(name_, inner, status_);
								},
								A2($elm_explorations$benchmark$Benchmark$stepLowLevel, inner, status));
						},
						benchmarks)));
		default:
			var name = benchmark_.a;
			var benchmarks = benchmark_.b;
			return A2(
				$elm$core$Task$map,
				$elm_explorations$benchmark$Benchmark$Benchmark$Group(name),
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm_explorations$benchmark$Benchmark$step, benchmarks)));
	}
};
var $author$project$Benchmark$Runner$Node$stepCmd = function (benchmark) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$identity,
		$author$project$Benchmark$Runner$Node$breakForRender(
			$elm_explorations$benchmark$Benchmark$step(benchmark)));
};
var $author$project$Benchmark$Runner$Node$init = F2(
	function (model, benchmark) {
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$elm_explorations$benchmark$Benchmark$done(benchmark) ? $elm$core$Platform$Cmd$none : $author$project$Benchmark$Runner$Node$stepCmd(benchmark),
						model.az(
						$author$project$Benchmark$Runner$Node$running(benchmark)),
						model.az(
						$author$project$Benchmark$Runner$Node$start(benchmark))
					])));
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$AsciiTable$drawFooter = F2(
	function (config, items) {
		return _Utils_ap(
			config.aL.am,
			_Utils_ap(
				A2(
					$elm$core$String$join,
					config.aL.Q,
					A2(
						$elm$core$List$map,
						function (_v0) {
							var w = _v0.b;
							return A2($elm$core$String$repeat, w, config.S.aP);
						},
						items)),
				config.aL.aq));
	});
var $author$project$AsciiTable$padWithStyle = F5(
	function (hasWidth, wantsWidth, _char, style, input) {
		var diff = (wantsWidth - hasWidth) / 2;
		var left = $elm$core$Basics$floor(diff);
		var right = $elm$core$Basics$ceiling(diff);
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				left,
				$elm$core$String$fromChar(_char)),
			_Utils_ap(
				style(input),
				A2(
					$elm$core$String$repeat,
					right,
					$elm$core$String$fromChar(_char))));
	});
var $author$project$AsciiTable$drawHeader = F2(
	function (config, items) {
		var topLine = _Utils_ap(
			config.a$.am,
			_Utils_ap(
				A2(
					$elm$core$String$join,
					config.a$.Q,
					A2(
						$elm$core$List$map,
						function (_v2) {
							var w = _v2.b;
							return A2($elm$core$String$repeat, w, config.S.aP);
						},
						items)),
				config.a$.aq));
		var centerLine = _Utils_ap(
			config.S.ah,
			_Utils_ap(
				A2(
					$elm$core$String$join,
					config.S.ah,
					A2(
						$elm$core$List$map,
						function (_v1) {
							var k = _v1.a;
							var w = _v1.b;
							return A5(
								$author$project$AsciiTable$padWithStyle,
								$elm$core$String$length(k),
								w,
								' ',
								$author$project$Console$bold,
								k);
						},
						items)),
				config.S.ah));
		var bottomLine = _Utils_ap(
			config.Q.am,
			_Utils_ap(
				A2(
					$elm$core$String$join,
					config.Q.Q,
					A2(
						$elm$core$List$map,
						function (_v0) {
							var w = _v0.b;
							return A2($elm$core$String$repeat, w, config.S.aP);
						},
						items)),
				config.Q.aq));
		return A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[topLine, centerLine, bottomLine]));
	});
var $author$project$AsciiTable$padRightWithStyle = F5(
	function (hasWidth, wantsWidth, _char, style, input) {
		var diff = wantsWidth - hasWidth;
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				diff,
				$elm$core$String$fromChar(_char)),
			style(input));
	});
var $author$project$AsciiTable$drawRow = F2(
	function (config, items) {
		var mapper = function (_v1) {
			var hasWidth = _v1.bR;
			var wantsWidth = _v1.cw;
			var value = _v1.ct;
			var align = _v1.av;
			if (align === 1) {
				return A5($author$project$AsciiTable$padWithStyle, hasWidth, wantsWidth, ' ', $elm$core$Basics$identity, value);
			} else {
				return A5($author$project$AsciiTable$padRightWithStyle, hasWidth, wantsWidth, ' ', $elm$core$Basics$identity, value);
			}
		};
		var values = A2($elm$core$List$map, mapper, items);
		return _Utils_ap(
			config.S.ah,
			_Utils_ap(
				A2($elm$core$String$join, config.S.ah, values),
				config.S.ah));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$AsciiTable$transpose = function (list) {
	if (list.b && (!list.a.b)) {
		if (!list.b.b) {
			return _List_Nil;
		} else {
			return _List_Nil;
		}
	} else {
		var rows = list;
		return A2(
			$elm$core$List$cons,
			A2($elm$core$List$filterMap, $elm$core$List$head, rows),
			$author$project$AsciiTable$transpose(
				A2($elm$core$List$filterMap, $elm$core$List$tail, rows)));
	}
};
var $author$project$AsciiTable$draw = F2(
	function (config, columns) {
		var withWidth = A2(
			$elm$core$List$map,
			function (_v2) {
				var c = _v2;
				return _Utils_Tuple3(c.bb, c.a3, c.a2);
			},
			columns);
		var rows = $author$project$AsciiTable$transpose(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var c = _v0;
					return A2(
						$elm$core$List$map,
						function (_v1) {
							var width = _v1.a;
							var v = _v1.b;
							return {av: c.av, bR: width, ct: v, cw: c.a3};
						},
						c.a2);
				},
				columns));
		return A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[
					A2($author$project$AsciiTable$drawHeader, config, withWidth),
					A2(
					$elm$core$String$join,
					'\n',
					A2(
						$elm$core$List$map,
						$author$project$AsciiTable$drawRow(config),
						rows)),
					A2($author$project$AsciiTable$drawFooter, config, withWidth)
				]));
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $BrianHicks$elm_trend$Trend$Linear$goodnessOfFit = function (_v0) {
	var fit = _v0.a;
	var values = _v0.b;
	var _v1 = $elm$core$List$unzip(values);
	var xs = _v1.a;
	var ys = _v1.b;
	var predictions = A2(
		$elm$core$List$map,
		$BrianHicks$elm_trend$Trend$Linear$predictY(fit),
		xs);
	var meanY = A2(
		$elm$core$Result$withDefault,
		0,
		$BrianHicks$elm_trend$Trend$Math$mean(ys));
	var sumSquareResiduals = $elm$core$List$sum(
		A3(
			$elm$core$List$map2,
			F2(
				function (actual, prediction) {
					return A2($elm$core$Basics$pow, actual - prediction, 2);
				}),
			ys,
			predictions));
	var sumSquareTotal = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (y) {
				return A2($elm$core$Basics$pow, y - meanY, 2);
			},
			ys));
	return 1 - (sumSquareResiduals / sumSquareTotal);
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $BrianHicks$elm_trend$Trend$Linear$predictX = F2(
	function (_v0, y) {
		var slope = _v0.by;
		var intercept = _v0.bs;
		return (y - intercept) / slope;
	});
var $author$project$Benchmark$Runner$Node$runsPerSecond = function (trend) {
	return $elm$core$Basics$floor(
		function (a) {
			return A2($BrianHicks$elm_trend$Trend$Linear$predictX, a, 1000);
		}(
			$BrianHicks$elm_trend$Trend$Linear$line(trend)));
};
var $author$project$Benchmark$Runner$Node$encodeSeriesItem = function (_v0) {
	var name = _v0.a;
	var trend = _v0.b;
	var change = _v0.c;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'tag',
				$elm$json$Json$Encode$string('single')),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(name)),
				_Utils_Tuple2(
				'runsPerSecond',
				$elm$json$Json$Encode$int(
					$author$project$Benchmark$Runner$Node$runsPerSecond(trend))),
				_Utils_Tuple2(
				'goodnessOfFit',
				$elm$json$Json$Encode$float(
					$BrianHicks$elm_trend$Trend$Linear$goodnessOfFit(trend))),
				_Utils_Tuple2(
				'change',
				$elm$json$Json$Encode$string(change))
			]));
};
var $author$project$Benchmark$Runner$Node$encodeError = function (e) {
	return $elm$json$Json$Encode$string(
		function () {
			if (!e.$) {
				if (!e.a.$) {
					var _v1 = e.a;
					return 'The benchmark caused a stack overflow';
				} else {
					var msg = e.a.a;
					return 'Ran into an unknown error: ' + msg;
				}
			} else {
				if (!e.a.$) {
					var n = e.a.a;
					return 'Not enough values, I need at least ' + $elm$core$String$fromInt(n);
				} else {
					var _v2 = e.a;
					return 'The benchmark results are all zero! I can\'t make a trend out of those.';
				}
			}
		}());
};
var $author$project$Benchmark$Runner$Node$encodeStatus = function (status) {
	switch (status.$) {
		case 0:
			return _List_Nil;
		case 1:
			return _List_Nil;
		case 2:
			return _List_Nil;
		case 3:
			var e = status.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'error',
					$author$project$Benchmark$Runner$Node$encodeError(e))
				]);
		default:
			var trend = status.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'runsPerSecond',
					$elm$json$Json$Encode$int(
						$author$project$Benchmark$Runner$Node$runsPerSecond(trend))),
					_Utils_Tuple2(
					'goodnessOfFit',
					$elm$json$Json$Encode$float(
						$BrianHicks$elm_trend$Trend$Linear$goodnessOfFit(trend)))
				]);
	}
};
var $author$project$Benchmark$Runner$Node$getTrend = function (status) {
	switch (status.$) {
		case 0:
			return $elm$core$Result$Err($elm$core$Maybe$Nothing);
		case 1:
			return $elm$core$Result$Err($elm$core$Maybe$Nothing);
		case 2:
			return $elm$core$Result$Err($elm$core$Maybe$Nothing);
		case 3:
			var e = status.a;
			return $elm$core$Result$Err(
				$elm$core$Maybe$Just(e));
		default:
			var trend = status.b;
			return $elm$core$Result$Ok(trend);
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Benchmark$Runner$Node$percent = A2(
	$elm$core$Basics$composeR,
	$elm$core$Basics$mul(10000),
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Basics$round,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Basics$toFloat,
			A2(
				$elm$core$Basics$composeR,
				function (a) {
					return a / 100;
				},
				A2(
					$elm$core$Basics$composeR,
					$elm$core$String$fromFloat,
					function (a) {
						return a + '%';
					})))));
var $author$project$Benchmark$Runner$Node$percentChange = F2(
	function (old, _new) {
		var rps = A2(
			$elm$core$Basics$composeR,
			$BrianHicks$elm_trend$Trend$Linear$line,
			function (a) {
				return A2($BrianHicks$elm_trend$Trend$Linear$predictX, a, 1000);
			});
		var change = (rps(_new) - rps(old)) / rps(old);
		var sign = (change > 0) ? '+' : '';
		return _Utils_eq(old, _new) ? '-' : _Utils_ap(
			sign,
			$author$project$Benchmark$Runner$Node$percent(change));
	});
var $author$project$Benchmark$Runner$Node$getTrends = function (items) {
	var combine = A2(
		$elm$core$List$foldr,
		$elm$core$Result$map2($elm$core$List$cons),
		$elm$core$Result$Ok(_List_Nil));
	var combineMap = function (f) {
		return A2(
			$elm$core$Basics$composeL,
			combine,
			$elm$core$List$map(f));
	};
	var resTrends = A2(
		combineMap,
		function (_v3) {
			var name = _v3.a;
			var status = _v3.b;
			return A2(
				$elm$core$Result$map,
				function (trend) {
					return _Utils_Tuple2(name, trend);
				},
				$author$project$Benchmark$Runner$Node$getTrend(status));
		},
		items);
	if ((!resTrends.$) && resTrends.a.b) {
		var trends = resTrends.a;
		var _v1 = trends.a;
		var first = _v1.b;
		return A2(
			$elm$core$List$map,
			function (_v2) {
				var name = _v2.a;
				var trend = _v2.b;
				return _Utils_Tuple3(
					name,
					trend,
					A2($author$project$Benchmark$Runner$Node$percentChange, first, trend));
			},
			trends);
	} else {
		return _List_Nil;
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $author$project$AsciiTable$AlignCenter = 1;
var $author$project$AsciiTable$Column = $elm$core$Basics$identity;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $author$project$Console$yellow = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[33m', str, '\u001B[39m']));
};
var $author$project$AsciiTable$intColumn = F2(
	function (name, rawValues) {
		var splitter = F2(
			function (input, accum) {
				splitter:
				while (true) {
					if ($elm$core$String$length(input) < 3) {
						return A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$cons,
								input,
								$elm$core$List$reverse(accum)));
					} else {
						var $temp$input = A2($elm$core$String$dropRight, 3, input),
							$temp$accum = A2(
							$elm$core$List$cons,
							A2($elm$core$String$right, 3, input),
							accum);
						input = $temp$input;
						accum = $temp$accum;
						continue splitter;
					}
				}
			});
		var values1 = A2(
			$elm$core$List$map,
			function (v) {
				var asString = function (x) {
					return A2(splitter, x, _List_Nil);
				}(
					$elm$core$String$fromInt(v));
				return _Utils_Tuple2(
					$elm$core$String$length(asString),
					$author$project$Console$yellow(asString));
			},
			rawValues);
		var widestValue = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$maximum(
				A2($elm$core$List$map, $elm$core$Tuple$first, values1)));
		var values2 = A2(
			$elm$core$List$map,
			function (_v0) {
				var w = _v0.a;
				var v = _v0.b;
				return _Utils_Tuple2(
					w,
					$author$project$Console$yellow(
						A3($elm$core$String$padLeft, widestValue - w, ' ', v)));
			},
			values1);
		var width = A2(
			$elm$core$Basics$max,
			$elm$core$String$length(name),
			widestValue);
		return {av: 1, bb: name, a2: values2, a3: width + 2};
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $author$project$AsciiTable$percentColumn = F2(
	function (name, rawValues) {
		var values = A2(
			$elm$core$List$map,
			function (v) {
				var asString = '0.' + A3(
					$elm$core$String$padRight,
					3,
					'0',
					$elm$core$String$fromInt(
						$elm$core$Basics$round(1000 * v)));
				return _Utils_Tuple2(
					$elm$core$String$length(asString),
					$author$project$Console$yellow(asString));
			},
			rawValues);
		var width = A2(
			$elm$core$Maybe$withDefault,
			$elm$core$String$length(name),
			$elm$core$List$maximum(
				A2(
					$elm$core$List$cons,
					$elm$core$String$length(name),
					A2($elm$core$List$map, $elm$core$Tuple$first, values))));
		return {av: 1, bb: name, a2: values, a3: width + 2};
	});
var $author$project$AsciiTable$stringColumn = F2(
	function (name, rawValues) {
		var values = A2(
			$elm$core$List$map,
			function (asString) {
				return _Utils_Tuple2(
					$elm$core$String$length(asString),
					asString);
			},
			rawValues);
		var width = A2(
			$elm$core$Maybe$withDefault,
			$elm$core$String$length(name),
			$elm$core$List$maximum(
				A2(
					$elm$core$List$cons,
					$elm$core$String$length(name),
					A2($elm$core$List$map, $elm$core$Tuple$first, values))));
		return {av: 1, bb: name, a2: values, a3: width + 2};
	});
var $author$project$Benchmark$Runner$Node$toData = function (items) {
	var go = F2(
		function (remaining, _v0) {
			go:
			while (true) {
				var names = _v0.a;
				var trends = _v0.b;
				var changes = _v0.c;
				if (!remaining.b) {
					return _List_fromArray(
						[
							A2(
							$author$project$AsciiTable$stringColumn,
							'name',
							$elm$core$List$reverse(names)),
							A2(
							$author$project$AsciiTable$intColumn,
							'runs per second',
							$elm$core$List$reverse(
								A2($elm$core$List$map, $author$project$Benchmark$Runner$Node$runsPerSecond, trends))),
							A2(
							$author$project$AsciiTable$stringColumn,
							'change',
							$elm$core$List$reverse(changes)),
							A2(
							$author$project$AsciiTable$percentColumn,
							'goodness of fit',
							$elm$core$List$reverse(
								A2($elm$core$List$map, $BrianHicks$elm_trend$Trend$Linear$goodnessOfFit, trends)))
						]);
				} else {
					var _v2 = remaining.a;
					var name = _v2.a;
					var trend = _v2.b;
					var change = _v2.c;
					var rest = remaining.b;
					var $temp$remaining = rest,
						$temp$_v0 = _Utils_Tuple3(
						A2($elm$core$List$cons, name, names),
						A2($elm$core$List$cons, trend, trends),
						A2($elm$core$List$cons, change, changes));
					remaining = $temp$remaining;
					_v0 = $temp$_v0;
					continue go;
				}
			}
		});
	return A2(
		go,
		$author$project$Benchmark$Runner$Node$getTrends(items),
		_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil));
};
var $author$project$AsciiTable$unicodeSingleLine = {
	aL: {am: '└', Q: '┴', aq: '┘'},
	S: {aP: '─', ah: '│'},
	Q: {am: '├', Q: '┼', aq: '┤'},
	cl: {aP: '─', ah: '│'},
	a$: {am: '┌', Q: '┬', aq: '┐'}
};
var $author$project$Benchmark$Runner$Node$encodeReport = function (report) {
	switch (report.$) {
		case 0:
			var name = report.a;
			var status = report.b;
			return $elm$json$Json$Encode$object(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'tag',
						$elm$json$Json$Encode$string('single')),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string(name)),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'name1',
								$elm$json$Json$Encode$string(name)),
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									'pretty',
									$elm$json$Json$Encode$string(
										A2(
											$author$project$AsciiTable$draw,
											$author$project$AsciiTable$unicodeSingleLine,
											$author$project$Benchmark$Runner$Node$toData(
												_List_fromArray(
													[
														_Utils_Tuple2(name, status)
													]))))),
								$author$project$Benchmark$Runner$Node$encodeStatus(status))))));
		case 1:
			var name = report.a;
			var items = report.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'tag',
						$elm$json$Json$Encode$string('series')),
						_Utils_Tuple2(
						'name',
						$elm$json$Json$Encode$string(name)),
						_Utils_Tuple2(
						'series',
						A2(
							$elm$json$Json$Encode$list,
							$author$project$Benchmark$Runner$Node$encodeSeriesItem,
							$author$project$Benchmark$Runner$Node$getTrends(items))),
						_Utils_Tuple2(
						'pretty',
						$elm$json$Json$Encode$string(
							A2(
								$author$project$AsciiTable$draw,
								$author$project$AsciiTable$unicodeSingleLine,
								$author$project$Benchmark$Runner$Node$toData(items))))
					]));
		default:
			var name = report.a;
			var reports = report.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'tag',
						$elm$json$Json$Encode$string('group')),
						_Utils_Tuple2(
						'name',
						$elm$json$Json$Encode$string(name)),
						_Utils_Tuple2(
						'group',
						A2($elm$json$Json$Encode$list, $author$project$Benchmark$Runner$Node$encodeReport, reports))
					]));
	}
};
var $author$project$Benchmark$Runner$Node$encode = function (benchmark) {
	return $author$project$Benchmark$Runner$Node$encodeReport(
		$elm_explorations$benchmark$Benchmark$Reporting$fromBenchmark(benchmark));
};
var $author$project$Benchmark$Runner$Node$done = function (benchmark) {
	var report = $elm_explorations$benchmark$Benchmark$Reporting$fromBenchmark(benchmark);
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('done')),
				_Utils_Tuple2(
				'msg',
				$elm$json$Json$Encode$string(
					'\u000D' + A2(
						$author$project$Benchmark$Runner$Node$progressBar,
						72,
						$author$project$Benchmark$Runner$Node$reportToProgress(report)))),
				_Utils_Tuple2(
				'data',
				$author$project$Benchmark$Runner$Node$encode(benchmark))
			]));
};
var $author$project$Benchmark$Runner$Node$update = F2(
	function (_v0, model) {
		var benchmark = _v0;
		return $elm_explorations$benchmark$Benchmark$done(benchmark) ? _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						model.az(
						$author$project$Benchmark$Runner$Node$done(benchmark))
					]))) : _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Benchmark$Runner$Node$stepCmd(benchmark),
						model.az(
						$author$project$Benchmark$Runner$Node$running(benchmark))
					])));
	});
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Benchmark$Runner$Node$run = F2(
	function (emit, benchmark) {
		return $elm$core$Platform$worker(
			{
				c4: function (flags) {
					return A2(
						$author$project$Benchmark$Runner$Node$init,
						{
							az: emit,
							bh: (flags.bh === 'json') ? 0 : 1
						},
						benchmark);
				},
				dv: $elm$core$Basics$always($elm$core$Platform$Sub$none),
				dz: $author$project$Benchmark$Runner$Node$update
			});
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {bJ: col, cL: contextStack, $7: problem, dr: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.dr, s.bJ, x, s.k));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.g, s.b);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{bJ: 1, k: s.k, o: s.o, g: s.g + 1, dr: s.dr + 1, b: s.b}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{bJ: s.bJ + 1, k: s.k, o: s.o, g: newOffset, dr: s.dr, b: s.b}));
		};
	});
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.g, s.dr, s.bJ, s.b);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.k)) : A3(
			$elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.g, newOffset) < 0,
			0,
			{bJ: newCol, k: s.k, o: s.o, g: newOffset, dr: newRow, b: s.b});
	};
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.b);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.g, offset) < 0,
					0,
					{bJ: col, k: s0.k, o: s0.o, g: offset, dr: row, b: s0.b});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.g, s.dr, s.bJ, s);
	};
};
var $elm_explorations$benchmark$Benchmark$Status$Cold = {$: 0};
var $elm_explorations$benchmark$Benchmark$LowLevel$operation = function (fn) {
	return _Benchmark_operation(fn);
};
var $elm_explorations$benchmark$Benchmark$compare = F5(
	function (name, name1, fn1, name2, fn2) {
		return A2(
			$elm_explorations$benchmark$Benchmark$Benchmark$Series,
			name,
			_List_fromArray(
				[
					_Utils_Tuple3(
					name1,
					$elm_explorations$benchmark$Benchmark$LowLevel$operation(fn1),
					$elm_explorations$benchmark$Benchmark$Status$Cold),
					_Utils_Tuple3(
					name2,
					$elm_explorations$benchmark$Benchmark$LowLevel$operation(fn2),
					$elm_explorations$benchmark$Benchmark$Status$Cold)
				]));
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.g, s1.g, s0.b),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Parser$Token$greaterThan = A2(
	$elm$parser$Parser$Advanced$Token,
	'>',
	$elm$parser$Parser$Expecting('a `>`'));
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $author$project$Parser$Token$lessThan = A2(
	$elm$parser$Parser$Advanced$Token,
	'<',
	$elm$parser$Parser$Expecting('a `<`'));
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {bJ: col, $7: problem, dr: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.dr, p.bJ, p.$7);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{bJ: 1, k: _List_Nil, o: 1, g: 0, dr: 1, b: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.g, s.dr, s.bJ, s.b);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{bJ: newCol, k: s.k, o: s.o, g: newOffset, dr: newRow, b: s.b});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $author$project$Benchmarks$stringBetweenChars = function () {
	var withToken = A2(
		$elm$parser$Parser$Advanced$keeper,
		A2(
			$elm$parser$Parser$Advanced$ignorer,
			$elm$parser$Parser$Advanced$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$Advanced$symbol($author$project$Parser$Token$lessThan)),
		A2(
			$elm$parser$Parser$Advanced$ignorer,
			$elm$parser$Parser$Advanced$getChompedString(
				$elm$parser$Parser$Advanced$chompUntil($author$project$Parser$Token$greaterThan)),
			$elm$parser$Parser$Advanced$symbol($author$project$Parser$Token$greaterThan)));
	var withChomp = A2(
		$elm$parser$Parser$Advanced$keeper,
		A2(
			$elm$parser$Parser$Advanced$ignorer,
			$elm$parser$Parser$Advanced$succeed($elm$core$Basics$identity),
			A2(
				$elm$parser$Parser$Advanced$chompIf,
				function (c) {
					return c === '<';
				},
				$elm$parser$Parser$Expecting(
					$elm$core$String$fromChar('<')))),
		A2(
			$elm$parser$Parser$Advanced$ignorer,
			$elm$parser$Parser$Advanced$getChompedString(
				$elm$parser$Parser$Advanced$chompWhile(
					function (c) {
						return c !== '>';
					})),
			A2(
				$elm$parser$Parser$Advanced$chompIf,
				function (c) {
					return c === '>';
				},
				$elm$parser$Parser$Expecting(
					$elm$core$String$fromChar('>')))));
	return A5(
		$elm_explorations$benchmark$Benchmark$compare,
		'between chars',
		'chomp',
		function (_v0) {
			return A2($elm$parser$Parser$run, withChomp, '<foo>');
		},
		'symbol',
		function (_v1) {
			return A2($elm$parser$Parser$run, withToken, '<foo>');
		});
}();
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$BenchmarkRunner$main = A2(
	$author$project$Benchmark$Runner$Node$run,
	$author$project$BenchmarkRunner$emit,
	A2(
		$elm_explorations$benchmark$Benchmark$describe,
		'suite',
		_List_fromArray(
			[
				A2(
				$elm_explorations$benchmark$Benchmark$describe,
				'Benchmarks',
				_List_fromArray(
					[$author$project$Benchmarks$stringBetweenChars]))
			])));
_Platform_export({'BenchmarkRunner':{'init':$author$project$BenchmarkRunner$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (report) {
			return $elm$json$Json$Decode$succeed(
				{bh: report});
		},
		A2($elm$json$Json$Decode$field, 'report', $elm$json$Json$Decode$string)))(0)}});}(this));
