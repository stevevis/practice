package com.stevevis.webcrawler;

import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class WebCrawler {
    private final ExecutorService executorService;
    private final HtmlParser htmlParser;
    private final Set<String> crawledUrls = new HashSet<>();

    WebCrawler(int numCrawlers, HtmlParser htmlParser) {
        executorService = Executors.newFixedThreadPool(numCrawlers);
        this.htmlParser = htmlParser;
    }

    public void shutdown() {
        this.executorService.shutdown();
    }

    public List<String> crawl(String startUrl) {
        Queue<String> urlQueue = new LinkedList<>();
        Queue<Future<List<String>>> urlFuturesQueue = new LinkedList<>();

        urlQueue.add(startUrl);

        do {
            while (!urlQueue.isEmpty()) {
                String nextUrl = urlQueue.poll();
                if (!crawledUrls.contains(nextUrl)) {
                    System.out.println("Crawling " + nextUrl);
                    HtmlParserTask task = new HtmlParserTask(htmlParser, nextUrl);
                    urlFuturesQueue.add(executorService.submit(task));
                    crawledUrls.add(nextUrl);
                }
            }

            while (!urlFuturesQueue.isEmpty()) {
                Future<List<String>> nextFuture = urlFuturesQueue.poll();
                try {
                    List<String> urls = nextFuture.get();
                    urlQueue.addAll(urls);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        } while (!urlQueue.isEmpty());

        return new ArrayList<>(crawledUrls);
    }

    private static class HtmlParserTask implements Callable<List<String>> {
        private final HtmlParser htmlParser;
        private final String url;

        public HtmlParserTask(HtmlParser htmlParser, String url) {
            this.htmlParser = htmlParser;
            this.url = url;
        }

        @Override
        public List<String> call() throws Exception {
            return htmlParser.getUrls(url);
        }
    }
}
