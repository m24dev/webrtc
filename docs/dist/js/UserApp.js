import './UserApp.css.proxy.js';
/* src\js\UserApp.svelte generated by Svelte v3.29.6 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	binding_callbacks,
	check_outros,
	create_bidirectional_transition,
	create_component,
	destroy_component,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	noop,
	run_all,
	safe_not_equal,
	set_input_value,
	space,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { afterUpdate } from "../../web_modules/svelte.js";
import { fade } from "../../web_modules/svelte/transition.js";
import Peer from "../../web_modules/peerjs.js";
import Connection from "./Connection.js";
import settings from "./settings.js";

function create_else_block_1(ctx) {
	let div1;

	return {
		c() {
			div1 = element("div");
			div1.innerHTML = `<div class="spinner-border text-primary"><span class="sr-only">Loading...</span></div>`;
			attr(div1, "class", "loader");
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

// (107:0) {#if isPeerReady}
function create_if_block(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (!(/*isDataConnectionStarted*/ ctx[4] && /*isMediaConnectionStarted*/ ctx[5])) return 0;
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

// (115:4) {:else}
function create_else_block(ctx) {
	let connection;
	let current;

	connection = new Connection({
			props: {
				username: /*username*/ ctx[3],
				dataConnection: /*dataConnection*/ ctx[6],
				mediaConnection: /*mediaConnection*/ ctx[7],
				closed: /*isClosed*/ ctx[2]
			}
		});

	connection.$on("close", /*onConneсtionClose*/ ctx[9]);

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
			if (dirty & /*username*/ 8) connection_changes.username = /*username*/ ctx[3];
			if (dirty & /*dataConnection*/ 64) connection_changes.dataConnection = /*dataConnection*/ ctx[6];
			if (dirty & /*mediaConnection*/ 128) connection_changes.mediaConnection = /*mediaConnection*/ ctx[7];
			if (dirty & /*isClosed*/ 4) connection_changes.closed = /*isClosed*/ ctx[2];
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

// (108:4) {#if !(isDataConnectionStarted && isMediaConnectionStarted)}
function create_if_block_1(ctx) {
	let div1;
	let input;
	let t0;
	let div0;
	let button;
	let div1_transition;
	let current;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			input = element("input");
			t0 = space();
			div0 = element("div");
			button = element("button");
			button.textContent = "Начать";
			attr(input, "type", "text");
			attr(input, "class", "form-control");
			attr(input, "placeholder", "Ваше имя");
			attr(input, "aria-label", "Ваше имя");
			attr(button, "type", "button");
			attr(button, "class", "btn btn-primary shadow-sm");
			attr(div0, "class", "input-group-append");
			attr(div1, "class", "input-start input-group svelte-1jj00aa");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, input);
			/*input_binding*/ ctx[10](input);
			set_input_value(input, /*username*/ ctx[3]);
			append(div1, t0);
			append(div1, div0);
			append(div0, button);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[11]),
					listen(input, "keypress", /*makeConnection*/ ctx[8]),
					listen(button, "click", /*makeConnection*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*username*/ 8 && input.value !== /*username*/ ctx[3]) {
				set_input_value(input, /*username*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, true);
				div1_transition.run(1);
			});

			current = true;
		},
		o(local) {
			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, false);
			div1_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			/*input_binding*/ ctx[10](null);
			if (detaching && div1_transition) div1_transition.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isPeerReady*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
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

function instance($$self, $$props, $$invalidate) {
	const query = new URLSearchParams(location.search);
	const outID = `operator${query.get("id")}`;

	afterUpdate(() => {
		if (isPeerReady && !isDataConnectionStarted) {
			inputName.focus();
		}
	});

	const peer = new Peer(settings.callOptions);
	let inputName;
	let isPeerReady = false;
	let isClosed = false;
	let username;
	let isDataConnectionStarted = false;
	let isMediaConnectionStarted = false;
	let dataConnection;
	let mediaConnection;

	// Older browsers might not implement mediaDevices at all, so we set an empty object first
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
	}

	// Some browsers partially implement mediaDevices. We can't just assign an object
	// with getUserMedia as it would overwrite existing properties.
	// Here, we will just add the getUserMedia property if it's missing.
	if (navigator.mediaDevices.getUserMedia === undefined) {
		navigator.mediaDevices.getUserMedia = function (constraints) {
			// First get ahold of the legacy getUserMedia, if present
			var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			// Some browsers just don't implement it - return a rejected promise with an error
			// to keep a consistent interface
			if (!getUserMedia) {
				return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
			}

			// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
			return new Promise(function (resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
		};
	}

	function makeConnection(e) {
		if (e.type === "keypress" && e.keyCode != 13) return;

		navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (mediaStream) {
			$$invalidate(6, dataConnection = peer.connect(outID, { metadata: { username } }));

			if (dataConnection) {
				$$invalidate(4, isDataConnectionStarted = true);
			}

			$$invalidate(7, mediaConnection = peer.call(outID, mediaStream));

			if (mediaConnection) {
				$$invalidate(5, isMediaConnectionStarted = true);
			}
		}).catch(function (err) {
			alert.log(err.name + ": " + err.message);
		});
	}

	function onConneсtionClose() {
		$$invalidate(2, isClosed = true);
	}

	peer.on("open", function (id) {
		console.log("open");
		$$invalidate(1, isPeerReady = true);
	});

	peer.on("error", function (err) {
		console.error(err);
	});

	peer.on("close", function () {
		console.log("close");
	});

	peer.on("disconnected", function () {
		console.log("disconnected");
	});

	function input_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			inputName = $$value;
			$$invalidate(0, inputName);
		});
	}

	function input_input_handler() {
		username = this.value;
		$$invalidate(3, username);
	}

	return [
		inputName,
		isPeerReady,
		isClosed,
		username,
		isDataConnectionStarted,
		isMediaConnectionStarted,
		dataConnection,
		mediaConnection,
		makeConnection,
		onConneсtionClose,
		input_binding,
		input_input_handler
	];
}

class UserApp extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default UserApp;