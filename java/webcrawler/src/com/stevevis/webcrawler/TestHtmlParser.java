package com.stevevis.webcrawler;

import java.util.ArrayList;
import java.util.List;

public class TestHtmlParser implements HtmlParser {
    final String[] urls;
    final int[][] edges;

    public TestHtmlParser(String[] urls, int[][] edges) {
        this.urls = urls;
        this.edges = edges;
    }

    @Override
    public List<String> getUrls(String url) throws InterruptedException {
        int urlIndex = -1;

        for (int i = 0; i < urls.length; i++) {
            if (urls[i].equals(url)) {
                urlIndex = i;
            }
        }

        List<String> results = new ArrayList<>();

        if (urlIndex >= 0) {
            for (int[] edge : edges) {
                if (edge[0] == urlIndex) {
                    int linkIndex = edge[1];
                    results.add(urls[linkIndex]);
                }
            }
        }

        Thread.sleep(1000);

        return results;
    }
}
