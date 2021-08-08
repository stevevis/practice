package com.stevevis.webcrawler;

import java.util.List;

public class WebCrawlerTest {
    public static void main(String[] args) {
        String[] urls = new String[] {
            "http://news.yahoo.com",
            "http://news.yahoo.com/news",
            "http://news.yahoo.com/news/topics/",
            "http://news.google.com",
            "http://news.yahoo.com/us"
        };

        int[][] edges = new int[][] {{2,0}, {2,1}, {3,2}, {3,1}, {0,4}, {1,4}, {1,2}};

        WebCrawler webCrawler = new WebCrawler(5, new TestHtmlParser(urls, edges));
        List<String> crawledUrls = webCrawler.crawl("http://news.yahoo.com/news/topics/");

        crawledUrls.forEach(System.out::println);

        webCrawler.shutdown();
    }
}
