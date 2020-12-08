import './ModeratorApp.css.proxy.js';
/* src\js\ModeratorApp.svelte generated by Svelte v3.29.6 */
import {
	SvelteComponent,
	attr,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import Peer from "../../web_modules/peerjs.js";
import Connection from "./Connection.js";
import settings from "./settings.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (79:4) {:else}
function create_else_block_1(ctx) {
	let div1;

	return {
		c() {
			div1 = element("div");
			div1.innerHTML = `<div class="spinner-border text-primary"><span class="sr-only">Loading...</span></div>`;
			attr(div1, "class", "loader svelte-hu8mga");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

// (65:4) {#if isPeerReady}
function create_if_block(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*connections*/ ctx[1].length) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (74:8) {:else}
function create_else_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<p>Ожидание соединений</p>`;
			attr(div, "class", "p-5 text-center");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (66:8) {#if connections.length}
function create_if_block_1(ctx) {
	let div;
	let current;
	let each_value = /*connections*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "connections svelte-hu8mga");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*username, connections, onConneсtionClose*/ 6) {
				each_value = /*connections*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (69:20) {#if connection.dataConnection && connection.mediaConnection}
function create_if_block_2(ctx) {
	let connection;
	let current;

	connection = new Connection({
			props: {
				username,
				dataConnection: /*connection*/ ctx[4].dataConnection,
				mediaConnection: /*connection*/ ctx[4].mediaConnection,
				closed: /*connection*/ ctx[4].isClosed
			}
		});

	connection.$on("close", /*onConneсtionClose*/ ctx[2]);

	return {
		c() {
			create_component(connection.$$.fragment);
		},
		m(target, anchor) {
			mount_component(connection, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const connection_changes = {};
			if (dirty & /*connections*/ 2) connection_changes.dataConnection = /*connection*/ ctx[4].dataConnection;
			if (dirty & /*connections*/ 2) connection_changes.mediaConnection = /*connection*/ ctx[4].mediaConnection;
			if (dirty & /*connections*/ 2) connection_changes.closed = /*connection*/ ctx[4].isClosed;
			connection.$set(connection_changes);
		},
		i(local) {
			if (current) return;
			transition_in(connection.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(connection.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(connection, detaching);
		}
	};
}

// (68:16) {#each connections as connection}
function create_each_block(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*connection*/ ctx[4].dataConnection && /*connection*/ ctx[4].mediaConnection && create_if_block_2(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*connection*/ ctx[4].dataConnection && /*connection*/ ctx[4].mediaConnection) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*connections*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isPeerReady*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "moderator svelte-hu8mga");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if_blocks[current_block_type_index].d();
		}
	};
}

let username = "Админ";

function instance($$self, $$props, $$invalidate) {
	const peer = new Peer(settings.moderatorId, settings.callOptions);
	let isPeerReady = false;
	let connections = [];

	function onConneсtionClose(event) {
		$$invalidate(1, connections = connections.map(connection => {
			if (connection.peer === event.detail.peer) {
				return { ...connection, isClosed: true };
			}

			return connection;
		}));
	}

	peer.on("connection", function (connection) {
		console.log("connection");

		$$invalidate(1, connections = [
			...connections,
			{
				dataConnection: connection,
				peer: connection.peer
			}
		]);
	});

	peer.on("call", function (mediaConnection) {
		console.log("call");

		$$invalidate(1, connections = connections.map(connection => {
			if (connection.peer === mediaConnection.peer) {
				return { ...connection, mediaConnection };
			}

			return connection;
		}));
	});

	peer.on("open", function (id) {
		console.log("open");
		$$invalidate(0, isPeerReady = true);
	});

	peer.on("error", function (err) {
		console.error(err);
	});

	return [isPeerReady, connections, onConneсtionClose];
}

class ModeratorApp extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default ModeratorApp;