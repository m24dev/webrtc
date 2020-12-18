import './OperatorApp.css.proxy.js';
/* src\js\OperatorApp.svelte generated by Svelte v3.29.6 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	binding_callbacks,
	check_outros,
	create_bidirectional_transition,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { afterUpdate } from "../../web_modules/svelte.js";
import { fly } from "../../web_modules/svelte/transition.js";
import Peer from "../../web_modules/peerjs.js";
import settings from "./settings.js";

function create_else_block_1(ctx) {
	let div;
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button = element("button");
			button.textContent = "Начать";
			attr(button, "type", "button");
			attr(button, "class", "btn btn-lg btn-primary shadow-sm");
			attr(div, "class", "popup");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button);

			if (!mounted) {
				dispose = listen(button, "click", /*makeConnection*/ ctx[6]);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (128:4) {#if isStarted}
function create_if_block_4(ctx) {
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

// (105:0) {#if isPeerReady}
function create_if_block(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*isMediaReady*/ ctx[2]) return 0;
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

// (122:4) {:else}
function create_else_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<p>Ожидание соединения</p>`;
			attr(div, "class", "popup");
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

// (106:4) {#if isMediaReady}
function create_if_block_1(ctx) {
	let div;
	let video_1;
	let t0;
	let t1;
	let if_block1_anchor;
	let current;
	let if_block0 = /*isAnswered*/ ctx[3] && create_if_block_3(ctx);
	let if_block1 = isDisconnected && create_if_block_2(ctx);

	return {
		c() {
			div = element("div");
			video_1 = element("video");
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(div, "class", "video");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, video_1);
			/*video_1_binding*/ ctx[7](video_1);
			insert(target, t0, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t1, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*isAnswered*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*isAnswered*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t1.parentNode, t1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			/*video_1_binding*/ ctx[7](null);
			if (detaching) detach(t0);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t1);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

// (110:8) {#if isAnswered}
function create_if_block_3(ctx) {
	let div2;
	let div1;
	let div0;
	let t;
	let div2_transition;
	let current;

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			t = text(/*answer*/ ctx[5]);
			attr(div0, "class", "answer__inner rounded bg-primary d-flex justify-content-center align-items-center svelte-5ojqld");
			attr(div1, "class", "p-4 d-flex justify-content-center");
			attr(div2, "class", "answer svelte-5ojqld");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			append(div0, t);
			current = true;
		},
		p(ctx, dirty) {
			if (!current || dirty & /*answer*/ 32) set_data(t, /*answer*/ ctx[5]);
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, { y: 100, opacity: 0 }, true);
				div2_transition.run(1);
			});

			current = true;
		},
		o(local) {
			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, { y: 100, opacity: 0 }, false);
			div2_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (detaching && div2_transition) div2_transition.end();
		}
	};
}

// (117:8) {#if isDisconnected}
function create_if_block_2(ctx) {
	let div1;

	return {
		c() {
			div1 = element("div");
			div1.innerHTML = `<div class="alert alert-warning text-center">Соединение закрыто</div>`;
			attr(div1, "class", "popup p-4");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
		},
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_4, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isPeerReady*/ ctx[1]) return 0;
		if (/*isStarted*/ ctx[0]) return 1;
		return 2;
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

let isDisconnected = false;

function instance($$self, $$props, $$invalidate) {
	const query = new URLSearchParams(location.search);
	const id = query.get("id");
	let peer;
	let isStarted = false;
	let isPeerReady = false;
	let isMediaReady = false;
	let isMediaStarted = false;
	let isAnswered = false;
	let dataConnection;
	let mediaConnection;
	let remotePeer;
	let video;
	let remoteStream;
	let answer = "";

	afterUpdate(() => {
		if (isMediaReady && !isMediaStarted) {
			$$invalidate(4, video.srcObject = remoteStream, video);

			$$invalidate(
				4,
				video.onloadedmetadata = () => {
					video.play();
					isMediaStarted = true;
				},
				video
			);
		}
	});

	function makeConnection() {
		$$invalidate(0, isStarted = true);
		peer = new Peer(`operator${id}`, settings.callOptions);

		peer.on("open", function () {
			console.log("open");
			$$invalidate(1, isPeerReady = true);
		});

		peer.on("connection", function (dataConnection) {
			console.log("connection");
			dataConnection = dataConnection;
			remotePeer = dataConnection.peer;
			dataConnection.on("data", handleData);

			dataConnection.on("close", () => {
				
			});

			dataConnection.on("error", err => {
				console.log(err);
			});
		});

		peer.on("call", function (mediaConnection) {
			console.log("call");

			if (remotePeer === mediaConnection.peer) {
				mediaConnection = mediaConnection;

				mediaConnection.on("stream", stream => {
					if (remoteStream) return false;
					console.log("stream");
					remoteStream = stream;
					$$invalidate(2, isMediaReady = true);
				});

				mediaConnection.on("error", err => {
					console.error(err);
				});

				mediaConnection.answer();
			}
		});

		peer.on("error", err => {
			console.error(err);
		});

		peer.on("disconnected", function () {
			console.log("disconnected");
		});
	}

	function handleData(data) {
		$$invalidate(5, answer = data.answer);
		$$invalidate(3, isAnswered = true);

		setTimeout(
			() => {
				$$invalidate(3, isAnswered = false);
			},
			3000
		);
	}

	function video_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			video = $$value;
			$$invalidate(4, video);
		});
	}

	return [
		isStarted,
		isPeerReady,
		isMediaReady,
		isAnswered,
		video,
		answer,
		makeConnection,
		video_1_binding
	];
}

class OperatorApp extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default OperatorApp;