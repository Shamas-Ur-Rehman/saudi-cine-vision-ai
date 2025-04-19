
import React from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { FilePlus } from 'lucide-react';

interface CreateScriptFormProps {
  onSubmit: (data: ScriptFormData) => void;
  onClose: () => void;
}

export interface ScriptFormData {
  title: string;
  sceneNumber: string;
  assignedTo: string;
  description: string;
}

const CreateScriptForm = ({ onSubmit, onClose }: CreateScriptFormProps) => {
  const form = useForm<ScriptFormData>({
    defaultValues: {
      title: '',
      sceneNumber: '',
      assignedTo: '',
      description: ''
    }
  });

  const handleSubmit = (data: ScriptFormData) => {
    onSubmit(data);
    form.reset();
    toast({
      title: 'Script Created',
      description: `The script "${data.title}" has been successfully created.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Script Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter script title" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sceneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scene Number</FormLabel>
              <FormControl>
                <Input placeholder="Scene #" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <FormControl>
                <select 
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  {...field}
                  required
                >
                  <option value="" disabled>Select a crew member</option>
                  <option value="Ahmad">Ahmad</option>
                  <option value="Mohammed">Mohammed</option>
                  <option value="Remas">Remas</option>
                  <option value="Dana">Dana</option>
                  <option value="Hager">Hager</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Script Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter scene description, notes, and details..." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-cinema-highlight hover:bg-cinema-highlight/80">
            <FilePlus className="mr-2 h-4 w-4" />
            Create Script
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateScriptForm;
