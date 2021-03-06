///<reference path="Assert.ts"/>
///<reference path="../src/SqlLexer.ts"/>

console.log('----- unit tests for lexer -----');

Assert.runCase('scan blank', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan(' \r\n\t ');
    Assert.isEqual(tokens.length, 0);
});

Assert.runCase('scan identity', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan('name');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'name', 1]);

    tokens = lexer.scan('Name');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'name', 1]);

    tokens = lexer.scan(' _name ');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, '_name', 1]);

    tokens = lexer.scan('_name_');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, '_name_', 1]);

    tokens = lexer.scan('hello123');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'hello123', 1]);

    tokens = lexer.scan('_hello_world');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, '_hello_world', 1])

    tokens = lexer.scan('hello world');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'hello', 1]);
    Assert.isEqual(tokens[1], [TK_IDENTITY, 'world', 1]);

    tokens = lexer.scan('_');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, '_', 1]);

    tokens = lexer.scan('__');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, '__', 1]);

    tokens = lexer.scan('_123');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IDENTITY, '_123', 1]);

    tokens = lexer.scan('123abc');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, '123abc', 1]);

    tokens = lexer.scan('123_');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, '123_', 1]);

    tokens = lexer.scan('123你好');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, '123你好', 1]);

    tokens = lexer.scan('abc你好');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, 'abc你好', 1]);

    tokens = lexer.scan('abc 你好');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'abc', 1]);
    Assert.isEqual(tokens[1], [TK_ERROR, '你好', 1]);

    tokens = lexer.scan('你好');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, '你好', 1]);
});


Assert.runCase('scan keyword', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan('select');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_SELECT, 'select', 1]);

    tokens = lexer.scan('SELECT');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_SELECT, 'select', 1]);

    tokens = lexer.scan('from');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_FROM, 'from', 1]);

    tokens = lexer.scan('where');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_WHERE, 'where', 1]);

    tokens = lexer.scan('as');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_AS, 'as', 1]);

    tokens = lexer.scan('distinct');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_DISTINCT, 'distinct', 1]);

    tokens = lexer.scan('left');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_LEFT, 'left', 1]);

    tokens = lexer.scan('join');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_JOIN, 'join', 1]);

    tokens = lexer.scan('on');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ON, 'on', 1]);

    tokens = lexer.scan('case');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_CASE, 'case', 1]);

    tokens = lexer.scan('when');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_WHEN, 'when', 1]);

    tokens = lexer.scan('else');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ELSE, 'else', 1]);

    tokens = lexer.scan('end');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_END, 'end', 1]);

    tokens = lexer.scan('is');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IS, 'is', 1]);

    tokens = lexer.scan('not');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_NOT, 'not', 1]);

    tokens = lexer.scan('null');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_NULL, 'null', 1]);

    tokens = lexer.scan('true');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_TRUE, 'true', 1]);

    tokens = lexer.scan('false');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_FALSE, 'false', 1]);

    tokens = lexer.scan('and');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_AND, 'and', 1]);

    tokens = lexer.scan('or');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_OR, 'or', 1]);

    tokens = lexer.scan('between');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_BETWEEN, 'between', 1]);

    tokens = lexer.scan('in');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_IN, 'in', 1]);

    tokens = lexer.scan('like');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_LIKE, 'like', 1]);

    tokens = lexer.scan('group');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_GROUP, 'group', 1]);

    tokens = lexer.scan('by');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_BY, 'by', 1]);

    tokens = lexer.scan('having');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_HAVING, 'having', 1]);

    tokens = lexer.scan('order');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ORDER, 'order', 1]);

    tokens = lexer.scan('asc');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ASC, 'asc', 1]);

    tokens = lexer.scan('desc');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_DESC, 'desc', 1]);

    tokens = lexer.scan('limit');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_LIMIT, 'limit', 1]);
});

Assert.runCase('scan number', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan('123');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_INT, '123', 1]);

    tokens = lexer.scan('1.23');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_FLOAT, '1.23', 1]);

    tokens = lexer.scan('1.23.');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, '1.23.', 1]);

    tokens = lexer.scan('+123');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[1], [TK_INT, '123', 1]);

    tokens = lexer.scan('-123');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[1], [TK_INT, '123', 1]);

    tokens = lexer.scan('+1.23');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[1], [TK_FLOAT, '1.23', 1]);

    tokens = lexer.scan('123 4.56');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_INT, '123', 1]);
    Assert.isEqual(tokens[1], [TK_FLOAT, '4.56', 1]);

});

Assert.runCase('scan operator', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan('+');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);

    tokens = lexer.scan(' + ');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);

    tokens = lexer.scan('-');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_SUB, '-', 1]);

    tokens = lexer.scan(' - ');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_SUB, '-', 1]);

    tokens = lexer.scan('*');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_MUL, '*', 1]);

    tokens = lexer.scan('/');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_DIV, '/', 1]);

    tokens = lexer.scan('%');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_MOD, '%', 1]);

    tokens = lexer.scan('>');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_GT, '>', 1]);

    tokens = lexer.scan('>=');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_GE, '>=', 1]);

    tokens = lexer.scan('>>');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_MOVE_RIGHT, '>>', 1]);

    tokens = lexer.scan('<');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_LT, '<', 1]);

    tokens = lexer.scan('<=');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_LE, '<=', 1]);

    tokens = lexer.scan('<>');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_NE, '<>', 1]);

    tokens = lexer.scan('<<');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_MOVE_LEFT, '<<', 1]);

    tokens = lexer.scan('1+2');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[2], [TK_INT, '2', 1]);

    tokens = lexer.scan('1 + 2');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[2], [TK_INT, '2', 1]);

    tokens = lexer.scan('1 - 2');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[2], [TK_INT, '2', 1]);

    tokens = lexer.scan('1 + +2');
    Assert.isEqual(tokens.length, 4);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[2], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[3], [TK_INT, '2', 1]);

    tokens = lexer.scan('1 + -2');
    Assert.isEqual(tokens.length, 4);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[2], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[3], [TK_INT, '2', 1]);

    tokens = lexer.scan('+1 + -2');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[1], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[2], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[3], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[4], [TK_INT, '2', 1]);

    tokens = lexer.scan('+1+-2');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[1], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[2], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[3], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[4], [TK_INT, '2', 1]);

    tokens = lexer.scan('+1.2+-3.4');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[1], [TK_FLOAT, '1.2', 1]);
    Assert.isEqual(tokens[2], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[3], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[4], [TK_FLOAT, '3.4', 1]);

    tokens = lexer.scan('+a--b');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_ADD, '+', 1]);
    Assert.isEqual(tokens[1], [TK_IDENTITY, 'a', 1]);
    Assert.isEqual(tokens[2], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[3], [TK_SUB, '-', 1]);
    Assert.isEqual(tokens[4], [TK_IDENTITY, 'b', 1]);

    tokens = lexer.scan('1 << 2');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_MOVE_LEFT, '<<', 1]);
    Assert.isEqual(tokens[2], [TK_INT, '2', 1]);

    tokens = lexer.scan('1 < < 2');
    Assert.isEqual(tokens.length, 4);
    Assert.isEqual(tokens[0], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[1], [TK_LT, '<', 1]);
    Assert.isEqual(tokens[2], [TK_LT, '<', 1]);
    Assert.isEqual(tokens[3], [TK_INT, '2', 1]);
});

Assert.runCase('scan separator', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan(',');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_COMMA, ',', 1]);

    tokens = lexer.scan('?');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_HOLD, '?', 1]);

    tokens = lexer.scan('()');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_OPEN_PAREN, '(', 1]);
    Assert.isEqual(tokens[1], [TK_CLOSE_PAREN, ')', 1]);

    tokens = lexer.scan('(a,1)');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_OPEN_PAREN, '(', 1]);
    Assert.isEqual(tokens[1], [TK_IDENTITY, 'a', 1]);
    Assert.isEqual(tokens[2], [TK_COMMA, ',', 1]);
    Assert.isEqual(tokens[3], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[4], [TK_CLOSE_PAREN, ')', 1]);

    tokens = lexer.scan(' ( a , 1 ) ');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_OPEN_PAREN, '(', 1]);
    Assert.isEqual(tokens[1], [TK_IDENTITY, 'a', 1]);
    Assert.isEqual(tokens[2], [TK_COMMA, ',', 1]);
    Assert.isEqual(tokens[3], [TK_INT, '1', 1]);
    Assert.isEqual(tokens[4], [TK_CLOSE_PAREN, ')', 1]);

    tokens = lexer.scan('a = ?');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'a', 1]);
    Assert.isEqual(tokens[1], [TK_EQ, '=', 1]);
    Assert.isEqual(tokens[2], [TK_HOLD, '?', 1]);

    tokens = lexer.scan('t.id = ?');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 't', 1]);
    Assert.isEqual(tokens[1], [TK_DOT, '.', 1]);
    Assert.isEqual(tokens[2], [TK_IDENTITY, 'id', 1]);
    Assert.isEqual(tokens[3], [TK_EQ, '=', 1]);
    Assert.isEqual(tokens[4], [TK_HOLD, '?', 1]);

    tokens = lexer.scan('a,\nb');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'a', 1]);
    Assert.isEqual(tokens[1], [TK_COMMA, ',', 1]);
    Assert.isEqual(tokens[2], [TK_IDENTITY, 'b', 2]);

    tokens = lexer.scan('t.id');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 't', 1]);
    Assert.isEqual(tokens[1], [TK_DOT, '.', 1]);
    Assert.isEqual(tokens[2], [TK_IDENTITY, 'id', 1]);

    tokens = lexer.scan('t.*');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 't', 1]);
    Assert.isEqual(tokens[1], [TK_DOT, '.', 1]);
    Assert.isEqual(tokens[2], [TK_MUL, '*', 1]);

    tokens = lexer.scan('t.123');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 't', 1]);
    Assert.isEqual(tokens[1], [TK_DOT, '.', 1]);
    Assert.isEqual(tokens[2], [TK_ERROR, '123', 1]);

    tokens = lexer.scan('count(*)');
    Assert.isEqual(tokens.length, 4);
    Assert.isEqual(tokens[0], [TK_IDENTITY, 'count', 1]);
    Assert.isEqual(tokens[1], [TK_OPEN_PAREN, '(', 1]);
    Assert.isEqual(tokens[2], [TK_MUL, '*', 1]);
    Assert.isEqual(tokens[3], [TK_CLOSE_PAREN, ')', 1]);

    tokens = lexer.scan('(?, ?)');
    Assert.isEqual(tokens.length, 5);
    Assert.isEqual(tokens[0], [TK_OPEN_PAREN, '(', 1]);
    Assert.isEqual(tokens[1], [TK_HOLD, '?', 1]);
    Assert.isEqual(tokens[2], [TK_COMMA, ',', 1]);
    Assert.isEqual(tokens[3], [TK_HOLD, '?', 1]);
    Assert.isEqual(tokens[4], [TK_CLOSE_PAREN, ')', 1]);
});

Assert.runCase('scan comment', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan('/*abc*/');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_COMMENT, '/*abc*/', 1]);

    tokens = lexer.scan(' /* ab * c */ ');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_COMMENT, '/* ab * c */', 1]);

    tokens = lexer.scan(' /* ab\n\n* c */ ');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_COMMENT, '/* ab\n\n* c */', 1]);

    tokens = lexer.scan('/**/');
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_COMMENT, '/**/', 1]);

    tokens = lexer.scan('/ **/');
    Assert.isEqual(tokens.length, 2);
    Assert.isEqual(tokens[0], [TK_DIV, '/', 1]);
    Assert.isEqual(tokens[1], [TK_ERROR, '**/', 1]);

    tokens = lexer.scan('/ * */');
    Assert.isEqual(tokens.length, 3);
    Assert.isEqual(tokens[0], [TK_DIV, '/', 1]);
    Assert.isEqual(tokens[1], [TK_MUL, '*', 1]);
    Assert.isEqual(tokens[2], [TK_ERROR, '*/', 1]);
});

Assert.runCase('scan string', function () {
    let lexer = new SqlLexer();
    let tokens = lexer.scan("''");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_STRING, "''", 1]);

    tokens = lexer.scan("'abc'");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_STRING, "'abc'", 1]);

    tokens = lexer.scan("'123'");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_STRING, "'123'", 1]);

    tokens = lexer.scan("'hello你好123!'");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_STRING, "'hello你好123!'", 1]);


    tokens = lexer.scan("'abc\\n123'");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_STRING, "'abc\\n123'", 1]);

    tokens = lexer.scan("'abc\n123'");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_ERROR, "'abc\n123'", 1]);

    tokens = lexer.scan("'abc\\'123\\''");
    Assert.isEqual(tokens.length, 1);
    Assert.isEqual(tokens[0], [TK_STRING, "'abc\\'123\\''", 1]);
});