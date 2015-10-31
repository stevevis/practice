package com.stevevis.eventbus;

import java.util.Objects;

/**
 * Created by Steve on 10/29/15.
 */
public class Topic {
    private final String topicId;

    public Topic(String topicId) {
        this.topicId = topicId;
    }

    public String getId() {
        return this.topicId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Topic topic = (Topic) o;
        return Objects.equals(topicId, topic.topicId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(topicId);
    }
}
