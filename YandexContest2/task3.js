// module.exports.parse = 
async function parse (fetcher, src, chunkSize) {
    try {
        const iter = await fetcher(src);
        const dataGenerator = returnChunks(iter);
    
        async function* returnChunks(iterAsync) {
          const chunk = [];
    
          for await (const item of iterAsync) {
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
    };



  const testSrc1 = [
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
  
  const testSrc2 = [
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
  
  const chunkSize = 3;
  const fakeFetcher = async (src) => {
    if (src === 'src1') {
      return testSrc1;
    } else if (src === 'src2') {
      return testSrc2;
    } else {
      throw new Error(`Unknown src: ${src}`);
    }
  };
  

      console.log(parse(fakeFetcher, 'src1', chunkSize))