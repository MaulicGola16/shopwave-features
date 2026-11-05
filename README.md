# 🛍️ ShopWave Features — Git branching demo

A small, dependency-free storefront (plain HTML, CSS and JavaScript) built to demonstrate **Git branches**.
`main` shows a basic product grid. Each of the **7 feature branches** adds one different feature.

## Branches

| Branch                    | Feature added                                   | File changed                  |
|---------------------------|-------------------------------------------------|-------------------------------|
| `feature/search`          | Live search box (name, brand, category)         | `features/search.js`          |
| `feature/category-filter` | Clothes / Watches / Shoes filter tabs           | `features/category-filter.js` |
| `feature/sort`            | Sort by price, rating or name                   | `features/sort.js`            |
| `feature/wishlist`        | ♥ wishlist toggle with saved count              | `features/wishlist.js`        |
| `feature/cart`            | Add to cart, quantity controls, total, saved cart | `features/cart.js`          |
| `feature/dark-mode`       | Light / dark theme toggle (remembered)          | `features/dark-mode.js`       |
| `feature/quick-view`      | Click a product image to open a details popup   | `features/quick-view.js`      |

Every branch starts from `main` and changes **exactly one file**, so the branches contain different code
but can also all be merged together without conflicts.

## Run it

No install or build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Try the branches

```bash
git branch                       # list branches
git checkout feature/search      # switch to a branch (or: git switch feature/search)
git checkout main
git diff main feature/cart --stat
git log --oneline --graph --all
```

Open `index.html` after each checkout to see that branch's feature appear.

## Merge everything

```bash
git checkout main
git merge feature/search feature/category-filter feature/sort feature/wishlist feature/cart feature/dark-mode feature/quick-view
```

## How it works

`app.js` renders the grid and exposes a small plugin API (`ShopWave.use`). Each file in `features/` is an empty stub on
`main`; a feature branch fills in its own stub, which is why the branches never touch the same lines.
