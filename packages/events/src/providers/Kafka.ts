import { Event, EventStore } from "@acme/core";
import { Kafka, Message, TopicMessages } from "kafkajs";
import mem from "mem";

export type KafkaReadContext = {
  key: string
  timestamp: string
  offset: string
}

const useKafkaWithConfig = mem((clientId: string, brokers: string[]) => {
  const kafka = new Kafka({
    clientId,
    brokers,
  })

  return kafka
})

export const useKafka = () => useKafkaWithConfig("TODO_ENV", [])

// TODO: Mem?
export const useKafkaStore = <TEvent extends Event>(
  groupId: string,
  topicId: string,
  partitionKey: keyof TEvent | undefined,
  client = useKafka(),
): EventStore<TEvent, KafkaReadContext> => {

  return {
    observeStream: async (onEvent) => {
      const consumer = client.consumer({ groupId })
      await consumer.connect()
      await consumer.subscribe({ topic: topicId, fromBeginning: true })

      await consumer.run({
        eachMessage: async ({ message }) => {
          try {
            const key = message.key?.toString("utf-8")
            const event = JSON.parse(message.value.toString("utf-8")) as TEvent
            onEvent(
              { key, timestamp: message.timestamp, offset: message.offset },
              event
            )
          } catch (err) {
            console.error(`Consumer|${groupId}|${topicId}`, err)
            throw err
          }
        },
      })

      return {
        stop: consumer.disconnect
      }
    },

    appendToStream: async (...events) => {
      if (events.length === 0) {
        return {
          successful: true,
        }
      }

      const producer = client.producer()
      await producer.connect()
      await producer.sendBatch({
        topicMessages: [{
          topic: topicId,
          messages: events.map<Message>(event => {
            const key = partitionKey && event[partitionKey] as string
            return {
              key,
              value: JSON.stringify(event),
            }
          })
        }]
      })

      return {
        successful: true,
      }
    }
  }
}