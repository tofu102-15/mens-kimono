# AGENTS.md — mens-kimono（男着物ほおずき堂 情報・買取サイト）

> 全体の引き継ぎ書は親フォルダの `..\AGENTS.md`（`G:\マイドライブ\Claude\AGENTS.md`）にあります。
> このファイルはこのリポジトリ単独で開いたとき用の要約です。ユーザー: とうふ。

## 概要
男着物の情報・買取サイト「**男着物ほおずき堂**」。ビルド不要の静的HTML（ブラウザで直接開いて確認）。

- 構成: `index.html` + `article1〜24.html` + `about/faq/glossary/kaitori/calendar/contact/privacy/thanks` など。買取（kaitori）導線あり。
- SEO対応: GA（G-MCT2HQM328）・`sitemap.xml`・`robots.txt`・JSON-LD・canonical・OGP 設定済み。
- 画像: `images/`（hero, houzuki, 各記事サムネイル等）。

## リポジトリ / git 状態
- GitHub（プライベート）: https://github.com/tofu102-15/mens-kimono 。**GitHubが正本**で全ページ・全履歴（約90コミット）を保持。
- 2026-07-21に `.git/HEAD` の破損を修復済み。ローカル `main` は `origin/main` と同期・コンテンツ完全一致。
- **ローカル固有の `update_*.py`（22本）は未追跡**（過去の一括編集スクリプト。リモートには無い）。必要なら `git add`、不要なら `.gitignore` へ。

## 一括編集について
色・CTA・canonical・共有ボタン等の全ページ一括更新は、これまで `update_*.py`（Python）で行っていた。同種の一括変更をする場合はこのパターンを踏襲するか、Codexで直接編集する。
