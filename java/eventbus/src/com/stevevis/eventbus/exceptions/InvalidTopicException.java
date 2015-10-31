package com.stevevis.eventbus.exceptions;

import com.stevevis.eventbus.Topic;

/**
 * Created by Steve on 10/30/15.
 */
public class InvalidTopicException extends Exception {
    private Topic topic;
    public InvalidTopicException(Topic topic) {
        super();
        this.topic = topic;
    }

    @Override
    public String getMessage() {
        return "Topic " + this.topic + " does not exist";
    }
}
