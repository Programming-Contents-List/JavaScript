//only Promise
function getDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise를 사용한 데이터 로딩 완료");
    }, 2000);
  });
}
// getDataWithPromise().then(console.log)

//async
async function getDataWithAsyncAwait() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return "async/await를 사용한 데이터 로딩 완료";
}
// getDataWithAsyncAwait().then(console.log)

function print() {

  const async = getDataWithAsyncAwait().then(console.log)
  const promise = getDataWithPromise().then(console.log)

  return `${promise}, ${async}`
}
print()