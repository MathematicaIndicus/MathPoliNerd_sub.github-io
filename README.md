# MathPoliNerd_Subsidary

Static personal website and blog for GitHub Pages.

## Publishing blog posts

The public site reads published posts from `data/posts.json`, so it can run on GitHub Pages without a backend.

To edit posts locally:

1. Create a `.env` file with `BLOG_ADMIN_TOKEN=your-long-random-token`.
2. Run `npm start`.
3. Open `http://localhost:3000/admin.html`.
4. Paste the token from your `.env` file into the admin page.
5. Create or edit posts and mark the ones you want online as published.
6. Commit and push the updated `data/posts.json`.

GitHub Pages will redeploy after the push, and online readers will see the updated published posts.
