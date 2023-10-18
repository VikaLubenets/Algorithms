async function parse(fetcher, src, chunkSize) {
    try {
      const iter = await fetcher(src);
      async function* returnChunks(iterAsync) {
        const chunk = [];
  
        for (const item of iterAsync) {
          if (item.type === 'provider') {
            const providerData = await fetcher(item.src);
            yield* returnChunks(providerData);
          } else if (item.type === 'data') {
            chunk.push(item.value);
          }
  
          if (chunk.length >= chunkSize) {
            yield chunk;
            chunk.length = 0;
          }
        }
  
        if (chunk.length > 0) {
          yield chunk;
        }
      }
  
      const dataGenerator = returnChunks(iter);
  
      return {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          const { value, done } = await dataGenerator.next();
          return { value, done };
        },
      };
    } catch (error) {
      console.error(`Error fetching source data (${src}): ${error.message}`);
    }
  }
  
  (async () => {
    const fetcher = async (src) => {
      // Ваша заглушка для fetcher
      if (src === 'some_source_url') {
        return [
          {
            type: 'data',
            value: 1
          },
          {
            type: 'data',
            value: 2,
            children: [
              {
                type: 'data',
                value: 1
              },
              {
                type: 'provider',
                src: 'src2'
              },
            ]
          },
          {
            type: 'data',
            value: 3
          }
        ];
      } else if (src === 'src2') {
        return [
          {
            type: 'data',
            value: 1
          },
          {
            type: 'data',
            value: 2
          },
          {
            type: 'data',
            value: 3
          },
          {
            type: 'data',
            value: 4
          }
        ];
      } else {
        // Обработка других возможных источников данных
        return [];
      }
    };
  
    const src = 'some_source_url';
    const chunkSize = 3;
  
    const asyncIterable = parse(fetcher, src, chunkSize);
    for await (const chunk of asyncIterable) {
      console.log(chunk);
    }
  })();