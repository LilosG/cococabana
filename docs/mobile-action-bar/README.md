# Mobile action bar verification

Screenshots from local browser inspection of production-generated pages:

- [Homepage at 375px, including consent notice](home-375.png)
- [Homepage footer at 375px](footer-375.png)
- [Contact page at 375px](contact-375.png)
- [Contact inquiry form area at 320px](contact-form-320.png)
- [Visible keyboard focus at 375px](keyboard-focus-375.png)

Browser checks used built pages served locally. At 320, 375, 390, 430, and 639px, the two actions each occupied half the viewport, with 56px normal height. At 640px and wider, the bar was hidden and body/scroll clearance computed to zero. On mobile, `html` was the page scroll container; its scroll padding, body padding, and consent offset each computed to 56px. A footer link reached by Tab and a footer scroll target ended above the bar. With labels enlarged to 48px at 320px width, the bar, body reserve, scroll padding, and consent offset all measured 188px. The Contact inquiry iframe's end could be scrolled above the bar. Menu toggle, Escape, navigation, and repeated crossings of 640px restored bar interaction and scroll state.

With a local dummy GA ID, browser activation queued one `reservation_click` and one `phone_click`, each with `link_url`, `page_path`, and `cta_location: mobile_bottom_bar`; phone retained `link_location`. After `window.lilosPrivacy.optOut()`, further activations queued no business events. Reloading with that stored opt-out initialized no `gtag` queue and queued no click events. External destinations were not followed and no inquiry was submitted or call placed.

Static output checks assert one bar, two native links, the configured Cococabana reservation URL and phone destination, and `viewport-fit=cover` on every built public route. The analytics regression executes the shared handler with simulated privacy and click inputs, covering initial and later opt-out, GPC, the GA disable flag, permitted parameters, and a throwing analytics function.

Physical-device safe-area behavior, browser JavaScript-disabled mode, and GA4 DebugView receipt were unavailable. Safe-area CSS and native links were inspected in built output. The existing Contact heading causes horizontal overflow below 393px; the bar itself fits the viewport. The existing seven content-field type errors in untouched pages remain separate from this change.
