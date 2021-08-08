package com.stevevis.webcrawler;

import java.util.List;

public interface HtmlParser {
    List<String> getUrls(String url) throws Exception;
}
