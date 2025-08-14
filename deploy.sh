#!/bin/bash

# 🚀 LocalShop Railway Deployment Script
# Run this script to deploy your marketplace!

echo "🏪 LocalShop Railway Deployment"
echo "================================"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not in a git repository"
    echo "Run 'git init' first!"
    exit 1
fi

# Check if user has set up their GitHub remote
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  GitHub remote not set up"
    echo "Please add your GitHub repository:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/localshop.git"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    git remote add origin "$repo_url"
    echo "✅ GitHub remote added!"
fi

# Add and commit any changes
echo "📦 Preparing files for deployment..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "📝 Committing changes..."
    git commit -m "🔄 Update LocalShop for deployment $(date +'%Y-%m-%d %H:%M')"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push origin main; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "⚠️  First time push? Try:"
    git push -u origin main
fi

echo ""
echo "🎉 Deployment Complete!"
echo "========================"
echo ""
echo "Next Steps:"
echo "1. 🌐 Go to https://railway.app"
echo "2. 📂 Create new project from your GitHub repo"
echo "3. 🔧 Add environment variables (see DEPLOYMENT.md)"
echo "4. ⚡ Deploy!"
echo ""
echo "Your mom will love the new LocalShop! 🛍️"
echo ""
echo "📖 Full instructions: See DEPLOYMENT.md"
echo "🏪 Local testing: http://localhost:3000"
