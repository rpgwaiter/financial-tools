<script>
  import hljs from "highlight.js";
  import "highlight.js/styles/github-dark.css";
  import { storeHighlightJs } from "@skeletonlabs/skeleton";
  // Your selected Skeleton theme:
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";

  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/skeleton.css";

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import "../app.postcss";

  storeHighlightJs.set(hljs);
</script>

<slot />
