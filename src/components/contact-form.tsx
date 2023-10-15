import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "sonner"
import { api } from "~/utils/api"
import { cn } from "~/utils"
import { Input } from "./ui/input"
import { BiLoaderCircle } from "react-icons/bi"
const ContactForm = () => {

  const mutation = api.mail.sendEmail.useMutation();
  const FormSchema = z.object({
    name: z.string({
      required_error: "Name is required."
    }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string({
      required_error: "Message is required."
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate({
      name: data.name,
      message: data.message,
      email: data.email,
    }, {
      onSuccess: () => {
        toast.success("Your message has been sent successfully", {
          description: "We will get back to you as soon as possible"
        })
        form.setValue("email", "")
        form.setValue("message", "")
        form.setValue("name", "")
      }
    })
  }

  return (
    <Form  {...form}>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col w-full gap-3"> {/* eslint-disable-line */}
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className="flex flex-row items-center gap-2">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g john" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className="flex flex-row items-center gap-2">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g elbouchouki@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className="flex flex-row items-center gap-2">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="e.g I want to add my store to your website"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-3">
          <Button type="submit"
            disabled={mutation.isLoading}
            className="flex flex-row gap-2 bg-primary-500 hover:bg-primary-600 "
          >
            <BiLoaderCircle className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading
            })} />
            <span>
              Send Message
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default ContactForm