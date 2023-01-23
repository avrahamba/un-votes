cd votes-front
npm run build
cd ..
git add dist -f
git commit -m "Adding dist"
git subtree push --prefix dist origin gh-pages