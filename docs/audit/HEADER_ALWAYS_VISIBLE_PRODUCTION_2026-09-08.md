# Always-visible header: publication verified

Published revision: `0840703960d8c044d4224c0fd6e1d963f5ac5a3a`, fast-forwarded to main from `92f9307`.

Vercel deployment `dpl_BK18NdLJeHArw5BnSMtmJFC4sP9r` is READY and assigned to `www.extinctionfield.com`. The deployment service itself also passed the build and the 542-route rendered-HTML check.

Public-site browser checks passed:

- At 897×812, Home and all seven primary groups are visible. The header remains at y=0 after scrolling the document 1200 px.
- The Evidence dropdown exposes its 18 existing links and fits inside the viewport; Escape closes it.
- Clicking Home opens the existing `/fi` home page and sets its current-page marker.
- At 390×844, both Model and Behaviour retain all eight primary entries on two category rows with no horizontal overflow.
- Fresh Model and Behaviour fragment URLs place their headings at y=166.15 and y=165.80 respectively, below the 150 px header.
- No browser console errors were observed. Temporary viewport overrides were reset, local servers were stopped, and the user's public Model tab was restored.

The complete interaction revision passed 470 automated tests. The final spacing revision passed a fresh complete build and the production browser checks above. Detailed local checks are in `HEADER_ALWAYS_VISIBLE_RELEASE_2026-09-08.md`; public measurements are in the matching production JSON.

Model content, scientific code, references, route definitions and evidence registries were not changed. The original user's working directory was preserved.
