module.exports = {
	"type": "Program",
	"start": 0,
	"end": 321,
	"body": [{
		"type": "ExpressionStatement",
		"start": 0,
		"end": 321,
		"expression": {
			"type": "AssignmentExpression",
			"start": 0,
			"end": 321,
			"operator": "=",
			"left": {
				"type": "MemberExpression",
				"start": 0,
				"end": 14,
				"object": {
					"type": "Identifier",
					"start": 0,
					"end": 6,
					"name": "module"
				},
				"property": {
					"type": "Identifier",
					"start": 7,
					"end": 14,
					"name": "exports"
				},
				"computed": false
			},
			"right": {
				"type": "ObjectExpression",
				"start": 17,
				"end": 321,
				"properties": [{
					"type": "Property",
					"start": 21,
					"end": 48,
					"method": false,
					"shorthand": false,
					"computed": false,
					"key": {
						"type": "Identifier",
						"start": 21,
						"end": 25,
						"name": "name"
					},
					"value": {
						"type": "Literal",
						"start": 27,
						"end": 48,
						"value": "upaas-simple-button",
						"raw": "'upaas-simple-button'"
					},
					"kind": "init"
				}, {
					"type": "Property",
					"start": 52,
					"end": 104,
					"method": false,
					"shorthand": false,
					"computed": false,
					"key": {
						"type": "Identifier",
						"start": 52,
						"end": 57,
						"name": "props"
					},
					"value": {
						"type": "ObjectExpression",
						"start": 59,
						"end": 104,
						"properties": [{
							"type": "Property",
							"start": 65,
							"end": 77,
							"method": false,
							"shorthand": false,
							"computed": false,
							"key": {
								"type": "Identifier",
								"start": 65,
								"end": 69,
								"name": "text"
							},
							"value": {
								"type": "Identifier",
								"start": 71,
								"end": 77,
								"name": "String"
							},
							"kind": "init"
						}, {
							"type": "Property",
							"start": 83,
							"end": 100,
							"method": false,
							"shorthand": false,
							"computed": false,
							"key": {
								"type": "Identifier",
								"start": 83,
								"end": 92,
								"name": "className"
							},
							"value": {
								"type": "Identifier",
								"start": 94,
								"end": 100,
								"name": "String"
							},
							"kind": "init"
						}]
					},
					"kind": "init"
				}, {
					"type": "Property",
					"start": 108,
					"end": 187,
					"method": false,
					"shorthand": false,
					"computed": false,
					"key": {
						"type": "Identifier",
						"start": 108,
						"end": 115,
						"name": "methods"
					},
					"value": {
						"type": "ObjectExpression",
						"start": 117,
						"end": 187,
						"properties": [{
							"type": "Property",
							"start": 123,
							"end": 183,
							"method": true,
							"shorthand": false,
							"computed": false,
							"key": {
								"type": "Identifier",
								"start": 123,
								"end": 135,
								"name": "clickHandler"
							},
							"kind": "init",
							"value": {
								"type": "FunctionExpression",
								"start": 136,
								"end": 183,
								"id": null,
								"generator": false,
								"expression": false,
								"params": [{
									"type": "Identifier",
									"start": 137,
									"end": 138,
									"name": "e"
								}],
								"body": {
									"type": "BlockStatement",
									"start": 140,
									"end": 183,
									"body": [{
										"type": "ExpressionStatement",
										"start": 148,
										"end": 177,
										"expression": {
											"type": "CallExpression",
											"start": 148,
											"end": 177,
											"callee": {
												"type": "MemberExpression",
												"start": 148,
												"end": 158,
												"object": {
													"type": "ThisExpression",
													"start": 148,
													"end": 152
												},
												"property": {
													"type": "Identifier",
													"start": 153,
													"end": 158,
													"name": "$emit"
												},
												"computed": false
											},
											"arguments": [{
												"type": "Literal",
												"start": 159,
												"end": 173,
												"value": "clickHandler",
												"raw": "'clickHandler'"
											}, {
												"type": "Identifier",
												"start": 175,
												"end": 176,
												"name": "e"
											}]
										}
									}]
								}
							}
						}]
					},
					"kind": "init"
				}, {
					"type": "Property",
					"start": 191,
					"end": 319,
					"method": true,
					"shorthand": false,
					"computed": false,
					"key": {
						"type": "Identifier",
						"start": 191,
						"end": 197,
						"name": "render"
					},
					"kind": "init",
					"value": {
						"type": "FunctionExpression",
						"start": 198,
						"end": 319,
						"id": null,
						"generator": false,
						"expression": false,
						"params": [{
							"type": "Identifier",
							"start": 199,
							"end": 200,
							"name": "h"
						}],
						"body": {
							"type": "BlockStatement",
							"start": 202,
							"end": 319,
							"body": [{
								"type": "ReturnStatement",
								"start": 208,
								"end": 315,
								"argument": {
									"type": "CallExpression",
									"start": 215,
									"end": 315,
									"callee": {
										"type": "Identifier",
										"start": 215,
										"end": 216,
										"name": "h"
									},
									"arguments": [{
										"type": "Literal",
										"start": 217,
										"end": 220,
										"value": "a",
										"raw": "'a'"
									}, {
										"type": "ObjectExpression",
										"start": 222,
										"end": 314,
										"properties": [{
											"type": "Property",
											"start": 230,
											"end": 250,
											"method": false,
											"shorthand": false,
											"computed": false,
											"key": {
												"type": "Literal",
												"start": 230,
												"end": 237,
												"value": "class",
												"raw": "'class'"
											},
											"value": {
												"type": "Literal",
												"start": 239,
												"end": 250,
												"value": "className",
												"raw": "'className'"
											},
											"kind": "init"
										}, {
											"type": "Property",
											"start": 258,
											"end": 308,
											"method": false,
											"shorthand": false,
											"computed": false,
											"key": {
												"type": "Literal",
												"start": 258,
												"end": 262,
												"value": "on",
												"raw": "'on'"
											},
											"value": {
												"type": "ObjectExpression",
												"start": 264,
												"end": 308,
												"properties": [{
													"type": "Property",
													"start": 274,
													"end": 300,
													"method": false,
													"shorthand": false,
													"computed": false,
													"key": {
														"type": "Literal",
														"start": 274,
														"end": 281,
														"value": "click",
														"raw": "'click'"
													},
													"value": {
														"type": "MemberExpression",
														"start": 283,
														"end": 300,
														"object": {
															"type": "ThisExpression",
															"start": 283,
															"end": 287
														},
														"property": {
															"type": "Identifier",
															"start": 288,
															"end": 300,
															"name": "clickHandler"
														},
														"computed": false
													},
													"kind": "init"
												}]
											},
											"kind": "init"
										}]
									}]
								}
							}]
						}
					}
				}]
			}
		}
	}],
	"sourceType": "script"
}