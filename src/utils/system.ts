/**
 * Error instance helper.
 * @example
 *   ...
 *   } catch (err: unknown) {
 *       if (err instanceof Error) {
 *           console.error("Message:", err.message)
 *           console.error("Stack:", err.stack)
 *       } else {
 *           console.error("Unknown error:", err)
 *           console.error("Thrown value:", JSON.stringify(err))
 *       }
 *   }
 */
export const isError = (e: unknown): e is Error => {
    return e instanceof Error
}
