import './MultiscreenUser.css.proxy.js';
/* src\js\MultiscreenUser.svelte generated by Svelte v3.29.6 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../web_modules/svelte/internal.js";

function create_fragment(ctx) {
	let div;
	let video_1;

	return {
		c() {
			div = element("div");
			video_1 = element("video");
			video_1.muted = true;
			attr(video_1, "class", "svelte-1ikueo0");
			attr(div, "class", "user svelte-1ikueo0");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, video_1);
			/*video_1_binding*/ ctx[2](video_1);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*video_1_binding*/ ctx[2](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { user } = $$props;
	let video;

	user.mediaConnection.on("stream", stream => {
		console.log("stream");
		$$invalidate(0, video.srcObject = stream, video);

		$$invalidate(
			0,
			video.onloadedmetadata = () => {
				video.play();
			},
			video
		);
	});

	user.mediaConnection.answer();

	function video_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			video = $$value;
			$$invalidate(0, video);
		});
	}

	$$self.$$set = $$props => {
		if ("user" in $$props) $$invalidate(1, user = $$props.user);
	};

	return [video, user, video_1_binding];
}

class MultiscreenUser extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { user: 1 });
	}
}

export default MultiscreenUser;