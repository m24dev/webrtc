import './Connection.css.proxy.js';
/* src\js\Connection.svelte generated by Svelte v3.29.6 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	binding_callbacks,
	check_outros,
	create_bidirectional_transition,
	destroy_each,
	detach,
	element,
	group_outros,
	init,
	insert,
	listen,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value,
	space,
	svg_element,
	text,
	toggle_class,
	transition_in,
	transition_out,
	xlink_attr
} from "../../web_modules/svelte/internal.js";

import { fade } from "../../web_modules/svelte/transition.js";
import { onMount, afterUpdate, createEventDispatcher } from "../../web_modules/svelte.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i];
	return child_ctx;
}

// (201:8) {:else}
function create_else_block_1(ctx) {
	let svg;
	let use;

	return {
		c() {
			svg = svg_element("svg");
			use = svg_element("use");
			xlink_attr(use, "xlink:href", "dist/images/bootstrap-icons.svg#camera-video");
			attr(svg, "class", "bi");
			attr(svg, "width", "32");
			attr(svg, "height", "32");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, use);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (197:8) {#if isVideoHidden}
function create_if_block_2(ctx) {
	let svg;
	let use;

	return {
		c() {
			svg = svg_element("svg");
			use = svg_element("use");
			xlink_attr(use, "xlink:href", "dist/images/bootstrap-icons.svg#camera-video-off");
			attr(svg, "class", "bi");
			attr(svg, "width", "32");
			attr(svg, "height", "32");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, use);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (212:8) {:else}
function create_else_block(ctx) {
	let svg;
	let use;

	return {
		c() {
			svg = svg_element("svg");
			use = svg_element("use");
			xlink_attr(use, "xlink:href", "dist/images/bootstrap-icons.svg#volume-up-fill");
			attr(svg, "class", "bi");
			attr(svg, "width", "32");
			attr(svg, "height", "32");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, use);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (208:8) {#if isMuted}
function create_if_block_1(ctx) {
	let svg;
	let use;

	return {
		c() {
			svg = svg_element("svg");
			use = svg_element("use");
			xlink_attr(use, "xlink:href", "dist/images/bootstrap-icons.svg#volume-mute-fill");
			attr(svg, "class", "bi");
			attr(svg, "width", "32");
			attr(svg, "height", "32");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, use);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (218:4) {#if closed}
function create_if_block(ctx) {
	let div1;
	let div1_transition;
	let current;

	return {
		c() {
			div1 = element("div");
			div1.innerHTML = `<div class="alert alert-warning text-center">Соединение закрыто</div>`;
			attr(div1, "class", "popup p-4 svelte-bitwll");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			current = true;
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
			if (detaching && div1_transition) div1_transition.end();
		}
	};
}

// (225:12) {#each messages as message}
function create_each_block(ctx) {
	let div3;
	let div2;
	let div0;
	let t0_value = /*message*/ ctx[22].from + "";
	let t0;
	let t1;
	let div1;
	let t2_value = /*message*/ ctx[22].text + "";
	let t2;
	let t3;
	let div3_transition;
	let current;

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			t2 = text(t2_value);
			t3 = space();
			attr(div0, "class", "chat__author font-weight-bold svelte-bitwll");
			attr(div1, "class", "chat__text");
			attr(div2, "class", "chat__message d-inline-block p-2 shadow-sm svelte-bitwll");
			attr(div3, "class", "chat__item d-flex mb-2 svelte-bitwll");
			toggle_class(div3, "chat__item_alt", /*message*/ ctx[22].from === /*username*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div0);
			append(div0, t0);
			append(div2, t1);
			append(div2, div1);
			append(div1, t2);
			append(div3, t3);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*messages*/ 128) && t0_value !== (t0_value = /*message*/ ctx[22].from + "")) set_data(t0, t0_value);
			if ((!current || dirty & /*messages*/ 128) && t2_value !== (t2_value = /*message*/ ctx[22].text + "")) set_data(t2, t2_value);

			if (dirty & /*messages, username*/ 132) {
				toggle_class(div3, "chat__item_alt", /*message*/ ctx[22].from === /*username*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {}, true);
				div3_transition.run(1);
			});

			current = true;
		},
		o(local) {
			if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {}, false);
			div3_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			if (detaching && div3_transition) div3_transition.end();
		}
	};
}

function create_fragment(ctx) {
	let div6;
	let div0;
	let video_1;
	let div0_transition;
	let t0;
	let button0;
	let t1;
	let button1;
	let button1_transition;
	let t2;
	let button2;
	let t3;
	let t4;
	let div5;
	let div1;
	let t5;
	let div4;
	let div3;
	let input;
	let t6;
	let div2;
	let button3;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*isVideoHidden*/ ctx[5]) return create_if_block_2;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);

	function select_block_type_1(ctx, dirty) {
		if (/*isMuted*/ ctx[6]) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type_1 = select_block_type_1(ctx, -1);
	let if_block1 = current_block_type_1(ctx);
	let if_block2 = /*closed*/ ctx[3] && create_if_block(ctx);
	let each_value = /*messages*/ ctx[7];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div6 = element("div");
			div0 = element("div");
			video_1 = element("video");
			t0 = space();
			button0 = element("button");
			button0.innerHTML = `<svg class="bi" width="32" height="32" fill="currentColor"><use xlink:href="dist/images/bootstrap-icons.svg#box-arrow-in-left"></use></svg>`;
			t1 = space();
			button1 = element("button");
			if_block0.c();
			t2 = space();
			button2 = element("button");
			if_block1.c();
			t3 = space();
			if (if_block2) if_block2.c();
			t4 = space();
			div5 = element("div");
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t5 = space();
			div4 = element("div");
			div3 = element("div");
			input = element("input");
			t6 = space();
			div2 = element("div");
			button3 = element("button");
			button3.innerHTML = `<svg class="bi" width="16" height="16" fill="currentColor"><use xlink:href="dist/images/bootstrap-icons.svg#chat-fill"></use></svg>`;
			video_1.playsInline = true;
			video_1.autoplay = true;
			video_1.muted = /*isMuted*/ ctx[6];
			attr(video_1, "class", "svelte-bitwll");
			attr(div0, "class", "connection__video svelte-bitwll");
			toggle_class(div0, "invisible", /*isVideoHidden*/ ctx[5]);
			attr(button0, "type", "button");
			attr(button0, "class", "btn btn-icon text-light btn-stop svelte-bitwll");
			attr(button1, "type", "button");
			attr(button1, "class", "btn btn-icon btn-answer text-light svelte-bitwll");
			attr(button2, "type", "button");
			attr(button2, "class", "btn btn-icon text-light btn-volume svelte-bitwll");
			attr(div1, "class", "chat d-flex align-items-end p-4 svelte-bitwll");
			attr(input, "type", "text");
			attr(input, "class", "form-control");
			attr(input, "placeholder", "Текст сообщения");
			attr(button3, "type", "button");
			attr(button3, "class", "btn btn-primary");
			attr(div2, "class", "input-group-append");
			attr(div3, "class", "input-group shadow-sm");
			attr(div4, "class", "p-4");
			attr(div5, "class", "connection__chat svelte-bitwll");
			attr(div6, "class", "connection bg-dark svelte-bitwll");
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div0);
			append(div0, video_1);
			/*video_1_binding*/ ctx[15](video_1);
			append(div6, t0);
			append(div6, button0);
			append(div6, t1);
			append(div6, button1);
			if_block0.m(button1, null);
			append(div6, t2);
			append(div6, button2);
			if_block1.m(button2, null);
			append(div6, t3);
			if (if_block2) if_block2.m(div6, null);
			append(div6, t4);
			append(div6, div5);
			append(div5, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			/*div1_binding*/ ctx[16](div1);
			append(div5, t5);
			append(div5, div4);
			append(div4, div3);
			append(div3, input);
			/*input_binding*/ ctx[17](input);
			set_input_value(input, /*newMessage*/ ctx[8]);
			append(div3, t6);
			append(div3, div2);
			append(div2, button3);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*handleClose*/ ctx[12]),
					listen(button1, "click", /*handleVideoToggle*/ ctx[10]),
					listen(button2, "click", /*handleVolumeToggle*/ ctx[11]),
					listen(input, "input", /*input_input_handler*/ ctx[18]),
					listen(input, "keypress", /*handleSend*/ ctx[9]),
					listen(button3, "click", /*handleSend*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*isMuted*/ 64) {
				video_1.muted = /*isMuted*/ ctx[6];
			}

			if (dirty & /*isVideoHidden*/ 32) {
				toggle_class(div0, "invisible", /*isVideoHidden*/ ctx[5]);
			}

			if (current_block_type !== (current_block_type = select_block_type(ctx, dirty))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(button1, null);
				}
			}

			if (current_block_type_1 !== (current_block_type_1 = select_block_type_1(ctx, dirty))) {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(button2, null);
				}
			}

			if (/*closed*/ ctx[3]) {
				if (if_block2) {
					if (dirty & /*closed*/ 8) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div6, t4);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (dirty & /*messages, username*/ 132) {
				each_value = /*messages*/ ctx[7];
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
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (dirty & /*newMessage*/ 256 && input.value !== /*newMessage*/ ctx[8]) {
				set_input_value(input, /*newMessage*/ ctx[8]);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, {}, true);
				div0_transition.run(1);
			});

			add_render_callback(() => {
				if (!button1_transition) button1_transition = create_bidirectional_transition(button1, fade, {}, true);
				button1_transition.run(1);
			});

			transition_in(if_block2);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, {}, false);
			div0_transition.run(0);
			if (!button1_transition) button1_transition = create_bidirectional_transition(button1, fade, {}, false);
			button1_transition.run(0);
			transition_out(if_block2);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div6);
			/*video_1_binding*/ ctx[15](null);
			if (detaching && div0_transition) div0_transition.end();
			if_block0.d();
			if (detaching && button1_transition) button1_transition.end();
			if_block1.d();
			if (if_block2) if_block2.d();
			destroy_each(each_blocks, detaching);
			/*div1_binding*/ ctx[16](null);
			/*input_binding*/ ctx[17](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { username } = $$props;
	let { dataConnection } = $$props;
	let { mediaConnection } = $$props;
	let { closed } = $$props;
	let { chat } = $$props;
	let { inputMessage } = $$props;
	let video;
	let isAccepted = username === dataConnection.metadata.username;
	let isVideoHidden = true;
	let isMuted = true;
	let messages = [];
	let newMessage = "";

	mediaConnection.on("stream", stream => {
		console.log("stream");
		$$invalidate(4, video.srcObject = stream, video);

		$$invalidate(
			4,
			video.onloadedmetadata = () => {
				video.play();
			},
			video
		);
	});

	onMount(() => {
		if (username === dataConnection.metadata.username) {
			$$invalidate(4, video.srcObject = mediaConnection.localStream, video);

			$$invalidate(
				4,
				video.onloadedmetadata = () => {
					video.play();
				},
				video
			);
		}

		inputMessage.focus();
	});

	afterUpdate(() => {
		$$invalidate(0, chat.scrollTop = chat.scrollHeight, chat);
	});

	function handleSend(e) {
		if (e.type === "keypress" && e.keyCode != 13) return;
		let data = { from: username, text: newMessage };
		dataConnection.send(data);
		handleMessage(data);
		$$invalidate(8, newMessage = "");
	}

	function handleMessage(data) {
		$$invalidate(7, messages = [...messages, data]);
	}

	function handleVideoToggle() {
		if (!isAccepted) {
			mediaConnection.answer();
			isAccepted = true;
		}

		$$invalidate(5, isVideoHidden = !isVideoHidden);
	}

	function handleVolumeToggle() {
		$$invalidate(6, isMuted = !isMuted);
	}

	function handleClose() {
		dataConnection.close();
		mediaConnection.close();
	}

	dataConnection.on("data", handleMessage);

	dataConnection.on("close", () => {
		dispatch("close", { peer: dataConnection.peer });
	});

	dataConnection.on("error", err => {
		console.log(err);
	});

	function video_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			video = $$value;
			$$invalidate(4, video);
		});
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			chat = $$value;
			$$invalidate(0, chat);
		});
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			inputMessage = $$value;
			$$invalidate(1, inputMessage);
		});
	}

	function input_input_handler() {
		newMessage = this.value;
		$$invalidate(8, newMessage);
	}

	$$self.$$set = $$props => {
		if ("username" in $$props) $$invalidate(2, username = $$props.username);
		if ("dataConnection" in $$props) $$invalidate(13, dataConnection = $$props.dataConnection);
		if ("mediaConnection" in $$props) $$invalidate(14, mediaConnection = $$props.mediaConnection);
		if ("closed" in $$props) $$invalidate(3, closed = $$props.closed);
		if ("chat" in $$props) $$invalidate(0, chat = $$props.chat);
		if ("inputMessage" in $$props) $$invalidate(1, inputMessage = $$props.inputMessage);
	};

	return [
		chat,
		inputMessage,
		username,
		closed,
		video,
		isVideoHidden,
		isMuted,
		messages,
		newMessage,
		handleSend,
		handleVideoToggle,
		handleVolumeToggle,
		handleClose,
		dataConnection,
		mediaConnection,
		video_1_binding,
		div1_binding,
		input_binding,
		input_input_handler
	];
}

class Connection extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			username: 2,
			dataConnection: 13,
			mediaConnection: 14,
			closed: 3,
			chat: 0,
			inputMessage: 1
		});
	}
}

export default Connection;