package com.stevevis.eventbus.exceptions;

import com.stevevis.eventbus.Topic;

/**
 * Created by Steve on 10/30/15.
 */
public class DuplicateTopicException extends Exception {
    private Topic topic;

    public DuplicateTopicException(Topic topic) {
        super();
        this.topic = topic;
    }

    @Override
    public String getMessage() {
        return "Topic " + this.topic + " is already registered";
    }
}
